import { Pipe, PipeTransform } from '@angular/core';

@Pipe( {
  name: 'checkmark',
  pure: true
})
export class CheckmarkPipe implements PipeTransform {

  transform( value: boolean, args?: any ): string {
    return value ? '\u2713' : '\u2718';
  }

}
