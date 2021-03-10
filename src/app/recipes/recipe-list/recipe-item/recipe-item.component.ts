import { Component, Input, OnInit } from '@angular/core';
import { RecipesService } from '../../recipes.service';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  
  @Input() recipe;
  
  constructor(private recipesService : RecipesService) { }

  ngOnInit(): void {
  }
  onRecipeSelected() {
   this.recipesService.detailedRecipe.emit(this.recipe)
  }
}
