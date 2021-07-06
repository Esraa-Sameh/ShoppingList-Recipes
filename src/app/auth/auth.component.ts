import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  authObs : Observable<AuthResponseData>;
  constructor(private authService: AuthService, private router : Router) {}
  onSubmit(form: NgForm) {
    if (form.valid) {
      let email = form.value.email;
      let password = form.value.password;
      if (!this.isLoginMode) {
          this.isLoading = true;
          this.authObs = this.authService.signUp(email,password);
      } else {
            this.isLoading = true;
            this.authObs = this.authService.logIn(email,password);
      }
      this.authObs.subscribe(
        res => {
            this.isLoading = false;
            this.router.navigate(['/recipes'])
        },
        errorMsg => {
            this.error = errorMsg;
            this.isLoading = false
        }
    );
    }

    form.reset();
  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
