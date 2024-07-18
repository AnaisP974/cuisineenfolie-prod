import React, { useEffect, useState } from "react";
import Favorite from "../interfaces/Favorite";
import Recette from "../interfaces/recette";

interface RecipeProps{
    recipe: Recette;
}

 const FavoriteIcone: React.FC<RecipeProps> = ({recipe}) => {
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    
    /**
     * Récupération du tableau d'objet de favoris dans le localStorage 
     */
    useEffect(() => {
        const favoritesFromStorage = localStorage.getItem("favorites");
        if (favoritesFromStorage) {
        setFavorites(JSON.parse(favoritesFromStorage));
        }
    }, []);
    
    /**
     * Contenu de l'évènement permettant l'ajout d'une recette dans le localStorage
     * @param recipe 
     */
    const handleClick = (recipe: Favorite) => {
        // Vérifier si la recette est déjà dans les favoris
        const isFavorite = favorites.some(fav => fav.id === recipe.id);

        let updatedFavorites;
        if (isFavorite) {
        // Si la recette est déjà dans les favoris, la retirer
        updatedFavorites = favorites.filter(fav => fav.id !== recipe.id);
        } else {
        // Si la recette n'est pas dans les favoris, l'ajouter
        updatedFavorites = [...favorites, recipe];
        }

        // Mettre à jour les favoris dans l'état et le localStorage
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

        // Modifier l'icone après l'ajout dans le localStorage
        alert(`Recette "${recipe.title}" ${isFavorite ? 'retirée des' : 'ajoutée aux'} favoris!`);
    }
    return (
        <div className="icone-fav" onClick={() => handleClick(recipe)}>
            {favorites.some(fav => fav.id === recipe.id) ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 256 256">
                  <path fill="#F2BA00" d="M240 102c0 70-103.79 126.66-108.21 129a8 8 0 0 1-7.58 0C119.79 228.66 16 172 16 102a62.07 62.07 0 0 1 62-62c20.65 0 38.73 8.88 50 23.89C139.27 48.88 157.35 40 178 40a62.07 62.07 0 0 1 62 62" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24">
                  <path fill="#F2BA00" d="m12.1 18.55l-.1.1l-.11-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04 1 3.57 2.36h1.86C13.46 6 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05M16.5 3c-1.74 0-3.41.81-4.5 2.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5c0 3.77 3.4 6.86 8.55 11.53L12 21.35l1.45-1.32C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3" />
                </svg>
            )}
        </div>
    )
}
export default FavoriteIcone