import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { PhoneDetailComponent } from './phone-detail/phone-detail.component';
import { PhoneService } from './services';
import { PhoneListComponent } from './phone-list/phone-list.component';
import { CheckmarkPipe } from './pipes/checkmark.pipe';

import { AppRoutingModule } from './app-routing.module';

@NgModule( {
  declarations: [
    AppComponent,
    PhoneListComponent,
    PhoneDetailComponent,
    CheckmarkPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [PhoneService],
  bootstrap: [AppComponent]
})
export class AppModule { }
