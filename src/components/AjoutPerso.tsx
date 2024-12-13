import { useState } from 'react';
import axios from 'axios';
import {useIntl } from 'react-intl';

function AjoutPerso() {
  // États pour les champs du formulaire
  const [nomJoueur, setNomJoueur] = useState('');
  const [versionMinecraft, setVersionMinecraft] = useState('');
  const [heuresJeu, setHeuresJeu] = useState<number | ''>('');
  const [modeHardcore, setModeHardcore] = useState(false);
  const [blocs, setBlocs] = useState([{ type: '', quantite: 0 }]);
  const [outils, setOutils] = useState([{ type: '', materiau: '', durabilite: 0 }]);
  const [succes, setSucces] = useState([{ nom: '', description: '', dateObtention: '' }]);
  const [message, setMessage] = useState<string | null>(null);
  const { formatMessage } = useIntl();

  // Liste des types d'outils valides
  const typesOutils = ['Houe', 'Hache', 'Pioche', 'Trident', 'Arc', 'Épée', 'Pelle'];

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation simple des champs
    if (!nomJoueur || !versionMinecraft || heuresJeu === '') {
      setMessage('Veuillez remplir tous les champs.');
      return;
    }

    // Construction des données à envoyer
    const joueur = {
      nomJoueur,
      versionMinecraft,
      heuresJeu,
      modeHardcore,
      inventaire: {
        blocs,
        outils,
      },
      succes,
    };

    try {
      const response = await axios.post('https://olidevwebapi.netlify.app/api/joueur/add', joueur);
      setMessage(`Joueur ajouté avec succès : ${response.data.nomJoueur}`);
      // Réinitialisation des champs
      setNomJoueur('');
      setVersionMinecraft('');
      setHeuresJeu('');
      setModeHardcore(false);
      setBlocs([{ type: '', quantite: 0 }]);
      setOutils([{ type: '', materiau: '', durabilite: 0 }]);
      setSucces([{ nom: '', description: '', dateObtention: '' }]);
    } catch (error: any) {
      setMessage(`Erreur lors de l'ajout du joueur : ${error.response?.data?.message || error.message}`);
    }
  };

  // Fonction pour ajouter un bloc
  const ajouterBloc = () => {
    setBlocs([...blocs, { type: '', quantite: 0 }]);
  };

  // Fonction pour ajouter un outil
  const ajouterOutil = () => {
    setOutils([...outils, { type: '', materiau: '', durabilite: 0 }]);
  };

  // Fonction pour ajouter un succès
  const ajouterSucces = () => {
    setSucces([...succes, { nom: '', description: '', dateObtention: '' }]);
  };

  return (
    <div>
      <h1>{formatMessage({ id: 'ajouterJoueur' })}</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nomJoueur">{formatMessage({ id: 'nomJoueur' })} :</label>
          <input
            type="text"
            id="nomJoueur"
            value={nomJoueur}
            onChange={(e) => setNomJoueur(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="versionMinecraft">{formatMessage({ id: 'versionMinecraft' })} :</label>
          <input
            type="text"
            id="versionMinecraft"
            value={versionMinecraft}
            onChange={(e) => setVersionMinecraft(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="heuresJeu">{formatMessage({ id: 'heuresJeu' })} :</label>
          <input
            type="number"
            id="heuresJeu"
            value={heuresJeu}
            onChange={(e) => setHeuresJeu(Number(e.target.value))}
            required
          />
        </div>

        <div>
          <label htmlFor="modeHardcore">{formatMessage({ id: 'modeHardcore' })} :</label>
          <input
            type="checkbox"
            id="modeHardcore"
            checked={modeHardcore}
            onChange={(e) => setModeHardcore(e.target.checked)}
          />
        </div>

        <div>
          <h3>{formatMessage({ id: 'inventaire' })}</h3>

          <div>
            <h4>{formatMessage({ id: 'blocs' })}</h4>
            {blocs.map((bloc, index) => (
              <div key={index}>
                <label htmlFor={`typeBloc${index}`}>{formatMessage({ id: 'typeBloc' })} :</label>
                <input
                  type="text"
                  id={`typeBloc${index}`}
                  value={bloc.type}
                  onChange={(e) => {
                    const newBlocs = [...blocs];
                    newBlocs[index].type = e.target.value;
                    setBlocs(newBlocs);
                  }}
                />
                <label htmlFor={`quantiteBloc${index}`}>{formatMessage({ id: 'quantiteBloc' })} :</label>
                <input
                  type="number"
                  id={`quantiteBloc${index}`}
                  value={bloc.quantite}
                  onChange={(e) => {
                    const newBlocs = [...blocs];
                    newBlocs[index].quantite = Number(e.target.value);
                    setBlocs(newBlocs);
                  }}
                />
              </div>
            ))}
            <button type="button" onClick={ajouterBloc}>{formatMessage({ id: 'ajouterBloc' })}</button>
          </div>

          <div>
            <h4>{formatMessage({ id: 'outils' })}</h4>
            {outils.map((outil, index) => (
              <div key={index}>
                <label htmlFor={`typeOutil${index}`}>{formatMessage({ id: 'typeOutil' })} :</label>
                <select
                  id={`typeOutil${index}`}
                  value={outil.type}
                  onChange={(e) => {
                    const newOutils = [...outils];
                    newOutils[index].type = e.target.value;
                    setOutils(newOutils);
                  }}
                  required
                >
                  <option value="">--</option>
                  {typesOutils.map((type, idx) => (
                    <option key={idx} value={type}>{type}</option>
                  ))}
                </select>

                <label htmlFor={`materiauOutil${index}`}>{formatMessage({ id: 'materiau' })} :</label>
                <input
                  type="text"
                  id={`materiauOutil${index}`}
                  value={outil.materiau}
                  onChange={(e) => {
                    const newOutils = [...outils];
                    newOutils[index].materiau = e.target.value;
                    setOutils(newOutils);
                  }}
                />

                <label htmlFor={`durabiliteOutil${index}`}>{formatMessage({ id: 'durabilite' })} :</label>
                <input
                  type="number"
                  id={`durabiliteOutil${index}`}
                  value={outil.durabilite}
                  onChange={(e) => {
                    const newOutils = [...outils];
                    newOutils[index].durabilite = Number(e.target.value);
                    setOutils(newOutils);
                  }}
                />
              </div>
            ))}
            <button type="button" onClick={ajouterOutil}>{formatMessage({ id: 'ajouterOutil' })}</button>
          </div>

          <div>
            <h4>{formatMessage({ id: 'succes' })}</h4>
            {succes.map((succesItem, index) => (
              <div key={index}>
                <label htmlFor={`nomSucces${index}`}>{formatMessage({ id: 'nom' })} :</label>
                <input
                  type="text"
                  id={`nomSucces${index}`}
                  value={succesItem.nom}
                  onChange={(e) => {
                    const newSucces = [...succes];
                    newSucces[index].nom = e.target.value;
                    setSucces(newSucces);
                  }}
                />
                <label htmlFor={`descriptionSucces${index}`}>{formatMessage({ id: 'description' })} :</label>
                <textarea
                  id={`descriptionSucces${index}`}
                  value={succesItem.description}
                  onChange={(e) => {
                    const newSucces = [...succes];
                    newSucces[index].description = e.target.value;
                    setSucces(newSucces);
                  }}
                />
                <label htmlFor={`dateSucces${index}`}>{formatMessage({ id: 'dateObtention' })} :</label>
                <input
                  type="date"
                  id={`dateSucces${index}`}
                  value={succesItem.dateObtention}
                  onChange={(e) => {
                    const newSucces = [...succes];
                    newSucces[index].dateObtention = e.target.value;
                    setSucces(newSucces);
                  }}
                />
              </div>
            ))}
            <button type="button" onClick={ajouterSucces}>{formatMessage({ id: 'ajouterSucces' })}</button>
          </div>

        </div>

        <button type="submit">{formatMessage({ id: 'ajouter' })}</button>
      </form>
    </div>
  );
}

export default AjoutPerso;
