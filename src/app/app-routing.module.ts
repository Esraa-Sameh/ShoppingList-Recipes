import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
//import { ResolverService } from './shared/resolver.service';

const routes: Routes = [
  { path: '', component: RecipesComponent, pathMatch: 'full' },
  { path: 'recipes', component: RecipesComponent},
  { path: 'shopping', component: ShoppingListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
