import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from '../recipes/recipes.service';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService implements OnInit {
  constructor(
    private http: HttpClient,
    private recipesService: RecipesService,
    private authService: AuthService
  ) {}
  ngOnInit() {}

  storeRecipes() {
    this.authService.user.pipe(take(1)).subscribe((user) => {
      const recipes = this.recipesService.getAllRecipes();
      this.http
        .put(
          'https://ng-course-recipe-book-a1023-default-rtdb.firebaseio.com/recipes.json',
          recipes
        )
        .subscribe((res) => console.log(res));
    });
  }
  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://ng-course-recipe-book-a1023-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => this.recipesService.setRecipes(recipes))
      );
  }
}
