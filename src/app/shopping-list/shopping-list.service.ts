import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({
    providedIn: "root"
})
export class ShoppinglistService {
    private ingredients : Ingredient[] = [
        new Ingredient('Apple',5), 
        new Ingredient('Pineapple',3)
    ]
    constructor () {}
    getIngredients () {
        return this.ingredients;
    }
    addIngredient (ingredient: Ingredient) {
        this.ingredients.push(ingredient);
    }
}