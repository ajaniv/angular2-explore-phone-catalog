/* tslint:disable:no-unused-variable */

import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe( 'AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule( {
      imports: [RouterTestingModule],
      declarations: [
        AppComponent
      ],
    });
    TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent( AppComponent );
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it( 'should create the app', async(() => {
    expect( component ).toBeTruthy();
  }) );

  it( 'should render', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      const t = compiled.querySelector( 'router-outlet' );
      expect( compiled.querySelector( 'router-outlet' ).outerHTML ).toContain( 'router-outlet' );
    });
  }) );
});
