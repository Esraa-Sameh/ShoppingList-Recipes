import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResolverService } from '../shared/resolver.service';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesComponent } from './recipes.component';
import { SelectComponent } from './select.component';
const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    resolve: { allRecipes: ResolverService },
    children: [
      { path: '', component: SelectComponent, pathMatch: 'full' },
      { path: 'new', component: RecipeEditComponent },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [ResolverService],
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [ResolverService],
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
