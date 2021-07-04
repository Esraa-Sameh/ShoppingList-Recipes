import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppinglistService } from './shopping-list.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  ingredientsChangedSubscription : Subscription;

  constructor(private shoppinglistService : ShoppinglistService) { 
  }

  ngOnInit(): void {
    this.ingredients = this.shoppinglistService.getIngredients();
    this.ingredientsChangedSubscription = this.shoppinglistService.ingredientsChanged.subscribe(ingredients => this.ingredients = ingredients)
  }
  ngOnDestroy () {
    this.ingredientsChangedSubscription.unsubscribe()
  }

  onEditItem(index: number){
    this.shoppinglistService.startedEditing.next(index);
  }

}
