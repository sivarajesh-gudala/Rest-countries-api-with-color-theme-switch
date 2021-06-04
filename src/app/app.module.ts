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

import { AngularFireModule } from '@angular/fire';
import { FirebaseService } from './services/firebase.service';
import { ConfirmDialogComponent } from './components/countries-list/confirm-dialog/confirm-dialog.component';

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
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedLibModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyBaBSMteFWT3CG2qbeeu3rd2gPwQObGyVw',
      authDomain: 'angular-auth-cef5a.firebaseapp.com',
      projectId: 'angular-auth-cef5a',
      storageBucket: 'angular-auth-cef5a.appspot.com',
      messagingSenderId: '419400705454',
      appId: '1:419400705454:web:bd41b9a5e1aa25dc36143f',
    }),
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
