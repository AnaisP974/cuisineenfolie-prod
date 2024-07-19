import React, { useContext } from 'react';
import Footer from "../components/Footer";
import Header from "../components/Header";
import RecipeForm from "../components/RecipeForm";
import Recette from "../interfaces/recette";
import { RecipeContext } from '../context/RecipeContext';

const CreateRecipe: React.FC = () => {
    const context = useContext(RecipeContext);

    if (!context) {
        return <div>Loading...</div>;
    }

    const { dispatch } = context;

    const onSubmit = (recipe: Recette) => {
        dispatch({ type: 'ADD_RECIPE', payload: recipe });
        alert('Nouvelle recette enregistrée avec succès');
        // Rediriger l'utilisateur vers la page d'accueil après la suppression
        window.location.href = '/';
    };

    return (
        <>
            <Header />
            <main>
                <RecipeForm onSubmit={onSubmit} />
            </main>
            <Footer />
        </>
    );
};

export default CreateRecipe;
