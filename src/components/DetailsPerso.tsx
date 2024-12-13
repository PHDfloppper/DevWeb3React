import { useEffect, useState } from 'react';
import axios from 'axios';
import { Joueur } from '../modeles/Joueur'; // Importer le modèle Joueur
import { useParams } from 'react-router-dom';
import ModifierPerso from './ModifierPerso';
import { FormattedMessage, useIntl } from 'react-intl';

function DetailPerso() {
  const { formatMessage } = useIntl();
    const { idJoueur } = useParams<{ idJoueur: string }>();
  const [joueur, setJoueur] = useState<Joueur | null>(null);
  const [error, setError] = useState<string>('');

  //useEffect pour récupérer les détails du joueur choisi par le user
  useEffect(() => {
    axios
      .get<Joueur>(`https://olidevwebapi.netlify.app/api/joueur/${idJoueur}`)
      .then((response) => {
        console.log("Allooooo");
        console.log(response.data);
        console.log(idJoueur);
        setJoueur(response.data);
      })
      .catch((err) => {
        console.error('Erreur lors de la récupération du joueur :', err);
        setError(formatMessage({ id: 'ajoutPerso.error.add' }, {err}));
        console.log(idJoueur);
      });
  }, [idJoueur]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!joueur) {
    return <p>{formatMessage({ id: 'modifierPerso.loading' })}</p>;
  }

  return (
    <div>
      <h1><FormattedMessage id="detailPerso.title" values={{ nomJoueur: joueur.nomJoueur }} /></h1>
      <p><FormattedMessage id="detailPerso.version" />: {joueur.versionMinecraft}</p>
      <p><FormattedMessage id="detailPerso.heuresJeu" />: {joueur.heuresJeu}</p>
      <p><FormattedMessage id="detailPerso.modeHardcore" />: {joueur.modeHardcore ? 'Oui' : 'Non'}</p>

      <h2><FormattedMessage id="detailPerso.inventory" /></h2>
      <h3><FormattedMessage id="detailPerso.blocks" /></h3>
      <ul>
        {joueur.inventaire?.blocs?.length > 0 ? (
          joueur.inventaire.blocs.map((bloc, index) => (
            <li key={index}>
              {bloc.type} (<FormattedMessage id="detailPerso.quantity" />: {bloc.quantite})
            </li>
          ))
        ) : (
          <li><FormattedMessage id="detailPerso.noBlocks" /></li>
        )}
      </ul>

      <h3><FormattedMessage id="detailPerso.tools" /></h3>
      <ul>
        {joueur.inventaire?.outils?.length > 0 ? (
          joueur.inventaire.outils.map((outil, index) => (
            <li key={index}>
              {outil.type} (<FormattedMessage id="detailPerso.material" />: {outil.materiau}, <FormattedMessage id="detailPerso.durability" />: {outil.durabilite})
            </li>
          ))
        ) : (
          <li><FormattedMessage id="detailPerso.noTools" /></li>
        )}
      </ul>

      <h2><FormattedMessage id="detailPerso.success" /></h2>
      <ul>
        {joueur.succes?.length > 0 ? (
          joueur.succes.map((succes, index) => (
            <li key={index}>
              <strong>{succes.nom}</strong>: {succes.description} (<FormattedMessage id="detailPerso.obtainedOn" /> {new Date(succes.dateObtention).toLocaleDateString()})
            </li>
          ))
        ) : (
          <li><FormattedMessage id="detailPerso.noSuccess" /></li>
        )}
      </ul>

      <ModifierPerso />
    </div>
  );
}

export default DetailPerso;
