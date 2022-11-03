import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private formbuilder: FormBuilder,
    private auth: AuthService,
    private route: Router
  ) { }

  loginForm = this.formbuilder.group({
    email: ['', [Validators.required, Validators.minLength(5)]],
    password: ['', [Validators.required, Validators.minLength(2)]],
  })

  //email property
  get EMAIL() {
    return this.loginForm.get('email');
  }

  //password property
  get PASSWORD() {
    return this.loginForm.get('password');
  }

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  ngOnInit(): void {

  }


  onSubmit() {
    let emaillogin = this.EMAIL?.value;
    let passlogin = this.PASSWORD?.value;

    if ((emaillogin != null) && (passlogin != null)) {
      this.auth.login(emaillogin, passlogin).subscribe(
        data => {
          console.log(data.authorisation.token);
          localStorage.setItem('authToken', data.authorisation.token);
          this.isLoggedIn = true;
          this.isLoginFailed = false;
          this.route.navigate(['home']);
        }
      );
    }

  }

}
