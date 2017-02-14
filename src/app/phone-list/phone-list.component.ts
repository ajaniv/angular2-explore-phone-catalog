import { Component, OnInit } from '@angular/core';
import { PhoneOverview } from '../models';
import { PhoneService } from '../services';

@Component( {
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.css']
})

export class PhoneListComponent implements OnInit {
  phones: PhoneOverview[];
  orderProp: string = 'name';  // tslint:disable-line
  query: string = ''; // tslint:disable-line
  selectedPhone: PhoneOverview;
  filteredPhones: PhoneOverview[];

  constructor(
    private phoneService: PhoneService ) { }

  ngOnInit() {
    this.getAllPhones();
    const currentOrderProp = JSON.parse( sessionStorage.getItem( 'currentOrderProp' ) );
    if ( currentOrderProp ) {
      this.orderProp = currentOrderProp;
    }
    const currentQuery = JSON.parse( sessionStorage.getItem( 'currentQuery' ) );
    if ( currentQuery ) {
      this.query = currentQuery;
    }
  }

  filterCriteriaChanged(): void {

    sessionStorage.setItem( 'currentOrderProp', JSON.stringify( this.orderProp ) );
    sessionStorage.setItem( 'currentQuery', JSON.stringify( this.query ) );
    this.filteredPhones = this.sortPhones( this.filterPhones( this.phones ) );

  }

  clearQuery(): void {
    this.query = '';
    this.filterCriteriaChanged();
  }

  private getAllPhones(): void {
    this.phoneService.getPhones().then(( phones ) => {
      this.phones = phones;
      this.filterCriteriaChanged();
    });

  }

  private filterPhones( phones: PhoneOverview[] ) {
    if ( phones && this.query ) {
      const lowerCaseQuery = this.query.toLowerCase();
      return phones.filter( phone => {
        const name = phone.name.toLowerCase();
        const snippet = phone.snippet.toLowerCase();
        return name.indexOf( lowerCaseQuery ) >= 0 || snippet.indexOf( lowerCaseQuery ) >= 0;
      });
    }
    return phones;
  }

  private sortPhones( phones: PhoneOverview[] ) {
    if ( phones && this.orderProp ) {
      return phones
        .slice( 0 )
        .sort(( a, b ) => {
          const orderProp = this.orderProp;
          if ( a[orderProp] < b[orderProp] ) {
            return -1;
          } else if ( [b[orderProp] < a[orderProp]] ) {
            return 1;
          } else {
            return 0;
          }
        });
    }
    return phones;
  }
}



