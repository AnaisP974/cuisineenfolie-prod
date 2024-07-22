import Recette from './recette';

export interface AddRecipeAction {
  type: 'ADD_RECIPE';
  payload: Recette;
}

export interface RemoveRecipeAction {
  type: 'REMOVE_RECIPE';
  payload: number; // ID de la recette à supprimer
}

export interface LoadRecipesAction {
  type: 'LOAD_RECIPES';
  payload: Recette[];
}
