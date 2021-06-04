import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { userDetails } from 'src/app/shared/user-details.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  credentials: userDetails;

  loginForm: FormGroup;
  @Input() loginStatus: boolean = false;
  signUpStatus: boolean = false;
  constructor(
    private fb: FormBuilder,
    private fireService: FirebaseService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('user-details') !== null) {
      this.loginStatus = true;
    } else {
      this.loginStatus = false;
    }
  }

  login(): void {
    this.credentials = this.loginForm.value;
    this.fireService.signInCredentials(this.credentials).subscribe((result) => {
      if (this.fireService.isLoggedin === true) {
        this.loginStatus = true;
        this.router.navigate(['/countries']);
      }
    });
  }

  signUp(): void {
    this.credentials = this.loginForm.value;
    this.fireService.createAccount(this.credentials).subscribe((val) => {
      if (this.fireService.isLoggedin === true) {
        this.loginStatus = true;
        this.router.navigate(['/countries']);
      }
    });
  }

  createAccount(): void {
    this.signUpStatus = true;
  }
}
