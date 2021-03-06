import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { SelectComponent } from './recipes/select.component';
import { ResolverService } from './shared/resolver.service';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipesComponent,
    resolve: { allRecipes: ResolverService },
    children: [
      { path: '', component: SelectComponent, pathMatch: 'full' },
      { path: 'new', component: RecipeEditComponent},
      { path: ':id', component: RecipeDetailComponent, resolve: [ResolverService]},
      { path: ':id/edit', component: RecipeEditComponent, resolve: [ResolverService]}
    ],
  },
  { path: 'shopping', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
