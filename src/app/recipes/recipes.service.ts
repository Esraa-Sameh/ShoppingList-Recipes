import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from "../shopping-list/store/shopping-list.reducer";
import * as fromApp from "../store/store.reducer"
@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  recipesChanged: Subject<Recipe[]> = new Subject();
  private recipes : Recipe [] = [];

  constructor(private store: Store<fromApp.AppState>) {}

  getAllRecipes(): Recipe[] {
    return this.recipes.slice();
  }
  onAddIngredients(ingredients: Ingredient[]) {
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    //this.sLService.addIngredients(ingredients);
  }
  getSingleRecipe(index: number): Recipe {
    return this.recipes[index];
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe (index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
  setRecipes (recipes : Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
