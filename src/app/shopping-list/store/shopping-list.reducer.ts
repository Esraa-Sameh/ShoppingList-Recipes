import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';
export interface AppState {
  shoppingList: State;
}
export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIndex: number;
}
const initialState: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editedIngredient: null,
  editedIndex: -1,
};
export function shoppingListReducer(
  state: State = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };

    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };

    case ShoppingListActions.UPDATE_INGREDIENT: {
      let ingredient: Ingredient = state.ingredients[state.editedIndex];
      let updatedIngredient = { ...ingredient, ...action.payload };
      let updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredient: null, editedIndex: -1
      };
    }
    case ShoppingListActions.DELETE_INGREDIENT: {
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ingredient, index) => index !== state.editedIndex
        ),
        editedIngredient: null, editedIndex: -1
      };
    }

    case ShoppingListActions.START_EDITING:
      let editedIngredient = { ...state.ingredients[action.payload] };
      return {
        ...state,
        editedIngredient: editedIngredient,
        editedIndex: action.payload,
      };

    case ShoppingListActions.STOP_EDITING:
      return { ...state, editedIngredient: null, editedIndex: -1 };
    default:
      return state;
  }
}
