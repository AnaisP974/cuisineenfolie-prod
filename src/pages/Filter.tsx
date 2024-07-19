import Header from "../components/Header";
import Footer from "../components/Footer";
import RecipeList from "../components/RecipeList";
import Aside from "../components/Aside";
import { RecipeContext } from "../context/RecipeContext";
import React, { useContext } from "react";


const Filter: React.FC = () => {
  const context = useContext(RecipeContext);

  if (!context) {
    return null;
  }

  const { state } = context;

  return (
    <>
    <Header />
    <main>
      <Aside />
      <RecipeList state={state} />
    </main>
    <Footer />
    </>
  )
}

export default Filter
