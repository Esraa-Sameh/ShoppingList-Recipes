import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SelectComponent } from './recipes/select.component';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from './core.module';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SelectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forRoot({shoppingList: shoppingListReducer}),
    CoreModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
