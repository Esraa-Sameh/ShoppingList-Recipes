import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];
  
  constructor(private route: ActivatedRoute, private recipesService: RecipesService) {
  }
  ngOnInit(): void {
    this.route.data.subscribe (res => this.recipes = res.allRecipes);
    //this.recipes = this.recipesService.getAllRecipes();
  }
}
