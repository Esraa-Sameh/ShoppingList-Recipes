// import { Injectable } from '@angular/core';
// import { ActivatedRoute, ActivatedRouteSnapshot, Resolve } from '@angular/router';
// import { Observable } from 'rxjs';
// import { Recipe } from '../recipes/recipe.model';
// import { RecipesService } from '../recipes/recipes.service';
// import { ShoppinglistService } from '../shopping-list/shopping-list.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class ResolverService implements Resolve<any> {
//   constructor(
//     private activatedRoute: ActivatedRoute,
//     private recipesService: RecipesService,
//     private slService: ShoppinglistService
//   ) {}
//   resolve(route: ActivatedRouteSnapshot) : Observable<any>{
//       if(route.url[0].path === 'recipes'){
//           //console.log(this.recipesService.getAllRecipes())
//          // return this.recipesService.getAllRecipes()
//       }
//       if (route.url[0].path === 'shopping'){
//          // return this.slService.getIngredients()
//       }
//   }
// }
