import { useState } from 'react';
import axios from 'axios';

function AjoutPerso() {
  // États pour les champs du formulaire
  const [nomJoueur, setNomJoueur] = useState('');
  const [versionMinecraft, setVersionMinecraft] = useState('');
  const [heuresJeu, setHeuresJeu] = useState<number | ''>('');
  const [modeHardcore, setModeHardcore] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

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
          blocs: [], // Liste vide pour blocs
          outils: [], // Liste vide pour outils
        },
        succes: [], // Liste vide pour succès
      };

    try {
      const response = await axios.post('https://olidevwebreact.netlify.app/api/joueur/add', joueur);
      setMessage(`Joueur ajouté avec succès : ${response.data.nomJoueur}`);
      // Réinitialisation des champs
      setNomJoueur('');
      setVersionMinecraft('');
      setHeuresJeu('');
      setModeHardcore(false);
    } catch (error: any) {
      setMessage(`Erreur lors de l'ajout du joueur : ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div>
      <h1>Ajouter un joueur</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nomJoueur">Nom du joueur :</label>
          <input
            type="text"
            id="nomJoueur"
            value={nomJoueur}
            onChange={(e) => setNomJoueur(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="versionMinecraft">Version de Minecraft :</label>
          <input
            type="text"
            id="versionMinecraft"
            value={versionMinecraft}
            onChange={(e) => setVersionMinecraft(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="heuresJeu">Heures de jeu :</label>
          <input
            type="number"
            id="heuresJeu"
            value={heuresJeu}
            onChange={(e) => setHeuresJeu(Number(e.target.value))}
            required
          />
        </div>

        <div>
          <label htmlFor="modeHardcore">Mode Hardcore :</label>
          <input
            type="checkbox"
            id="modeHardcore"
            checked={modeHardcore}
            onChange={(e) => setModeHardcore(e.target.checked)}
          />
        </div>

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default AjoutPerso;
