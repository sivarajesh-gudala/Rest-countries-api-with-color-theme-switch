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
import { RegisterComponent } from './components/register/register.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

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
    RegisterComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedLibModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyDADMX4uCVx2z_0rAgyYpjxbkUnfZYnyaA',
      authDomain: 'rest-countries-98d9c.firebaseapp.com',
      projectId: 'rest-countries-98d9c',
      storageBucket: 'rest-countries-98d9c.appspot.com',
      messagingSenderId: '1047031453639',
      appId: '1:1047031453639:web:8862f2c6b14f2b957cabe2',
    }),
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
