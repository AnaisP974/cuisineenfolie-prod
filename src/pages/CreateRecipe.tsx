import Footer from "../components/Footer";
import Header from "../components/Header";
import RecipeForm from "../components/RecipeForm";
import Recette from "../interfaces/recette";

export default function CreateRecipe() {
    const onSubmit = async (recipe: Recette) => {
        try {
            // Récupérer les recettes actuelles depuis db.json
            const response = await fetch('/db.json');
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des recettes');
            }
            const data = await response.json();

            // Ajouter la nouvelle recette à la liste existante
            const newRecipeList = [...data.recettes, recipe];

            // Mettre à jour db.json avec la nouvelle liste de recettes
            const updateResponse = await fetch('/db.json', {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...data, recettes: newRecipeList }),
            });

            if (!updateResponse.ok) {
                throw new Error('Erreur lors de l\'enregistrement de la nouvelle recette');
            }

            alert('Nouvelle recette enregistrée avec succès');
        } catch (error) {
            console.error('Erreur :', error);
            alert('Une erreur est survenue lors de l\'enregistrement de la recette');
        }
    };
    return(
        <>
        <Header />
        <main>
        <RecipeForm onSubmit={onSubmit} />
        </main>
        <Footer />
        </>
    )
}
