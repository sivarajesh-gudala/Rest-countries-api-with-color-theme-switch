import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedLibModule } from './shared/modules/shared-lib.module';
import { AngularFireModule } from '@angular/fire';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
