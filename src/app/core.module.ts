import { NgModule } from '@angular/core';
import { RecipesService } from './recipes/recipes.service';
import { ShoppinglistService } from './shopping-list/shopping-list.service';
import { AuthInterceptor } from './auth/auth.interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth/auth.guard';

@NgModule({
  providers: [
    RecipesService,
    ShoppinglistService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class CoreModule {}
