import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Resolve,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from '../recipes/recipes.service';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ResolverService implements Resolve<any> {
  constructor(
    private activatedRoute: ActivatedRoute,
    private recipesService: RecipesService,
    private dataStorageService: DataStorageService
  ) {}
  resolve(route: ActivatedRouteSnapshot) {
    let recipes = this.recipesService.getAllRecipes();
    if (recipes.length === 0){
      return this.dataStorageService.fetchRecipes();
    }
    else{
      return recipes
    }
  }
}
