import { Action } from '@ngrx/store';

export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';
export class LogIn implements Action {
 readonly type = LOGIN;
  constructor(
    public payload: {
      email: string;
      id: string;
      token: string;
      expirationDate: Date;
    }
  ) {}
}

export class LogOut implements Action {
    readonly type = LOGOUT
}

export type AuthActions = LogIn | LogOut;