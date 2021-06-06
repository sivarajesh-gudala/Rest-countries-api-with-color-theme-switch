import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs/operators';
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
  resetForm: FormGroup;
  toggle: boolean;

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
    this.resetForm = this.fb.group({
      resetpwdemail: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  login(): void {
    this.credentials = this.loginForm.value;
    this.fireService.signInCredentials(this.credentials).subscribe(
      (success) => {
        if (this.fireService.isLoggedin === true) {
          this.toastr.success('Welcome', '', {
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

  resetPassword(): void {
    this.fireService
      .resetPassword(this.resetForm.value.resetpwdemail)
      .subscribe(
        (success) => {
          this.toastr.info(
            this.resetForm.value.resetpwdemail,
            'Reset link has been sent to your mail Please check ',
            { timeOut: 5000 }
          );
        },
        (err) => {
          console.log(err.message);
          this.toastr.error(err.message, '', { timeOut: 5000 });
        }
      );
  }

  showPassword(): void {
    this.toggle = !this.toggle;
    let value = document.getElementById('password');
    if (value['type'] == 'password') {
      value['type'] = 'text';
    } else {
      value['type'] = 'password';
    }
  }
}
