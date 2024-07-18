import React from 'react'
import ReactDOM from 'react-dom/client'
import './output.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home.tsx';
import Detail from './pages/Detail.tsx';
import Filter from './pages/Filter.tsx';
import './assets/js/FirstVisit.js';
import Favorite from './pages/Favorite.tsx';
import CreateRecipe from './pages/CreateRecipe.tsx';

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
    <RouterProvider router={router} />
  </React.StrictMode>,
)
