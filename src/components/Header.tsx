import { NavLink, useNavigate } from "react-router-dom";
import React from "react";

export default function Header() {
    const navigate = useNavigate();
    
    const search = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const input = document.querySelector<HTMLInputElement>("#search");
        if(input) {
            // console.log(input.value);
            // passer sur la page "/filter/:slug" avec le slug = input.value 
            const slug = encodeURIComponent(input.value.trim().toLowerCase());
            navigate(`/filter/${slug}`);
        } else{
            console.log("Input not found");
        }
    }
    
    return (
        <header className="p-8">
            <nav>
                <NavLink to={"/"}>
                <img className="logo_header" src="../images/logo_complet.png" alt="Cuisine en Folie logo" />
                </NavLink>
                
                <form action="" method="get" onSubmit={search}>
                    <label className="hidden" htmlFor="search">Recherche</label>
                    <input className="input_header" type="text" name="search" id="search" placeholder="Rechercher une recette" />
                    <button className="btn-submit_header" type="submit"><img className="icone-w-30" src="../images/icone_search.png" alt="lancer la recherche" /></button>
                </form>
                
                <div className="flex gap-6">
                    <NavLink to={"/new"}>
                        <button className="flex items-center btn"><img className="icone-w-30" src="../images/icone_more.png" alt="lancer la recherche" /> Créer</button>
                    </NavLink>
                    <NavLink to={"/favorite"}>
                        <button className="flex items-center border-none btn"><img className="icone-w-30" src="../images/icone_heart.png" alt="lancer la recherche" /> Favoris</button>
                    </NavLink>
                </div>
            </nav>
        </header>
    )
}