import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  signUpStatus: boolean = false;
  constructor(
    private fb: FormBuilder,
    private fireService: FirebaseService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  login(): void {
    this.credentials = this.loginForm.value;
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
  }
}
