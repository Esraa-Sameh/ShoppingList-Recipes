import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import { environment } from '../../environments/environment';
export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  constructor(private http: HttpClient, private router: Router) {}
  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${environment.firebaseAPIKey}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${environment.firebaseAPIKey}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            resData.expiresIn
          );
        })
      );
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('user');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null;
    this.router.navigate(['/auth']);

  }
  autoLogIn() {
    const user: {
      email: string;
      _token: string;
      _id: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      return;
    }
    let loadedUser = new User(
      user.email,
      user._token,
      user._id,
      new Date(user._tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
      let expirationDuration = new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogOut(expirationDuration)
    }
  }
  autoLogOut(expirationDuration: number){
    console.log(expirationDuration)
   this.tokenExpirationTimer = setTimeout(() => {
      this.logout()
    }, expirationDuration)
  }
  private handleError(errorResponse: HttpErrorResponse) {
    let errMessage = 'An unknown error occured';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errMessage = 'This email already exists';
        break;
      case 'USER_DISABLED':
        errMessage = 'The user account has been disabled by an administrator';
        break;
      case 'EMAIL_NOT_FOUND':
        errMessage = 'Incorrect email or password';
        break;
      case 'INVALID_PASSWORD':
        errMessage = 'Incorrect email or password';
        break;
    }

    return throwError(errMessage);
  }
  private handleAuthentication(
    email: string,
    token: string,
    userId: string,
    expiresIn: string
  ) {
    let expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.autoLogOut(+expiresIn * 1000)
    localStorage.setItem('user', JSON.stringify(user));
    this.user.next(user);
  }
}
