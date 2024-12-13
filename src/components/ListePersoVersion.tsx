import { useState } from "react";
import axios from "axios";
import { Joueur } from "../modeles/Joueur";
import { ListeContainer, PersoNom } from "../styles/listePerso.styles";
import { Link } from "react-router-dom";
import { useIntl, FormattedMessage } from "react-intl";

function ListePersoVersion() {
  const [versionRecherche, setVersionRecherche] = useState(""); // Stock la version entrée par l'utilisateur
  const [joueurs, setJoueurs] = useState<Joueur[] | null>(null); // Stock les joueurs récupérés
  const [error, setError] = useState(""); // Stock les erreurs
  const {formatMessage} = useIntl();

  // Fonction pour rechercher des joueurs par version
  const rechercherParVersion = () => {
    if (!versionRecherche.trim()) {
      setError(formatMessage({ id: 'pasVersion' }));
      return;
    }

    axios
      .get<Joueur[]>(`https://olidevwebapi.netlify.app/api/joueur/version/${versionRecherche}`)
      .then((response) => {
        setJoueurs(response.data);
        setError("");
      })
      .catch((err) => {
        console.error("Erreur lors de la recherche :", err);
        setJoueurs(null);
        setError(
          formatMessage(
            { id: 'detailPerso.error.notFound.version' },
            { message: err.response?.data?.message || err.message }
          )
        );
      });
  };

  return (
    <ListeContainer>
      <h1>
        <FormattedMessage id="listePerso.title.version" />
      </h1>

      <input
        type="text"
        placeholder={formatMessage({ id: "listePerso.input.placeholder" })}
        value={versionRecherche}
        onChange={(e) => setVersionRecherche(e.target.value)}
      />
      <button onClick={rechercherParVersion}>
        <FormattedMessage id="listePerso.button.search" />
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

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
