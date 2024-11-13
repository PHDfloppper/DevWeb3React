import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Joueur } from '../modeles/Joueur';
import { Link } from 'react-router-dom'; // Importer Link pour la navigation

function ListePerso() {
  const [joueurs, setJoueurs] = useState<Joueur[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get<Joueur[]>('https://olidevwebapi.netlify.app//api/joueur/all')
      .then((response) => {
        console.log(response.data.joueurs);
        setJoueurs(response.data.joueurs);
      })
      .catch((err) => {
        console.error('Erreur lors de la récupération des données :', err);
        setError(`Impossible de récupérer les données : ${err.message}`);
      });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (joueurs.length === 0) {
    return <p>Chargement des données...</p>;
  }

  return (
    <div>
      <h1>Liste des Joueurs</h1>
      <ul>
        {joueurs.map((joueur, index) => (
          <li key={index}>
            {joueur.nomJoueur}
            {/* Ajouter un bouton qui redirige vers la page de détails du joueur */}
            <Link to={`/joueur/${joueur.nomJoueur}`}>
              <button>Détails</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListePerso;
