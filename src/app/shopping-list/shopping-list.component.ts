import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import * as fromApp from "../store/store.reducer";
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
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
  }
  ngOnDestroy() {
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEditing(index))
  }
}
