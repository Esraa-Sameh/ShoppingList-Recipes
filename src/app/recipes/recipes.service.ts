import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private recipes = [
    new Recipe(
      'Recipe 1',
      'Description 1',
      'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2017/12/10/0/WU1712H_Cauliflower-Mac-and-Cheese_s4x3.jpg.rend.hgtvcom.616.462.suffix/1580140849133.jpeg'
    ),
    new Recipe(
      'Recipe 2',
      'Recipe 2 description',
      'https://www.indianhealthyrecipes.com/wp-content/uploads/2019/11/samosa-recipe-480x270.jpg'
    ),
  ];
  public detailedRecipe : EventEmitter<Recipe> = new EventEmitter<Recipe>();
  constructor() {}

  getAllRecipes() {
    return this.recipes.slice();
  }
}
