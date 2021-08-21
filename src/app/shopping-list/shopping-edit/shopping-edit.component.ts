import { Component, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from "../../store/store.reducer";
import * as fromShoppingList from '../store/shopping-list.reducer';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('addIngredientForm') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  // editedItemIndex: number;
  editedItem: Ingredient;

  constructor(
    private store: Store<fromApp.AppState>
  ) {}
  ngOnInit(): void {
    this.subscription = this.store
      .select('shoppingList')
      .subscribe((stateData) => {
        if (stateData.editedIndex > -1) {
          // this.editedItemIndex = stateData.editedIndex;
          this.editedItem = stateData.editedIngredient;
          this.editMode = true;
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
          });
        }
        else{
          this.editMode = false;
        }
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(
      new ShoppingListActions.DeleteIngredient()
    );
  }
  onSubmit(addIngredientForm: NgForm) {
    if (this.editMode) {
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient(addIngredientForm.value)
      );
    } else {
      this.store.dispatch(
        new ShoppingListActions.AddIngredient(addIngredientForm.value)
      );
    }
    this.editMode = false;
    this.slForm.reset();
  }
  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEditing());
  }
  onDelete() {
    this.store.dispatch(
      new ShoppingListActions.DeleteIngredient()
    );
    this.onClear();
  }
}
