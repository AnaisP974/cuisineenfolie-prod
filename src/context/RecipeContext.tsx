import { createContext, useReducer, ReactNode, Dispatch, useEffect } from 'react';
import { AddRecipeAction, LoadRecipesAction, RemoveRecipeAction } from '../interfaces/useReducer';
import { getAllRecipes } from '../function/getAll';
import Recette from '../interfaces/recette';

// Définition de l'état initial
interface State {
  recipes: Recette[];
}

// Définition des types d'action
type Action = AddRecipeAction | RemoveRecipeAction | LoadRecipesAction;

// Réducteur pour gérer les actions
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_RECIPE':
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    case 'REMOVE_RECIPE':
      return {
        ...state,
        recipes: state.recipes.filter(recipe => recipe.id !== action.payload),
      };
    case 'LOAD_RECIPES':
      return {
        ...state,
        recipes: action.payload,
      };
    default:
      return state;
  }
};

// État initial
const initialState: State = {
  recipes: [],
};

// Propriétés du contexte
interface RecipeContextProps {
  state: State;
  dispatch: Dispatch<Action>;
}

// Création du contexte
const RecipeContext = createContext<RecipeContextProps | undefined>(undefined);

// Composant Provider du contexte
const RecipeProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Effet pour charger les recettes au démarrage
  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await getAllRecipes();
      dispatch({ type: 'LOAD_RECIPES', payload: data });
    };
    fetchRecipes();
  }, []);

  // Retourne le fournisseur de contexte avec l'état et le dispatch, enveloppant les enfants.
  return (
    <RecipeContext.Provider value={{ state, dispatch }}>
      {children}
    </RecipeContext.Provider>
  );
};

export { RecipeContext, RecipeProvider };
