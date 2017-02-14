/* deprecated */
import { Pipe, PipeTransform } from '@angular/core';
import { PhoneOverview } from '../models';

function compareNativeType( a: any, b: any): number {
    if ( a < b ) {
        return -1;
    }
    if ( a > b ) {
        return 1;
    }
    return 0;
}
@Pipe( {
    name: 'orderby'
})
export class OrderByPipe implements PipeTransform {

    compareAge( a: PhoneOverview, b: PhoneOverview ) {
        return compareNativeType(a.age, b.age);
    }
    compareName( a: PhoneOverview, b: PhoneOverview ) {
        return compareNativeType(a.name, b.name);
    }
    transform( phones: PhoneOverview[], orderBy: string ): PhoneOverview[] {
        if ( !phones || !orderBy ) {
            return phones;
        }
        if ( orderBy === 'age' ) {
            return phones.sort(this.compareAge);
        }
        else if (orderBy === 'name') { // tslint:disable-line
            return phones.sort(this.compareName);
        }

        return phones;
    }

}
