import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from 'src/app/services/firebase.service';
import { SharedService } from 'src/app/services/shared.service';
import { userDetails } from 'src/app/shared/user-details.interface';
import { Path, RoutePath } from 'src/app/shared/enums/route-path.enum';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  signupForm: FormGroup;
  signupCreds: userDetails;
  constructor(
    private fb: FormBuilder,
    private fireService: FirebaseService,
    private router: Router,
    private toastr: ToastrService,
    private sharedService: SharedService
  ) {
    this.signupForm = this.fb.group({
      username: sharedService.valid.username,
      email: sharedService.valid.email,
      password: sharedService.valid.password,
    });
  }

  signUp(): void {
    this.signupCreds = this.signupForm.value;
    if (this.signupForm.valid) {
      this.fireService.createAccount(this.signupCreds).subscribe(
        (result) => {
          if (this.fireService.isLoggedin === true) {
            console.log(result);
            this.toastr.success(
              this.sharedService.capitalizeFirstLetter(
                this.signupForm.value.username
              ),
              'Welcome',
              {
                timeOut: 5000,
              }
            );
            this.router.navigate([RoutePath.ALLCOUNTRIES]);
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

  switchToLogin(): void {
    this.router.navigate([Path.LOGIN]);
  }
}
