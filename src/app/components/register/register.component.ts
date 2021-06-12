import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from 'src/app/services/firebase.service';
import { SharedService } from 'src/app/services/shared.service';
import { userDetails } from 'src/app/shared/user-details.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
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
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[a-zA-Z]{1}[a-zA-Z0-9]*'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

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
            this.router.navigate(['/all-countries']);
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
}
