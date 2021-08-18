import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from "../shopping-list/store/shopping-list.actions";
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[]}>;
  ingredientsChangedSubscription: Subscription;

  constructor(
    private store: Store<fromShoppingList.AppState>
  ) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    //this.ingredients = this.shoppinglistService.getIngredients();
    // this.ingredientsChangedSubscription =
    //   this.shoppinglistService.ingredientsChanged.subscribe(
    //     (ingredients) => (this.ingredients = ingredients)
    //   );
  }
  ngOnDestroy() {
    //this.ingredientsChangedSubscription.unsubscribe();
  }

  onEditItem(index: number) {
   // this.shoppinglistService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEditing(index))
  }
}
