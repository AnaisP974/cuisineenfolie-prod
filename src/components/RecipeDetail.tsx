import { NavLink, useParams } from "react-router-dom";
import Recette from '../interfaces/recette';
import { useEffect, useState, useContext } from "react";
import FavoriteIcone from "./FavoriteIcone";
import { RecipeContext } from "../context/RecipeContext";

export default function RecipeDetail() {
    const { id } = useParams<{ id: string }>();
    const context = useContext(RecipeContext);
    const [recipe, setRecipe] = useState<Recette | null>(null); // État pour stocker la recette
    const currentUser = localStorage.getItem('RGPD'); // Récupérer l'utilisateur actuel depuis le localStorage
    const [favorites, setFavorites] =useState<Recette[]>([]);
    
    // Vérifiez que le contexte est chargé avant de l'utiliser
    useEffect(() => {
        if (context) {
            const { state } = context; // Accéder à state et dispatch depuis le contexte
            if (state.recipes.length > 0 && id) {
                const foundRecipe = state.recipes.find((recette: Recette) => recette.id === Number(id));
                setRecipe(foundRecipe || null);
            }
        }
    }, [context, id]); // Dépendances: context et id

    if (!context) {
        return <div>Chargement du contexte...</div>;
    }

    const { state } = context;

    if (state.recipes.length === 0) {
        return <div>Loading...</div>;
    }

    if (!recipe) {
        return <div>Aucune recette trouvée</div>;
    }

    // Fonction pour gérer la suppression de la recette
    const handleDelete = () => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) {
            // Récupérer la liste des favoris depuis le localStorage
            const result = localStorage.getItem('favorites');
            const favoriteRecipes = result ? JSON.parse(result) : [];

            // Si le tableau des favoris n'est pas vide
            if (favoriteRecipes.length > 0) {
                // Vérifier si la recette sélectionnée fait partie de la liste des favoris
                const isFavorite = favoriteRecipes.some((fav: Recette) => fav.id === recipe?.id);

                // Si la recette fait partie des favoris, retirer la recette des favoris
                if (isFavorite) {
                    const updatedFavorites = favoriteRecipes.filter((fav: Recette) => fav.id !== recipe?.id);
                    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
                    setFavorites(updatedFavorites); // Mettre à jour l'état des favoris
                }
                console.log(favorites);
            }

            // Exécuter l'action de suppression avec le bon type d'action
            if (context) {
                const { dispatch } = context;
                dispatch({ type: 'REMOVE_RECIPE', payload: recipe?.id });
            }

            // Rediriger l'utilisateur vers la page d'accueil après la suppression
            window.location.href = '/';
        }
    };
    
    return (
        <main id="detail">
            <h1 className="w-full text-4xl font-bold">{recipe.title}</h1>
            <p><i>{recipe.description}</i></p>
            <div className="flex flex-wrap justify-between w-full gap-3 my-4">
                <p className="font-semibold text-amber-500">{recipe.category}</p>
                <p className="font-semibold text-amber-500">{recipe.type}</p>
                <p className="font-semibold text-amber-500">{recipe.preparation_time} min.</p>
                <p className="font-semibold text-amber-500">{recipe.portions}</p>
            </div>
            <div className="card">
                <FavoriteIcone recipe={recipe} />
                <figure>
                    <img src={recipe.image} alt={recipe.title} />
                </figure>
            </div>
              
            <h2>Ingrédients :</h2>
            <ul>
                {recipe.ingredients.map((ing) => (
                    <li key={ing.ingredient}>- {ing.quantity} {ing.ingredient}.</li>
                ))}
            </ul>
            <h2>Etapes de préparation :</h2>
            
                {recipe.steps.map((step, index) => (
                    <div className="flex flex-wrap w-full" key={index}>
                    <p className="w-full text-5xl text-slate-400">{index +1}.</p>  
                    <p className="font-large text-start"> {step}.</p>
                    </div>
                ))}
           
            <h2>Conseils :</h2>
            <p>{recipe.advice}</p>
            <div className="flex flex-wrap justify-between w-full mb-12">
                <NavLink to={"/"}>
                    <button className="btn btnBack">Retour</button>
                </NavLink>
                {currentUser === recipe.CreatedBy && (
                    <button className="btn btnDelete" onClick={handleDelete}>Supprimer</button>
                )}
            </div>
        </main>
    );
}

