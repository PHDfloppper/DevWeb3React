import { useEffect, useState } from 'react';
import axios from 'axios';
import { Joueur } from '../modeles/Joueur';
import { Link } from 'react-router-dom'; // Importer Link pour la navigation
import { ListeContainer,ListeNom,PersoNom, } from '../styles/listePerso.styles';

function ListePerso() {
  const [joueurs, setJoueurs] = useState<Joueur[] | null>(null);
  const [error, setError] = useState("");

  //j'ai pas assigné de variable au useEffect donc s'execute juste quand le composant est initialisé
  useEffect(() => {
    axios
      //https://olidevwebapi.netlify.app/
      //http://localhost:3000
      .get<Joueur[]>('https://olidevwebapi.netlify.app//api/joueur/all')
      .then((response) => {
        console.log(response.data);
        setJoueurs(response.data);
      })
      .catch((err) => {
        console.error('Erreur lors de la récupération des données :', err);
        setError(`Impossible de récupérer les données : ${err.message}`);
      });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (joueurs === null) {
    return <p>Chargement des données...</p>;
  }

  const fetchJoueurs = () => {
    axios
    //https://olidevwebreact.netlify.app
    //http://localhost:3000
      .get<Joueur[]>('https://olidevwebreact.netlify.app/api/joueur/all')
      .then((response) => {
        console.log(response.data);
        setJoueurs(response.data);
      })
      .catch((err) => {
        console.error('Erreur lors de la récupération des données :', err);
        setError(`Impossible de récupérer les données : ${err.message}`);
      });
  };

  const supprimerJoueur = (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce joueur ?")) return;

    axios
      .delete(`https://olidevwebreact.netlify.app/api/joueur/delete/${id}`)
      .then(() => {
        alert("Joueur supprimé avec succès.");
        fetchJoueurs(); // Recharger les données après suppression
      })
      .catch((err) => {
        console.error("Erreur lors de la suppression :", err);
        alert(`Impossible de supprimer le joueur : ${err.message}`);
      });
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (joueurs === null) {
    return <p>Chargement des données...</p>;
  }

  return (
    <ListeContainer>
      <h1>Liste des Joueurs</h1>
      <ListeNom>
        {joueurs.map((joueur, index) => (
          <PersoNom key={index}>
            {joueur.nomJoueur}
            {/* Ajouter un bouton qui redirige vers la page de détails du joueur */}
            <Link to={`/joueur/${joueur.nomJoueur}`}>
              <button>Détails</button>
            </Link>
            <button onClick={() => supprimerJoueur(joueur._id)}>Supprimer</button>
          </PersoNom>
        ))}
      </ListeNom>
    </ListeContainer>
  );
}

export default ListePerso;
