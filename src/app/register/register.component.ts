import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private formbuilder: FormBuilder, 
    private auth: AuthService,
    private route: Router
  ) { }

  registerForm = this.formbuilder.group({
    user: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.minLength(2)]],
    password: ['', [Validators.required, Validators.minLength(2)]],
  })

  //USER property
  get USER() {
    return this.registerForm.get('user');
  }

  //EMAIL property
  get EMAIL() {
    return this.registerForm.get('email');
  }

  //password property
  get PASSWORD() {
    return this.registerForm.get('password');
  }

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = "";

  ngOnInit(): void {
  }

  onSubmit() {

    let userSign = this.USER?.value;
    let emailSign = this.EMAIL?.value;
    let passSign = this.PASSWORD?.value;

    if ((userSign != null) && (emailSign != null) && (passSign != null)) {
      this.auth.register(userSign,emailSign, passSign).subscribe(
        () => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.route.navigate(['login']);
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
          console.log(this.errorMessage);
        }
      );
    }

  }

}
