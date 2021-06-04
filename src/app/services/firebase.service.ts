import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { userDetails } from '../shared/user-details.interface';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  isLoggedin = false;
  constructor(private authService: AngularFireAuth) {}

  signInCredentials(credentials: userDetails): Observable<any> {
    return from(
      this.authService
        .signInWithEmailAndPassword(credentials.email, credentials.password)
        .then((res) => {
          this.isLoggedin = true;
          localStorage.setItem('user-details', JSON.stringify(res.user));
        })
    );
  }

  createAccount(credentials: userDetails): Observable<any> {
    return from(
      this.authService
        .createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then((res) => {
          this.isLoggedin = true;
          localStorage.setItem('user-details', JSON.stringify(res.user));
        })
    );
  }

  logout() {
    
    this.authService.signOut();
    localStorage.removeItem('user-details');
  }
}
