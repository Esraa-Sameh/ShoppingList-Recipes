import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  private recipesSubscription : Subscription;
  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService
  ) {}
  ngOnInit(): void {
    this.route.data.subscribe((res) => {
      this.recipes = res.allRecipes;
      this.recipesSubscription = this.recipesService.recipesChanged.subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });
    });

    //this.recipes = this.recipesService.getAllRecipes();
  }
  ngOnDestroy (){
    this.recipesSubscription.unsubscribe();
  }
}
