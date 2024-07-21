import { NavLink } from "react-router-dom";
import FavoriteIcone from "./FavoriteIcone";
import React, { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';


const App: React.FC = () => {
  // accéder aux données du contexte RecipeContext
  const context = useContext(RecipeContext);

  // Si pas de context returner null
  if (!context) {
    return null;
  }

  // Récupérer l'état du context
  const { state } = context;
  
  return (
    <section id="content">
      <h1 className="mt-3 mb-3 text-4xl text-center">Toutes les recettes de Cuisine En Folie</h1>
      <div className="flex flex-wrap justify-center w-full">
        {state.recipes.map((recipe) => (
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
export default App
