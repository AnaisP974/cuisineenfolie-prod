import React from 'react';
import ReactDOM from 'react-dom/client';
import './output.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import Detail from './pages/Detail';
import Filter from './pages/Filter';
import './assets/js/FirstVisit.js';
import Favorite from './pages/Favorite';
import CreateRecipe from './pages/CreateRecipe';
import { RecipeProvider } from './context/RecipeContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/new",
    element: <CreateRecipe />,
  },
  {
    path: "/show/:id",
    element: <Detail />,
  },
  {
    path: "/filter/:slug",
    element: <Filter />,
  },
  {
    path: "/favorite",
    element: <Favorite />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecipeProvider>
      <RouterProvider router={router} />
    </RecipeProvider>
  </React.StrictMode>,
);
