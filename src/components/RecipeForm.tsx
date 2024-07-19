import React, { useState, ChangeEvent } from 'react';
import Recette from '../interfaces/recette';
import InputForm from './InputForm';

interface Ingredient {
  ingredient: string;
  quantity: string;
}

interface FormProps {
  onSubmit: (recipe: Recette) => void;
}

const RecipeForm: React.FC<FormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [portions, setPortions] = useState<string>('');
  const [advice, setAdvice] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [preparationTime, setPreparationTime] = useState<number|null>(null);
  const [type, setType] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ ingredient: '', quantity: '' }]);
  const [steps, setSteps] = useState<string[]>(['']);

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case 'title':
        setTitle(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'portions':
        setPortions(value);
        break;
      case 'advice':
        setAdvice(value);
        break;
      case 'preparation_time':
        setPreparationTime(Number(value));
        break;
      case 'category':
        setCategory(value);
        break;
      case 'type':
        setType(value);
        break;
      case 'image':
        setImage(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const user = localStorage.getItem('RGPD');
    const newRecipe: Recette = {
        id: Date.now(), // Utilisez Date.now() pour générer un identifiant unique pour la nouvelle recette
        title,
        description,
        portions,
        advice,
        preparation_time: preparationTime !== null ? preparationTime : 0, // Assurez-vous que c'est un number
        category,
        type,
        image,
        ingredients,
        steps,
        CreatedBy: user || 'CEF',
    };
    onSubmit(newRecipe);
};



  const handleIngredientChange = (index: number, field: keyof Ingredient, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { ingredient: '', quantity: '' }]);
  };

  const removeIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleStepChange = (index: number) => (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newSteps = [...steps];
    newSteps[index] = event.target.value;
    setSteps(newSteps);
  };

  const addStep = () => {
    setSteps([...steps, '']);
  };

  const removeStep = (index: number) => {
    const newSteps = steps.filter((_, i) => i !== index);
    setSteps(newSteps);
  };

  return (
    <section id="content">
      <section className="max-w-4xl p-6 mx-auto mt-20 rounded-md shadow-md">
        <h1 className="text-xl font-bold capitalize">Partager ma recette !</h1>
        <form method="post" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <InputForm 
              name="title" 
              label="Titre" 
              type="text" 
              value={title} 
              onChange={onChange} 
            />
            <InputForm 
              name="description" 
              label="Description" 
              type="text" 
              value={description} 
              onChange={onChange} 
            />
            <InputForm 
              name="portions" 
              label="Portions" 
              type="text" 
              value={portions} 
              onChange={onChange} 
            />
            <InputForm 
              name="advice" 
              label="Conseils" 
              type="text" 
              value={advice} 
              onChange={onChange} 
            />

            <div>
              <label htmlFor="category">Catégorie</label>
              <select
                name="category"
                id="category"
                value={category}
                onChange={onChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-slate-500 dark:focus:border-slate-500 focus:outline-none focus:ring"
              >
                <option value={""}>--- choisir ---</option>
                <option value={"entree"}>Entrée</option>
                <option value={"plat"}>Plat</option>
                <option value={"dessert"}>Dessert</option>
              </select>
            </div>
            
            <InputForm 
              name="preparation_time" 
              label="Temps de préparation en minutes" 
              type="text" 
              value={preparationTime !== null ? preparationTime.toString() : ''} 
              onChange={onChange} 
            />

            <div>
              <label htmlFor="type">Type de cuisine</label>
              <select
                name="type"
                id="type"
                value={type}
                onChange={onChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-slate-500 dark:focus:border-slate-500 focus:outline-none focus:ring"
              >
                <option value={""}>--- choisir ---</option>
                <option value={"italienne"}>Italienne</option>
                <option value={"asiatique"}>Asiatique</option>
                <option value={"francaise"}>Française</option>
                <option value={"mexicaine"}>Mexicaine</option>
                <option value={"indienne"}>Indienne</option>
                <option value={"caribeenne"}>Caribéenne</option>
                <option value={"americaine"}>Américaine</option>
                <option value={"espagnol"}>Espagnol</option>
                <option value={"africaine"}>Africaine</option>
                <option value={"orientale"}>Orientale</option>
              </select>
            </div>

            <InputForm 
              name="image" 
              label="Image URL" 
              type="text" 
              value={image} 
              onChange={onChange} 
            />
          </div>

          {/* Ingrédients */}
          <div className="mt-4">
            <h2 className="text-lg font-bold">Ingrédients</h2>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  name="quantity"
                  value={ingredient.quantity}
                  onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                  placeholder="Quantité"
                  className="block w-1/2 px-4 py-2 mt-2 ml-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-slate-500 dark:focus:border-slate-500 focus:outline-none focus:ring"
                />
                <input
                  type="text"
                  name="ingredient"
                  value={ingredient.ingredient}
                  onChange={(e) => handleIngredientChange(index, 'ingredient', e.target.value)}
                  placeholder="Ingrédient"
                  className="block w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-slate-500 dark:focus:border-slate-500 focus:outline-none focus:ring"
                />
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="px-4 py-2 ml-2 text-white bg-red-500 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
                >
                  X
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addIngredient}
              className="px-4 py-2 mt-2 text-white bg-green-500 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700"
            >
              Ajouter un ingrédient
            </button>
          </div>

          {/* Étapes */}
          <div className="mt-4">
            <h2 className="text-lg font-bold">Étapes</h2>
            {steps.map((step, index) => (
              <div key={index} className="flex items-center mt-2">
                <textarea
                name="step"
                value={step}
                onChange={handleStepChange(index)}
                placeholder={`Étape ${index + 1}`}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-slate-500 dark:focus:border-slate-500 focus:outline-none focus:ring"
                />
                <button
                  type="button"
                  onClick={() => removeStep(index)}
                  className="px-4 py-2 ml-2 text-white bg-red-500 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
                >
                  X
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addStep}
              className="px-4 py-2 mt-2 text-white bg-green-500 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700"
            >
              Ajouter une étape
            </button>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="btnBack btn"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </section>
    </section>
  );
};

export default RecipeForm;
