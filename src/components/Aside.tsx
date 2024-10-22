import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { getAllCategories, getAllTypes } from '../function/getAll';

interface Filter{
    id: number;
    name: string;
    slug: string;
}

export default function Aside() {
  const [allCategories, setAllCategories] = useState<Filter[]>([]);
  const [allTypes, setAllTypes] = useState<Filter[]>([])
  const [loading, setLoading] = useState(true);
  const {slug} = useParams<{ slug: string }>();

  /**
   * Lancer la récupération de toutes les catégories et de tous les types
   */
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        setAllCategories(await getAllCategories());
        setAllTypes(await getAllTypes());
        setLoading(false);
      }catch (error) {
        console.error("Echec d'accès aux données catégories et types: ", error);
      }
    }
    fetchFilters();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Afficher un message de chargement pendant le chargement des données
  }
    return(
        <aside id="filter">
            <h2>Filtrer par catégorie</h2>
            <div className="container-buttons">
                {allCategories.map((category) => (
                    <NavLink 
                        to={"/filter/"+category.slug}
                        key={category.id} 
                    >
                    <button 
                    className={(category.slug === slug)? 'btn btnBack active' : "btn btnBack"}
                    >
                        {category.name}
                    </button>
                    </NavLink>
                ))}
                
            </div>
            
            <h2>Filtrer par catégorie</h2>
            <div className="container-buttons">
                {allTypes.map((type) => (
                    <NavLink 
                        to={"/filter/"+type.slug}
                        key={type.id} 
                    >
                    <button 
                    className={(type.slug === slug)? 'btn btnBack active' : "btn btnBack"}
                    >
                        {type.name}
                    </button>
                    </NavLink>
                ))}
                {slug ? (
                <NavLink to={"/"}>
                <button className="text-xl btnClose" title='Retirer les filtres'>X</button>
                </NavLink>
                ) : null }
            </div>
        
        
        </aside>
    )
}
