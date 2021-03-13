import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppinglistService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private recipes: Recipe[] = [
    new Recipe(
      'Burger',
      'A hamburger (also burger for short) is a sandwich consisting of one or more cooked patties of ground meat, usually beef, placed inside a sliced bread roll or bun. The patty may be pan fried, grilled, smoked or flame broiled.',
      'https://singlestroke.io/wp-content/uploads/2015/10/high-quality-food-stock-photos-thumbnail.jpg',
      [new Ingredient('Meat',2), new Ingredient('Bun',1), new Ingredient('Lettuce',1)]
    ),
    new Recipe(
      'Pancakes',
      'A pancake is a flat cake, often thin and round, prepared from a starch-based batter that may contain eggs, milk and butter and cooked on a hot surface such as a griddle or frying pan, often frying with oil or butter.',
      'https://i.ytimg.com/vi/ziaFcwgEQg4/maxresdefault.jpg',
      [new Ingredient('Flour', 2), new Ingredient('Eggs', 1), new Ingredient('Baking Powder', 1)]
    ),
  ];
  public detailedRecipe: EventEmitter<Recipe> = new EventEmitter<Recipe>();
  constructor(private sLService: ShoppinglistService) {}

  getAllRecipes() : Recipe[] {
    return this.recipes.slice();
  }
  onAddIngredients (ingredients: Ingredient[]){
    this.sLService.addIngredients(ingredients)
  }
}
