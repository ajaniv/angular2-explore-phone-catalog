/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { CheckmarkPipe } from '../pipes';
import { PhoneDetailComponent } from './phone-detail.component';
import { PhoneService } from '../services';
import { Phone } from '../models';
import { testPhone, MockPhoneService } from '../testing/phones';

describe( 'PhoneDetailComponent', () => {
    let component: PhoneDetailComponent;
    let fixture: ComponentFixture<PhoneDetailComponent>;

    const routes = [
      { path: 'phone/:id', component: PhoneDetailComponent }
    ];

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ CheckmarkPipe, PhoneDetailComponent ],
        imports: [
          RouterTestingModule.withRoutes(routes)
        ],
        providers: [
          { provide: PhoneService, useClass: MockPhoneService }
        ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent( PhoneDetailComponent );
        component = fixture.componentInstance;
        component.phone = testPhone();
        fixture.detectChanges();
    });

    it( 'should create', () => {
        expect( component ).toBeTruthy();
    });

    it('should fetch phone detail', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h1').textContent).toContain(testPhone().name);
    });


});

