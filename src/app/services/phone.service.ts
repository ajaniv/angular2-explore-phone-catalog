import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Phone, PhoneOverview } from '../models';

@Injectable()
export class PhoneService {

  private baseUrl = 'assets/phones';  // URL to web api

  constructor( private http: Http ) { }

  getPhones(): Promise<PhoneOverview[]> {
    const url = `${this.baseUrl}/phones.json`;
    /* uncomment when debugging
         let response = this.http.get(url)
        .map(this.extractData)
        .catch(this.handleError);

    let promise =  response.toPromise();*/
    return this.http.get( url )
      .toPromise()
      .then( response => response.json() as PhoneOverview[] )
      .catch( this.handleError );
  }

  getPhone( id: string ): Promise<Phone> {
    const url = `${this.baseUrl}/${id}.json`;
    return this.http.get( url )
      .toPromise()
      .then( response => response.json() as Phone )
      .catch( this.handleError );
  }

  private extractData( res: Response ) {
    console.log( 'res:' + res );
    const body = res.json();
    console.log( 'body' + body );
    return body || {};
  }

  private handleError( error: any ): Promise<any> {
    console.error( 'An error occurred', error ); // for demo purposes only
    return Promise.reject( error.message || error );
  }
}
