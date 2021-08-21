import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from '../recipes/recipes.service';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import * as fromApp from '../store/store.reducer';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService implements OnInit {
  constructor(
    private http: HttpClient,
    private recipesService: RecipesService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}
  ngOnInit() {}

  storeRecipes() {
    this.store
      .select('auth')
      .pipe(
        take(1),
        map((authState) => authState.user)
      )
      .subscribe((user) => {
        const recipes = this.recipesService.getAllRecipes();
        this.http
          .put(
            'https://ng-course-recipe-book-a1023-default-rtdb.firebaseio.com/recipes.json',
            recipes,
            { headers: new HttpHeaders({ 'Content-type': 'application/json' }) }
          )
          .subscribe((res) => console.log(res));
      });
  }
  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://ng-course-recipe-book-a1023-default-rtdb.firebaseio.com/recipes.json',
        { headers: new HttpHeaders({ 'Content-type': 'application/json' }) }
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
