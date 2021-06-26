import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from 'src/app/services/firebase.service';
import { SharedService } from 'src/app/services/shared.service';
import { userDetails } from 'src/app/shared/user-details.interface';
import { Path } from 'src/app/shared/enums/route-path.enum';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @ViewChild('togglePwd') togglePwd;

  credentials: userDetails;
  loginForm: FormGroup;
  resetForm: FormGroup;
  toggle: boolean;

  constructor(
    private fb: FormBuilder,
    private fireService: FirebaseService,
    private router: Router,
    private toastr: ToastrService,
    private sharedService: SharedService
  ) {
    this.loginForm = this.fb.group({
      email: this.sharedService.valid.email,
      password: this.sharedService.valid.password,
    });
    this.resetForm = this.fb.group({
      resetpwdemail: this.sharedService.valid.email,
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this.credentials = this.loginForm.value;
      this.fireService.signInCredentials(this.credentials).subscribe(
        (success) => {
          console.log(success);
          let userName = JSON.parse(localStorage.getItem('user-details'));

          if (this.fireService.isLoggedin === true) {
            this.toastr.success(
              this.sharedService.capitalizeFirstLetter(userName.displayName),
              'Welcome Back',
              {
                timeOut: 5000,
              }
            );
            this.router.navigate([Path.ALLCOUNTRIES]);
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

  resetPassword(): void {
    if (this.resetForm.valid) {
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
  }

  showPassword(): void {
    this.toggle = !this.toggle;
    let value = this.togglePwd.nativeElement;
    if (value.type === 'password') {
      value.type = 'text';
    } else {
      value.type = 'password';
    }
  }

  switchToSignUp(): void {
    this.router.navigate([Path.SIGNUP]);
  }
}
