import { Component, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppinglistService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('addIngredientForm') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppinglistService: ShoppinglistService) {}
  ngOnInit(): void {
    this.subscription = this.shoppinglistService.startedEditing.subscribe(
      (index) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppinglistService.getIngredient(
          this.editedItemIndex
        );
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onSubmit(addIngredientForm: NgForm) {
    if (this.editMode) {
      this.shoppinglistService.updateIngredient(
        this.editedItemIndex,
        addIngredientForm.value
      );
    } else {
      this.shoppinglistService.addIngredient(addIngredientForm.value);
    }
    this.editMode = false;
    this.slForm.reset();
  }
  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }
  onDelete (){
    this.shoppinglistService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
