import { Component, Input, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/recipes/recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
 @Input() recipe : Recipe;
  constructor(public recipesService: RecipesService) { 
  }
  ngOnInit(): void {
  }

}
