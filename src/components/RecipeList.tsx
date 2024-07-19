import {  useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Recette from "../interfaces/recette";
import FavoriteIcone from "./FavoriteIcone";

interface State {
  recipes: Recette[];
}
interface StateProps{
  state: State,
}

const RecipeList: React.FC<StateProps> = ({state}) => {
  

  // Récupérer le slug depuis les paramètres d'URL
  const { slug } = useParams<{ slug: string }>();

  // État local pour gérer le chargement des données
  const [loading, setLoading] = useState(true);

  // État local pour stocker les recettes filtrées
  const [filteredRecipes, setFilteredRecipes] = useState<Recette[]>([]);


  // Effet pour charger les recettes initiales et gérer les filtres
  useEffect(() => {
    if (slug && state.recipes) {
          // Filtrer les recettes selon le slug (catégorie, type ou titre)
          
            const filterByCategory = state.recipes.filter((recipe: Recette) => recipe.category === slug);
            const filteredByType = state.recipes.filter((recipe: Recette) => recipe.type === slug);
            const filteredByTitle = state.recipes.filter((recipe: Recette) => recipe.title.toLowerCase().includes(slug.toLowerCase()));
            
            // Mettre à jour les recettes filtrées selon la correspondance trouvée
            if (filterByCategory.length > 0) {
              setFilteredRecipes(filterByCategory);
            } else if (filteredByType.length > 0) {
              setFilteredRecipes(filteredByType);
            } else if (filteredByTitle.length > 0) {
              setFilteredRecipes(filteredByTitle);
            } else {
              setFilteredRecipes([]);
            }
            setLoading(false)
          } else {
            if(state)
            // Si aucun slug n'est présent, afficher toutes les recettes
            setFilteredRecipes(state.recipes);
          }

  }, [slug, state]); // Dépendance au changement du slug et du contexte

  // Afficher un message de chargement pendant le chargement des données
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <section id="content">
      <h1 className="mt-3 text-3xl">Résultat de votre recherche : "<span>{slug}</span>"</h1>
      <div className="flex flex-wrap justify-center w-full">
        {filteredRecipes.map((recipe) => (
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
export default RecipeList