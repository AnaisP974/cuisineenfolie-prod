import { useEffect, useState } from "react";
import FavoriteIcone from "./FavoriteIcone";
import Recette from "../interfaces/recette";
import { NavLink } from "react-router-dom";

export default function FavoriteRecipes() {
    const [favorites, setFavorites] = useState<Recette[]>([]);
    
    /**
     * Récupération du tableau d'objet de favoris dans le localStorage 
     */
    useEffect(() => {
        const favoritesStorage = localStorage.getItem("favorites");
        if (favoritesStorage) {
        setFavorites(JSON.parse(favoritesStorage));
        }
    }, []);

    return (
        <section id="content">
        <h1 className="mt-3 mb-3 text-3xl">Mes favoris :</h1>
        {/* Message d'erreur si aucune recette trouvée en favoris */}
        {favorites.length==0 && "Aucune recette selectionnée pour le moment"}
        <div className="flex flex-wrap justify-center w-full">
            {favorites.map((recipe) => (
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
    )
}