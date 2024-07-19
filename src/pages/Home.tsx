import Header from "../components/Header";
import Footer from "../components/Footer";
import App from "../components/App";
import Aside from "../components/Aside";
import React, { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';

const Home: React.FC = () => {
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
      <App state={state}/>
    </main>
    <Footer />
    
    </>
  );
};

export default Home;
