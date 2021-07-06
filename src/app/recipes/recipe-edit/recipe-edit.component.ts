import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    private router : Router
  ) {}
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.editMode = params['id'] !== undefined;
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = '';
    let recipeImageURL = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    if (this.editMode) {
      let recipe: Recipe = this.recipesService.getSingleRecipe(this.id);
      recipeName = recipe.name;
      recipeImageURL = recipe.imageURL;
      recipeDescription = recipe.description;
      if (recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/[1-9]+[0-9]*$/)]),
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imageURL': new FormControl(recipeImageURL, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }
  get controls (){
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  onSubmit() {
    if(this.editMode){
      console.log(this.recipeForm.value);
      this.recipesService.updateRecipe(this.id, this.recipeForm.value)
    }
    else{
      console.log(this.recipeForm.value);
      this.recipesService.addRecipe(this.recipeForm.value)
    }
    this.onCancel();
  }
  onAddIngredient (){
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/[1-9]+[0-9]*$/)])
    }))
  }
  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
