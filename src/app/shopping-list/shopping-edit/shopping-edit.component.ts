import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppinglistService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  constructor(private shoppinglistService : ShoppinglistService) { }
  @Output() onAddIngredient = new EventEmitter<Ingredient>();
  ngOnInit(): void {
  }
  onAddClick(addIngredientForm : NgForm){
    this.shoppinglistService.addIngredient(addIngredientForm.value)

  }
}
