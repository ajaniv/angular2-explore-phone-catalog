/* deprecated */
import { Pipe, PipeTransform } from '@angular/core';
import { PhoneOverview } from '../models';

@Pipe( {
    name: 'filter'
})
export class FilterPipe implements PipeTransform {

    transform( phones: PhoneOverview[], filter: string ): PhoneOverview[] {
        if ( !phones || !filter ) {
            return phones;
        }
        return phones.filter( phone => phone.name.indexOf( filter ) >= 0 );
    }

}


