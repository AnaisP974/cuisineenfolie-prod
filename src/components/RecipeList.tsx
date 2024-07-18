import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Recette from "../interfaces/recette";
import { getAllRecipes } from "../function/getAll";
import FavoriteIcone from "./FavoriteIcone";

export default function RecipeList() {

  const [loading, setLoading] = useState(true); // État pour gérer le chargement des données
  const [filteredRecipes, setFilteredRecipes] = useState<Recette[]>([]); // État pour stocker les recettes filtrées
  const { slug } = useParams<{ slug: string }>(); // Récupérer le slug depuis les paramètres d'URL
    
  useEffect(() => {
    // Effet pour charger les recettes initiales et gérer les filtres
    const fetchRecipes = async () => {
      try {
        // Récupérer toutes les recettes
        const data = await getAllRecipes();
        
        setLoading(false); // Mettre à jour l'état de chargement une fois que les données sont récupérées

        // Filtrer les recettes selon le slug (catégorie ou type ou si inclus dans un titre)
        if (slug) {
          const filterByCategory = data.filter((recipe: Recette) => recipe.category === slug);
          const filteredByType = data.filter((recipe: Recette) => recipe.type === slug);
          const filteredByTitle = data.filter((recipe: Recette) => recipe.title.toLowerCase().includes(slug))
          
            console.log(filteredByTitle);
            
          if (filterByCategory.length > 0) {
            setFilteredRecipes(filterByCategory); // Mettre à jour les recettes filtrées si elles correspondent à la catégorie
          } else if (filteredByType.length > 0) {
            setFilteredRecipes(filteredByType); // Mettre à jour les recettes filtrées si elles correspondent au type
          } else if (filteredByTitle.length > 0) {
            setFilteredRecipes(filteredByTitle); // Mettre à jour les recettes filtrées si elles correspondent au type
          } else {
            setFilteredRecipes([]); // Aucune correspondance trouvée, mettre à jour les recettes filtrées à vide
          }
        } else {
          // Si aucun slug n'est présent, afficher toutes les recettes
          setFilteredRecipes(data);
        }
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
        setLoading(false); // Mettre à jour l'état de chargement en cas d'erreur
        setFilteredRecipes([]); // Mettre à jour les recettes filtrées à vide en cas d'erreur
      }
    };

    fetchRecipes(); // Appeler la fonction fetchRecipes au chargement initial et chaque fois que le slug change
  }, [slug]); // Dépendance au changement du slug pour recharger les recettes filtrées

  if (loading) {
    return <div>Loading...</div>; // Afficher un message de chargement pendant le chargement des données
  }

  return (
    <section id="content">
        <h1 className="mt-3 text-3xl">Résultat de votre recherche : "<span>{slug}</span>"</h1>
        <div className="flex flex-wrap justify-center w-full">
            {filteredRecipes.map((recipe) => (
                <div className="card">
                  <FavoriteIcone recipe={recipe} />
                  <NavLink to={"/show/" + recipe.id} key={recipe.id}>
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
