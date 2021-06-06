import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from 'src/app/services/firebase.service';
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
    private toastr: ToastrService
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  signUp(): void {
    this.signupCreds = this.signupForm.value;
    this.fireService.createAccount(this.signupCreds).subscribe(
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
