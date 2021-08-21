import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { take, exhaustMap, map } from 'rxjs/operators';
import * as fromApp from "../store/store.reducer";
import { Store } from '@ngrx/store';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private store: Store<fromApp.AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('auth').pipe(
      take(1),
      map (authState => authState.user),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        } else {
          const modifiedRequest = req.clone({
            params: new HttpParams().set('auth', user.token),
          });
          return next.handle(modifiedRequest);
        }
      })
    );
  }
}
