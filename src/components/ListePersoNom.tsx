import { useState } from "react";
import axios from "axios";
import { Joueur } from "../modeles/Joueur";
import { ListeContainer, PersoNom } from "../styles/listePerso.styles";
import { Link } from "react-router-dom";
import { useIntl, FormattedMessage } from "react-intl"; // Import des outils react-intl

function ListePersoNom() {
  const [nomRecherche, setNomRecherche] = useState("");
  const [joueur, setJoueur] = useState<Joueur | null>(null);
  const [error, setError] = useState("");
  const intl = useIntl(); // Hook pour localiser les messages

  const rechercherJoueur = () => {
    if (!nomRecherche.trim()) {
      alert("Veuillez entrer un nom de joueur.");
      return;
    }

    axios
      .get<Joueur>(`https://olidevwebapi.netlify.app/api/joueur/nom/${nomRecherche}`)
      .then((response) => {
        setJoueur(response.data);
        setError("");
      })
      .catch((err) => {
        console.error("Erreur lors de la recherche :", err);
        setJoueur(null);
        setError(
          `Impossible de trouver le joueur : ${
            err.response?.data?.message || err.message
          }`
        );
      });
  };

  return (
    <ListeContainer>
      <h1>
        <FormattedMessage id="listePersoNom.title" />
      </h1>
      <input
        type="text"
        placeholder={intl.formatMessage({ id: "listePersoNom.input.placeholder" })}
        value={nomRecherche}
        onChange={(e) => setNomRecherche(e.target.value)}
      />
      <button onClick={rechercherJoueur}>
        <FormattedMessage id="listePersoNom.button.search" />
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {joueur && (
        <>
          <PersoNom>
            <p>
              <FormattedMessage id="listePersoNom.result.nom" /> : {joueur.nomJoueur}
            </p>
            <p>
              <FormattedMessage id="listePersoNom.result.version" /> : {joueur.versionMinecraft}
            </p>
            <p>
              <FormattedMessage id="listePersoNom.result.heures" /> : {joueur.heuresJeu}
            </p>
            <p>
              <FormattedMessage id="listePersoNom.result.hardcore" /> :{" "}
              {joueur.modeHardcore ? (
                <FormattedMessage id="listePersoNom.result.hardcore.yes" />
              ) : (
                <FormattedMessage id="listePersoNom.result.hardcore.no" />
              )}
            </p>
          </PersoNom>

          <Link to={`/joueur/${joueur._id}`}>
            <button>
              <FormattedMessage id="listePersoNom.button.details" />
            </button>
          </Link>
        </>
      )}
    </ListeContainer>
  );
}
export default ListePersoNom;
