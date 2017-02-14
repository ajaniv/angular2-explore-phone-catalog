/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { CheckmarkPipe } from './checkmark.pipe';

describe( 'CheckmarkPipe', () => {
  it( 'create an instance', () => {
    const pipe = new CheckmarkPipe();
    expect( pipe ).toBeTruthy();
  });
  it( 'should convert boolean values to unicode checkmark or cross', () => {
    const pipe = new CheckmarkPipe();
    expect( pipe.transform( true ) ).toBe( '\u2713' );
    expect( pipe.transform( false ) ).toBe( '\u2718' );
  });

});
