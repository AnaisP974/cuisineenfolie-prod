import { NavLink, useParams } from "react-router-dom";
import Recette from '../interfaces/recette'
import { useEffect, useState } from "react";
import FavoriteIcone from "./FavoriteIcone";

export default function RecipeDetail() {
    const [allRecipes, setAllRecipes] = useState<Recette[]>([]);
    const [recipe, setRecipe] = useState<Recette | null>(null); // Modifié pour stocker un seul article ou null
    const { id } = useParams<{ id: string }>();

    // Récupérer les données
    const getAllRecipes = async () => {
        try {
            const response = await fetch(`/db.json`);
            const result = await response.json();
            if (result.recettes.length > 0) {
                setAllRecipes(result.recettes);
            } else {
                alert('Recettes non trouvées');
            }
        } catch (error) {
            alert('Echec du fetch');
        }
    };

    useEffect(() => {
        getAllRecipes();
    }, []);

    useEffect(() => {
        if (allRecipes.length > 0) {
            const foundRecipe = allRecipes.find(recette => recette.id === Number(id));
            setRecipe(foundRecipe || null);
        }
    }, [allRecipes, id]);

    if (allRecipes.length === 0) {
        return <div>Loading...</div>;
    }

    if (!recipe) {
        return <div>Aucune recette trouvée</div>;
    }

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
                <li>- {ing.quantity} {ing.ingredient}.</li>
            ))}
        </ul>
        <h2>Etapes de préparation :</h2>
        
            {recipe.steps.map((step, index) => (
                <div className="flex flex-wrap w-full">
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
            <button className="btn btnDelete">Supprimer</button>
        </div>
        </main>
    )
}