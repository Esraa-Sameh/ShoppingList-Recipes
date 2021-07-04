import { Component, Input, OnInit } from '@angular/core';
import { RecipesService } from '../../recipes.service';
import { Recipe } from '../../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  
  @Input() recipe;
  @Input () index;
  constructor(private recipesService : RecipesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
 
}
