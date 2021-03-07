import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  detailedRecipe : Recipe;
  constructor() { }

  ngOnInit(): void {
  }
  changeDetailedRecipe(recipe: Recipe){
    this.detailedRecipe = recipe;
    //console.log(this.detailedRecipe)
  }
}
