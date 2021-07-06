import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseData {
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
  constructor(private http: HttpClient) {}
  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC1ZnzI7wswm8dRuW9IqM2cTmYzJsTW2sU',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {this.handleAuthentication(resData.email, resData.localId, resData.idToken, resData.expiresIn)})
      );
  }

  logIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC1ZnzI7wswm8dRuW9IqM2cTmYzJsTW2sU',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(catchError(this.handleError),
      tap((resData) => {this.handleAuthentication(resData.email, resData.localId, resData.idToken, resData.expiresIn)}));
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
    this.user.next(user);
  }
}
