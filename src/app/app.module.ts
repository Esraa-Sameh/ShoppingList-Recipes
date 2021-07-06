import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { SelectComponent } from './recipes/select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownDirective } from './shared/dropdown.directive';
import { RecipesService } from './recipes/recipes.service';
import { ShoppinglistService } from './shopping-list/shopping-list.service';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    SelectComponent,
    RecipeEditComponent,
    AuthComponent,
    LoadingSpinnerComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [RecipesService, ShoppinglistService],
  bootstrap: [AppComponent],
})
export class AppModule {}
