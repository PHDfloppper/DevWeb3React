import { useEffect, useState } from 'react';
import axios from 'axios';
import { Joueur } from '../modeles/Joueur';
import { Link } from 'react-router-dom'; // Importer Link pour la navigation
import { ListeContainer,ListeNom,PersoNom, } from '../styles/listePerso.styles';
import { FormattedMessage } from 'react-intl';

function ListePerso() {
  const [joueurs, setJoueurs] = useState<Joueur[] | null>(null);
  const [error, setError] = useState("");

  //j'ai pas assigné de variable au useEffect donc s'execute juste quand le composant est initialisé
  useEffect(() => {
    axios
      //https://olidevwebapi.netlify.app/
      //http://localhost:3000
      .get<Joueur[]>('https://olidevwebapi.netlify.app/api/joueur/all')
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
    //https://olidevwebapi.netlify.app
    //http://localhost:3000
      .get<Joueur[]>('https://olidevwebapi.netlify.app/api/joueur/all')
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
      .delete(`https://olidevwebapi.netlify.app/api/joueur/delete/${id}`)
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
      <h1><FormattedMessage id="listePerso.title" /></h1>
      <Link to={`/nomJoueur`}>
        <button><FormattedMessage id="listePerso.button.searchByName" /></button>
      </Link>
      <Link to={`/versionJoueur`}>
        <button><FormattedMessage id="listePerso.button.searchByVersion" /></button>
      </Link>
      <ListeNom>
        {joueurs.map((joueur, index) => (
          <PersoNom key={index}>
            {joueur.nomJoueur}
            <Link to={`/joueur/${joueur._id}`}>
              <button><FormattedMessage id="listePerso.button.details" /></button>
            </Link>
            <button onClick={() => supprimerJoueur(joueur._id)}>
              <FormattedMessage id="listePerso.button.delete" />
            </button>
          </PersoNom>
        ))}
      </ListeNom>
    </ListeContainer>
  );
}

export default ListePerso;
