import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  detailedRecipe : Recipe;
  constructor(private recipesService : RecipesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  this.recipesService.detailedRecipe.subscribe(recipe => this.detailedRecipe = recipe)
  }
}
