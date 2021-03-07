import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  
  @Input() recipe;
  @Output () recipeSelected = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  onRecipeSelected() {
    this.recipeSelected.emit();
  }
}
