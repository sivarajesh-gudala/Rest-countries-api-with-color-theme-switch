import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { SharedLibModule } from './shared/shared-lib.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CountriesListComponent } from './components/countries-list/countries-list.component';
import { SelectedCountryDataComponent } from './components/selected-country-data/selected-country-data.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { FilterPipe } from './shared/pipes/filter.pipe';
import { ComaSeperatorPipe } from './shared/pipes/coma-seperator.pipe';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CountriesListComponent,
    SelectedCountryDataComponent,
    PageNotFoundComponent,
    FilterPipe,
    ComaSeperatorPipe,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedLibModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
