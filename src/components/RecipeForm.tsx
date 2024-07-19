import { useState, ChangeEvent, FormEvent, useContext } from 'react';
import Recette, { Ingredient } from '../interfaces/recette';
import InputForm from './InputForm';
import { RecipeContext } from '../context/RecipeContext';
import { isNumber, isStringValid } from '../function/regex';


const RecipeForm = () => {
  const context = useContext(RecipeContext);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [portions, setPortions] = useState<string>('');
  const [advice, setAdvice] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [preparationTime, setPreparationTime] = useState<number>(0);
  const [type, setType] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ ingredient: '', quantity: '' }]);
  const [steps, setSteps] = useState<string[]>(['']);
  // const [titleError, setTitleError] = useState<string>("");
  // const [descError, setDescError] = useState<string>("");
  // const [portionError, setPortionError] = useState<string>("");
  // const [adviceError, setAdviceError] = useState<string>("");
  // const [categoryError, setCategoryError] = useState<string>("");
  // const [prepTimeError, setPrepTimeError] = useState<string>("");
  // const [imageError, setImageError] = useState<string>("");
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    portions: '',
    advice: '',
    category: '',
    prepTime: '',
    image: '',
    type: '',
  });

  
  if (!context) {
    return <div>Loading...</div>;
  }

  const { dispatch, state } = context;
  
  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case 'title':
        setTitle(value)
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
  
  
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // Réinitialiser les erreurs
    const newErrors = {
      title: '',
      description: '',
      portions: '',
      advice: '',
      category: '',
      prepTime: '',
      image: '',
      type: '',
    };
    
    // Validation des champs
    if (!isStringValid(title, 3, 30)) {
      newErrors.title = 'Doit contenir entre 3 et 30 caractères.';
    }
    if (!isStringValid(description, 3, 100)) {
      newErrors.description = 'Doit contenir entre 3 et 100 caractères.';
    }
    if (!isStringValid(portions, 3, 30)) {
      newErrors.portions = 'Doit contenir entre 3 et 30 caractères.';
    }
    if (!isStringValid(advice, 3, 255)) {
      newErrors.advice = 'Doit contenir entre 3 et 255 caractères.';
    }
    if (category === '') {
      newErrors.category = 'Merci de choisir une catégorie';
    }
    if (type === '') {
      newErrors.type = 'Merci de choisir un type de cuisine';
    }
    if (!isNumber(preparationTime)) {
      newErrors.prepTime = 'Merci d\'insérer que des nombres';
    }
    if (!isStringValid(image, 11, 255)) {
      newErrors.image = 'Merci d\'insérer une URL valide';
    }

    // Mettre à jour l'état des erreurs
    setErrors(newErrors);
      
    // Si aucune erreur, procéder avec la soumission du formulaire
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    if (!hasErrors) {
      
      console.log('Formulaire soumis avec succès');

      const user = localStorage.getItem('RGPD');
      const newRecipe: Recette = {
        id: state.recipes.length + 1,
        title,
        description,
        portions,
        advice,
        preparation_time: Number(preparationTime),
        category,
        type,
        image,
        ingredients,
        steps,
        CreatedBy: user || 'CEF',
      };
      console.log('NOUVELLE RECETTE', newRecipe);
      dispatch({ type: 'ADD_RECIPE', payload: newRecipe });
      alert('Nouvelle recette enregistrée avec succès');
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

  const handleStepChange = (index: number) => (event: ChangeEvent<HTMLTextAreaElement>) => {
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
              error={errors.title}
            />
            <InputForm 
              name="description" 
              label="Description" 
              type="text" 
              value={description} 
              onChange={onChange} 
              error={errors.description}
            />
            <InputForm 
              name="portions" 
              label="Portions" 
              type="text" 
              value={portions} 
              onChange={onChange} 
              error={errors.portions}
            />
            <InputForm 
              name="advice" 
              label="Conseils" 
              type="text" 
              value={advice} 
              onChange={onChange} 
              error={errors.advice}
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
              <span className="text-red-700 msg_error">{errors.category}</span>
            </div>
            
            <InputForm 
              name="preparation_time" 
              label="Temps de préparation en minutes" 
              type="text" 
              value={preparationTime !== null ? preparationTime.toString() : ''} 
              onChange={onChange} 
              error={errors.prepTime}
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
              <span className="text-red-700 msg_error">{errors.type}</span>
            </div>

            <InputForm 
              name="image" 
              label="Image URL" 
              type="text" 
              value={image} 
              onChange={onChange} 
              error={errors.image}
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

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="btnValidate btn"
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


