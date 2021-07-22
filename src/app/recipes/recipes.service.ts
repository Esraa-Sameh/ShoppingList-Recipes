import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppinglistService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  recipesChanged: Subject<Recipe[]> = new Subject();
  private recipes : Recipe [] = [];

  constructor(private sLService: ShoppinglistService) {}

  getAllRecipes(): Recipe[] {
    return this.recipes.slice();
  }
  onAddIngredients(ingredients: Ingredient[]) {
    this.sLService.addIngredients(ingredients);
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
