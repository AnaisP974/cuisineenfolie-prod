import { v4 as uuidv4 } from 'uuid';
// ----------------------- AU CHARGEMENT DE LA PAGE ----------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // Mettre un effet sur toute la page
    const root = document.querySelector<HTMLBodyElement>("#root");
    if(root){
        root.classList.add("blur-effect");
    }
    
    // Créer un pop-up
    const div = document.createElement('div');
    div.classList.add('pop-up')
    const content = `<img src="../images/logo_complet.png" alt="Cuisine en Folie logo" />
    <h1 className="text-xl font-bold">Bienvenue</h1>
    <p>Afin d'améliorer votre expérience utilisateur, nous accédons à votre terminal pour y collecter et stocker des données liées à la liste de vos recettes favoris.<br/><br/>Vous pouvez à tout moment supprimer les données stocker via l’écran de paramètrage du localStorage.</p>
    <button className="btn btnValidate">Accepter</button>`;
    div.innerHTML = content;
    //Afficher le pop-up sur la page
    document.body.prepend(div);
    
    // ----------------------- Acceptation les RGPD ----------------------------------------------
    // Lorsque l'utilisateur accepte le formulaire, l'évènement est enclanché
    div.addEventListener('click', (e) => {
        e.preventDefault();
    
        // Créer une clé-valeur
        window.localStorage.setItem("RGPD", uuidv4());
        // Rendre le pop-up non visible
        div.style.display = "none";        
        // Supprimer l'effet sur la page
        if(root){
            root.classList.remove("blur-effect");
        }
    })

    // ---------------  AFFICHER LE POP-UP QUE SI LE RGPD N'A PAS ETE ACCEPTE  ---------------
    // si "RGPD" est présent dans le local storage, donc s'il existe
    if(window.localStorage.getItem("RGPD")){
        // supprimer le pop-up
        div.style.display = "none";
        // Supprimer l'effet sur la page
        if(root){
            root.classList.remove("blur-effect");
        }        
    }
});