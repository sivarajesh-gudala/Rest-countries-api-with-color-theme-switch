import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from 'src/app/services/firebase.service';
import { userDetails } from 'src/app/shared/user-details.interface';
import { Location } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  credentials: userDetails;

  loginForm: FormGroup;
  signUpStatus: boolean = false;
  constructor(
    private fb: FormBuilder,
    private fireService: FirebaseService,
    private router: Router,
    private toastr: ToastrService,
    private location: Location
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  signUp(): void {
    this.credentials = this.loginForm.value;
    if (this.signUpStatus === true) {
      this.fireService.signInCredentials(this.credentials).subscribe(
        (result) => {
          if (this.fireService.isLoggedin === true) {
            this.toastr.success('Login Successfull', '', {
              timeOut: 3000,
            });
            this.router.navigate(['/countries']);
          }
        },
        (error) => {
          this.toastr.error('', error.message, {
            timeOut: 3000,
          });
        }
      );
    } else {
      this.fireService.createAccount(this.credentials).subscribe(
        (result) => {
          if (this.fireService.isLoggedin === true) {
            this.toastr.success('SignUp Successfull', '', {
              timeOut: 3000,
            });
            this.router.navigate(['/countries']);
          }
        },
        (error) => {
          this.toastr.error('', error.message, {
            timeOut: 3000,
          });
        }
      );
    }
  }

  switch(): void {
    this.signUpStatus = !this.signUpStatus;
    if (this.signUpStatus === true) {
      this.location.replaceState('/login');
    } else {
      this.location.replaceState('/signup');
    }
  }
}
