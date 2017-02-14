/* tslint:disable:no-unused-variable */
/* tslint:disable:no-shadowed-variable */

import { TestBed, async, inject } from '@angular/core/testing';

import {
  BaseRequestOptions,
  HttpModule,
  Http,
  Response,
  ResponseOptions
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { PhoneService } from './phone.service';
import { PhoneOverview, Phone } from '../models';
import { testPhones } from '../testing/phones';

describe( 'PhoneService', () => {
  let mockBackend: MockBackend;
  let phoneService: PhoneService;

  const phones: PhoneOverview[] = testPhones();

  const phone: Phone = {
    name: 'Phone 0'
  };
  beforeEach(() => {

    TestBed.configureTestingModule( {
      imports: [HttpModule],
      providers: [
        PhoneService,
        {
          provide: Http,
          useFactory: ( mockBackend: MockBackend, options: BaseRequestOptions ) => {
            return new Http( mockBackend, options );
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions
      ]
    });
  });

  beforeEach( inject( [MockBackend, PhoneService], ( _mockBackend_: MockBackend, _phoneService_: PhoneService ) => {
    mockBackend = _mockBackend_;
    phoneService = _phoneService_;
  }) );

  it( 'should create', () => {
    expect( phoneService ).toBeTruthy();
  });

  it( 'should return a Promise<Array<Phone>>', () => {

    mockBackend.connections.subscribe(( conn: MockConnection ) => {
      conn.mockRespond( new Response( new ResponseOptions( { body: JSON.stringify( phones ) }) ) );
    });

    phoneService.getPhones().then(( phones ) => {
      expect( phones.length ).toBe( 3 );
      expect( phones[0].name ).toEqual( 'Phone 0' );
      expect( phones[1].name ).toEqual( 'Phone 1' );
      expect( phones[1].name ).toEqual( 'Phone 2' );
    });

  });

  it( 'should return a Promise<Phone>',
    inject( [PhoneService, MockBackend], ( phoneService, mockBackend ) => {

      mockBackend.connections.subscribe(( connection ) => {
        connection.mockRespond( new Response( new ResponseOptions( {
          body: JSON.stringify( phone )
        }) ) );
      });
      phoneService.getPhone( 'dummy' ).then(( phone ) => {
        expect( phone.name ).toEqual( 'Phone 0' );
      });

    }) );
});
