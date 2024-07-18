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
  const [preparationTime, setPreparationTime] = useState<string>("");
  const [type, setType] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ ingredient: '', quantity: '' }]);
  const [steps, setSteps] = useState<string[]>(['']);

const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (
  event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) => {
  setter(event.target.value);
};


  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const user = localStorage.getItem('RGPD');
    const newRecipe: Recette = {
      id: Date.now(),
      title,
      description,
      image: image ? URL.createObjectURL(image) : '',
      preparation_time: Number(preparationTime),
      category,
      type,
      ingredients,
      steps,
      portions,
      advice,
      CreatedBy: (user||'CEF'),
    };
    onSubmit(newRecipe);
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
              onChange={handleInputChange(setTitle)} 
            />
            <InputForm 
              name="description" 
              label="Description" 
              type="text" 
              value={description} 
              onChange={handleInputChange(setDescription)} 
            />
            <InputForm 
              name="portions" 
              label="Portions" 
              type="text" 
              value={portions} 
              onChange={handleInputChange(setPortions)} 
            />
            <InputForm 
              name="advice" 
              label="Conseils" 
              type="text" 
              value={advice} 
              onChange={handleInputChange(setAdvice)} 
            />

            <div>
              <label htmlFor="category">Catégorie</label>
              <select
                name="category"
                id="category"
                value={category}
                onChange={handleInputChange(setCategory)}
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
              value={preparationTime} 
              onChange={handleInputChange(setPreparationTime)} 
            />

            <div>
              <label htmlFor="type">Type de cuisine</label>
              <select
                name="type"
                id="type"
                value={type}
                onChange={handleInputChange(setType)}
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

            <div>
              <label className="block text-sm font-medium">Image</label>
              <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="w-12 h-12 mx-auto"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="image"
                      className="relative font-medium text-indigo-600 bg-white rounded-md cursor-pointer hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="image"
                        name="image"
                        type="file"
                        className="sr-only"
                        onChange={handleImageChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs">PNG ou JPG</p>
                </div>
              </div>
            </div>
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
              className="px-4 py-2 leading-5 transition-colors duration-200 transform bg-green-500 rounded-md x-6 hover:bg-green-700 focus:outline-none focus:bg-gray-600 text-slate-100"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </section>
    </section>
  );
}

export default RecipeForm;
