import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';

import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CountriesListComponent } from './components/countries-list/countries-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ComaSeperatorPipe } from './shared/coma-seperator.pipe';
import { SelectedCountryDataComponent } from './components/selected-country-data/selected-country-data.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeDirective } from './dark-theme/theme.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CountriesListComponent,
    ComaSeperatorPipe,
    SelectedCountryDataComponent,
    ThemeDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
