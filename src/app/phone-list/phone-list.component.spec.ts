/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FormsModule } from '@angular/forms';

import { CheckmarkPipe } from '../pipes';
import { PhoneListComponent } from './phone-list.component';
import { PhoneDetailComponent } from '../phone-detail/phone-detail.component';
import { PhoneService } from '../services';
import { Phone } from '../models';
import { testPhones, MockPhoneService } from '../testing/phones';

const routes = [
  { path: 'phone/:id', component: PhoneDetailComponent }
];

function setup(): void {
  TestBed.configureTestingModule( {
    declarations: [CheckmarkPipe, PhoneDetailComponent, PhoneListComponent],
    imports: [
      FormsModule,
      RouterTestingModule.withRoutes( routes )
    ],
    providers: [
      { provide: PhoneService, useClass: MockPhoneService }
    ]
  })
    .compileComponents();
}

describe( 'PhoneListComponent-default', () => {
  let component: PhoneListComponent;
  let fixture: ComponentFixture<PhoneListComponent>;

  beforeEach( async(() => {
    setup();
  }) );

  beforeEach(() => {
    fixture = TestBed.createComponent( PhoneListComponent );
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it( 'should create', () => {
    fixture.detectChanges();
    expect( component ).toBeTruthy();
  });

  it( 'should set the default value of orderProp model', async(() => {
    fixture.whenStable().then(() => {

      const compiled = fixture.debugElement.nativeElement;
      expect(
        compiled.querySelector( 'select option:first-child' ).selected
      ).toBe( true );

      expect(
        compiled.querySelector( 'select' ).value
      ).toEqual( 'name' );
    });
  }) );

  it( 'should create  model with 3 phones', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      const ul = compiled.querySelectorAll( '.phone-list-item' );
      expect( compiled.querySelectorAll( '.phone-list-item' ).length ).toBe( 3 );
      expect(
        compiled.querySelector( '.phone-list-item:nth-child(1)' ).textContent
      ).toContain( 'Phone 0' );
      expect(
        compiled.querySelector( '.phone-list-item:nth-child(2)' ).textContent
      ).toContain( 'Phone 1' );
      expect(
        compiled.querySelector( '.phone-list-item:nth-child(3)' ).textContent
      ).toContain( 'Phone 2' );
    });
  }) );

});


describe( 'PhoneListComponent-filter', () => {
  let component: PhoneListComponent;
  let fixture: ComponentFixture<PhoneListComponent>;

  beforeEach( async(() => {
    setup();
  }) );

  beforeEach(() => {
    fixture = TestBed.createComponent( PhoneListComponent );
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it( 'should filter to one phone', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      const ul = compiled.querySelectorAll( '.phone-list-item' );
      expect( compiled.querySelectorAll( '.phone-list-item' ).length ).toBe( 3 );
      component.query = 'Phone 1';
      component.filterCriteriaChanged();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect( compiled.querySelectorAll( '.phone-list-item' ).length ).toBe( 1 );
      });
    });
  }) );

  it( 'should filter to no phones', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      const ul = compiled.querySelectorAll( '.phone-list-item' );
      component.query = '';
      component.filterCriteriaChanged();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect( compiled.querySelectorAll( '.phone-list-item' ).length ).toBe( 3 );
        component.query = 'XX';
        component.filterCriteriaChanged();
        fixture.detectChanges();
        expect( compiled.querySelectorAll( '.phone-list-item' ).length ).toBe( 0 );
      });
    });
  }) );
});

describe( 'PhoneListComponent-sort', () => {
  let component: PhoneListComponent;
  let fixture: ComponentFixture<PhoneListComponent>;

  beforeEach( async(() => {
    setup();
  }) );

  beforeEach(() => {
    fixture = TestBed.createComponent( PhoneListComponent );
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it( 'should sort by age', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      const ul = compiled.querySelectorAll( '.phone-list-item' );

      component.orderProp = 'age';
      component.query = '';
      component.filterCriteriaChanged();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect( compiled.querySelectorAll( '.phone-list-item' ).length ).toBe( 3 );
        expect(
          compiled.querySelector( '.phone-list-item:nth-child(1)' ).textContent
        ).toContain( 'Phone 2' );
        expect(
          compiled.querySelector( '.phone-list-item:nth-child(2)' ).textContent
        ).toContain( 'Phone 1' );
        expect(
          compiled.querySelector( '.phone-list-item:nth-child(3)' ).textContent
        ).toContain( 'Phone 0' );
      });
    });
  }) );
});
