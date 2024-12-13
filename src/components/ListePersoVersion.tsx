import { useState } from "react";
import axios from "axios";
import { Joueur } from "../modeles/Joueur";
import { ListeContainer, PersoNom } from "../styles/listePerso.styles";
import { Link } from "react-router-dom"; // Ajout de l'import manquant
import { useIntl, FormattedMessage } from "react-intl";

function ListePersoVersion() {
  const [versionRecherche, setVersionRecherche] = useState(""); // Stocke la version entrée par l'utilisateur
  const [joueurs, setJoueurs] = useState<Joueur[] | null>(null); // Stocke les joueurs récupérés
  const [error, setError] = useState(""); // Stocke les erreurs
  const intl = useIntl();

  // Fonction pour rechercher des joueurs par version
  const rechercherParVersion = () => {
    if (!versionRecherche.trim()) {
      alert("Veuillez entrer une version Minecraft.");
      return;
    }

    axios
      .get<Joueur[]>(`https://olidevwebapi.netlify.app/api/joueur/version/${versionRecherche}`)
      .then((response) => {
        setJoueurs(response.data);
        setError(""); // Efface les erreurs si la requête réussit
      })
      .catch((err) => {
        console.error("Erreur lors de la recherche :", err);
        setJoueurs(null); // Réinitialise les joueurs si aucun n'est trouvé
        setError(
          `Impossible de trouver les joueurs pour la version "${versionRecherche}" : ${
            err.response?.data?.message || err.message
          }`
        );
      });
  };

  return (
    <ListeContainer>
      <h1>
        <FormattedMessage id="listePerso.title" />
      </h1>

      {/* Champ de texte pour entrer la version */}
      <input
        type="text"
        placeholder={intl.formatMessage({ id: "listePerso.input.placeholder" })}
        value={versionRecherche}
        onChange={(e) => setVersionRecherche(e.target.value)}
      />
      <button onClick={rechercherParVersion}>
        <FormattedMessage id="listePerso.button.search" />
      </button>

      {/* Affichage des erreurs */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Affichage des joueurs si trouvés */}
      {joueurs && joueurs.length > 0 ? (
        <div>
          {joueurs.map((joueur) => (
            <PersoNom key={joueur._id}>
              <p>
                <FormattedMessage id="listePerso.result.nom" /> : {joueur.nomJoueur}
              </p>
              <Link to={`/joueur/${joueur._id}`}>
                <button>
                  <FormattedMessage id="listePerso.button.details" />
                </button>
              </Link>
            </PersoNom>
          ))}
        </div>
      ) : joueurs !== null ? (
        <p>
          <FormattedMessage id="listePerso.result.noPlayers" />
        </p>
      ) : null}
    </ListeContainer>
  );
}

export default ListePersoVersion;
