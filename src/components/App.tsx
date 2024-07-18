import { useState, useEffect } from "react";
import Recette from '../interfaces/recette';
import { getAllRecipes } from "../function/getAll";
import { NavLink } from "react-router-dom";
import FavoriteIcone from "./FavoriteIcone";

export default function App() {
  const [recipes, setRecipes] = useState<Recette[]>([]);
  const [loading, setLoading] = useState(true);


  /**
   * Récupération de toutes les recettes de 'db.json'
   */
  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await getAllRecipes();
      setRecipes(data);
      setLoading(false);
    };
    fetchRecipes();
  }, []); // Le tableau vide [] signifie que l'effet s'exécute une seule fois après le premier rendu

  // Si les recettes ne sont pas récupérées
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section id="content">
      <h1 className="mt-3 mb-3 text-4xl text-center">Toutes les recettes de Cuisine En Folie</h1>
      <div className="flex flex-wrap justify-center w-full">
        {recipes.map((recipe) => (
          <div className="card" key={recipe.id}>
            <FavoriteIcone recipe={recipe} />
            
            <NavLink to={"/show/" + recipe.id}>
              <figure>
                <img src={recipe.image} alt={recipe.title} />
              </figure>
              <div className="body-card">
                <h5>{recipe.title}</h5>
                <p>{recipe.preparation_time} min.</p>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </section>
  );
}
