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

    public startedEditing = new Subject<number>();
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
    getIngredient (index:number){
        return this.ingredients[index];
    }
    updateIngredient (index:number, ingredient: Ingredient){
        this.ingredients[index] = ingredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    deleteIngredient (index: number){
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice())
    }
}