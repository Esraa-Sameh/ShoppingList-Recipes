import { Injectable, EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({
    providedIn: "root"
})
export class ShoppinglistService {
    private ingredients : Ingredient[] = [
        new Ingredient('Apple',5), 
        new Ingredient('Pineapple',3)
    ]
    public ingredientsChanged : EventEmitter<Ingredient[]> = new EventEmitter<Ingredient[]>();
    constructor () {}
    getIngredients () {
        return this.ingredients.slice();
    }
    addIngredient (ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients.slice())
    }
    addIngredients (ingredients: Ingredient[]){
        this.ingredients.push(...ingredients)
        this.ingredientsChanged.emit(this.ingredients.slice())
    }
}