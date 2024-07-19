import { NavLink } from "react-router-dom";
import FavoriteIcone from "./FavoriteIcone";
import Recette from "../interfaces/recette";

interface State {
  recipes: Recette[];
}
interface StateProps{
  state: State,
}

const App: React.FC<StateProps> = ({state}) =>{
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
