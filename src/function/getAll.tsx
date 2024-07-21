/**
* Récupère et renvoi toutes les catégories de 'db.json'
*/
const getAllCategories = async () => {
    try {
        const response = await fetch("/db.json");
        const result = await response.json();
        return result.category;
    } catch (error) {
        return alert("Échec du fetch");
    }
};

/**
* Récupère et renvoi toutes les recettes de 'db.json'
*/
const getAllRecipes = async () => {
    try {
        const response = await fetch("/db.json");
        const result = await response.json();
        return result.recettes;
    } catch (error) {
        return alert("Échec du fetch");
    }
};

/**
* Récupère et renvoi tous les types de 'db.json'
*/
const getAllTypes = async () => {
    try {
        const response = await fetch("/db.json");
        const result = await response.json();
        return result.type;
    } catch (error) {
        return alert("Échec du fetch");
    }
};

export {getAllRecipes, getAllCategories, getAllTypes}
