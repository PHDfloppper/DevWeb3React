import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Joueur } from '../modeles/Joueur'; // Importer le modèle Joueur
import { useParams } from 'react-router-dom';

function DetailPerso() {
    const { nomJoueur } = useParams<{ nomJoueur: string }>();
  const [joueur, setJoueur] = useState<Joueur | null>(null);
  const [error, setError] = useState<string>('');

  // Utiliser useEffect pour récupérer les détails du joueur
  useEffect(() => {
    axios
      .get<Joueur>(`https://olidevwebapi.netlify.app//api/joueur/${nomJoueur}`)
      .then((response) => {
        console.log(response.data.joueur);
        setJoueur(response.data.joueur); // Stocker les données du joueur
      })
      .catch((err) => {
        console.error('Erreur lors de la récupération du joueur :', err);
        setError(`Impossible de récupérer les données : ${err.message}`);
      });
  }, [nomJoueur]); // L'effet dépend du joueurId

  // Afficher un message d'erreur si l'appel API échoue
  if (error) {
    return <p>{error}</p>;
  }

  // Afficher un message de chargement pendant que les données sont récupérées
  if (!joueur) {
    return <p>Chargement des données... ALLOOOOOO</p>;
  }

  return (
    <div>
      <h1>Détails du joueur : {joueur.nomJoueur}</h1>
      <p>Version Minecraft : {joueur.versionMinecraft}</p>
      <p>Heures de jeu : {joueur.heuresJeu}</p>
      <p>Mode Hardcore : {joueur.modeHardcore ? 'Oui' : 'Non'}</p>

      <h2>Inventaire</h2>
      <h3>Blocs</h3>
      <ul>
        {joueur.inventaire.blocs.map((bloc) => (
          <li key={bloc._id}>
            {bloc.type} (Quantité: {bloc.quantité})
          </li>
        ))}
      </ul>

      <h3>Outils</h3>
      <ul>
        {joueur.inventaire.outils.map((outil) => (
          <li key={outil._id}>
            {outil.type} (Matériau: {outil.matériau}, Durabilité: {outil.durabilité})
          </li>
        ))}
      </ul>

      <h2>Succès</h2>
      <ul>
        {joueur.succès.map((succes, index) => (
          <li key={index}>
            <strong>{succes.nom}</strong>: {succes.description} (Obtenu le {succes.dateObtention})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DetailPerso;
