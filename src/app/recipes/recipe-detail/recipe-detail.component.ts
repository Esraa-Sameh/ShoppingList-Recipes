import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipesService } from 'src/app/recipes/recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe;
  constructor(
    public recipesService: RecipesService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
  this.route.params.subscribe(params => {
   this.recipe = this.recipesService.getSingleRecipe(params['id'])
  })
    // this.route.data.subscribe((recipe) => {
    //   this.recipe = recipe.recipe[0]
    // });
    
  }
  onAddClick() {
    this.recipesService.onAddIngredients(this.recipe.ingredients);
  }
}
