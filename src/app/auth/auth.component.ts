import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  authObs: Observable<AuthResponseData>;
  closeSub: Subscription;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}
  onSubmit(form: NgForm) {
    if (form.valid) {
      let email = form.value.email;
      let password = form.value.password;
      if (!this.isLoginMode) {
        this.isLoading = true;
        this.authObs = this.authService.signup(email, password);
      } else {
        this.isLoading = true;
        this.authObs = this.authService.login(email, password);
      }
      this.authObs.subscribe(
        (res) => {
          this.isLoading = false;
          this.router.navigate(['/recipes']);
        },
        (errorMsg) => {
          this.error = errorMsg;
          this.isLoading = false;
          this.showAlert();
        }
      );
    }

    form.reset();
  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onHandleError() {
    this.error = null;
  }
  showAlert() {
    let alertCmpFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    this.alertHost.viewContainerRef.clear();
    const alertCmpRef =
      this.alertHost.viewContainerRef.createComponent(alertCmpFactory);
    alertCmpRef.instance.message = this.error;
    this.closeSub = alertCmpRef.instance.close.subscribe(() => {
      this.alertHost.viewContainerRef.clear();
      this.closeSub.unsubscribe();
    });
  }
  ngOnDestroy () {
    if(this.closeSub){
      this.closeSub.unsubscribe()

    }
  }
}
