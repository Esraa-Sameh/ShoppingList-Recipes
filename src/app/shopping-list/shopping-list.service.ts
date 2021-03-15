import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class ShoppinglistService {
    private ingredients : Ingredient[] = [
        new Ingredient('Apple',5), 
        new Ingredient('Pineapple',3)
    ]
    public ingredientsChanged : Subject<Ingredient[]> = new Subject<Ingredient[]>();
    constructor () {}
    getIngredients () {
        return this.ingredients.slice();
    }
    addIngredient (ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice())
    }
    addIngredients (ingredients: Ingredient[]){
        this.ingredients.push(...ingredients)
        this.ingredientsChanged.next(this.ingredients.slice())
    }
}