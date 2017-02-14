import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Phone } from '../models';
import { PhoneService } from '../services';

@Component( {
  selector: 'app-phone-detail',
  templateUrl: './phone-detail.component.html',
  styleUrls: ['./phone-detail.component.css']
})
export class PhoneDetailComponent implements OnInit {

  phone: Phone;
  mainImageUrl: string;

  constructor( private phoneService: PhoneService,
    private route: ActivatedRoute,
    private location: Location ) { }

  ngOnInit(): void {
    this.route.params
      .switchMap(( params: Params ) => this.phoneService.getPhone( params['id'] ) )
      .subscribe(
      ( phone: Phone ) => {
        this.phone = phone;
        this.setImage( phone.images[0] );
      });
  }

  setImage( imageUrl ): void {
    this.mainImageUrl = imageUrl;
  }

  goBack(): void {
    this.location.back();
  }
}
