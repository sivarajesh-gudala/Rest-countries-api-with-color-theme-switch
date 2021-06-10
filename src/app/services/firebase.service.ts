import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable, from } from 'rxjs';
import { userDetails } from '../shared/user-details.interface';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  isLoggedin = false;
  userDetails: any;
  constructor(private authService: AngularFireAuth) {}

  /** Login
   * @param email
   * @param password
   */
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

  /** Sign up
   * @param username
   * @param email
   * @param password
   */
  createAccount(credentials: userDetails): Observable<any> {
    return from(
      this.authService
        .createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then((res) => {
          this.isLoggedin = true;
          res.user.updateProfile({
            displayName: credentials.username,
          });
          localStorage.setItem('user-details', JSON.stringify(res.user));
        })
    );
  }

  /** Reset Password
   * @param email
   */
  resetPassword(email: any): Observable<any> {
    return from(
      this.authService.sendPasswordResetEmail(email).then((res) => {})
    );
  }

  /** Sign out from the account */
  logout() {
    this.authService.signOut();
    localStorage.removeItem('user-details');
  }
}
