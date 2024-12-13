import { useEffect, useState } from 'react';
import axios from 'axios';
import { Joueur } from '../modeles/Joueur'; // Importer le modèle Joueur
import { useParams } from 'react-router-dom';
import { useIntl, FormattedMessage } from 'react-intl';

function ModifierPerso() {
    const intl = useIntl();
    const { idJoueur } = useParams<{ idJoueur: string }>();
    const [joueur, setJoueur] = useState<Joueur | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    // États pour les champs du formulaire
    const [nomJoueur, setNomJoueur] = useState('');
    const [versionMinecraft, setVersionMinecraft] = useState('');
    const [heuresJeu, setHeuresJeu] = useState<number | ''>('');
    const [modeHardcore, setModeHardcore] = useState(false);
    const [blocs, setBlocs] = useState([{ type: '', quantite: 0 }]);
    const [outils, setOutils] = useState([{ type: '', materiau: '', durabilite: 0 }]);
    const [succes, setSucces] = useState([{ nom: '', description: '', dateObtention: '' }]);

    // Fonction de récupération des détails du joueur
    useEffect(() => {
        axios
            .get<Joueur>(`https://olidevwebapi.netlify.app/api/joueur/${idJoueur}`)
            .then((response) => {
                const joueurData = response.data;
                setJoueur(joueurData); // Stocker les données du joueur
                setNomJoueur(joueurData.nomJoueur);
                setVersionMinecraft(joueurData.versionMinecraft);
                setHeuresJeu(joueurData.heuresJeu);
                setModeHardcore(joueurData.modeHardcore);
                setBlocs(joueurData.inventaire.blocs || [{ type: '', quantite: 0 }]);
                setOutils(joueurData.inventaire.outils || [{ type: '', materiau: '', durabilite: 0 }]);
                setSucces(joueurData.succes || [{ nom: '', description: '', dateObtention: '' }]);
            })
            .catch((err) => {
                console.error('Erreur lors de la récupération du joueur :', err);
                setMessage(`Impossible de récupérer les données : ${err.message}`);
            });
    }, [idJoueur]);

    // Fonction de soumission du formulaire de modification
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        // Validation simple des champs
        if (!nomJoueur || !versionMinecraft || heuresJeu === '') {
            setMessage('Veuillez remplir tous les champs.');
            return;
        }
    
        // Préparation des données dans le format attendu par l'API
        const joueurModifie = {
            nomJoueur,
            versionMinecraft,
            heuresJeu: Number(heuresJeu),
            modeHardcore,
            inventaire: {
                blocs: blocs.map((bloc) => ({
                    type: bloc.type.trim(),
                    quantite: Number(bloc.quantite),
                })),
                outils: outils.map((outil) => ({
                    type: outil.type.trim(),
                    materiau: outil.materiau.trim(),
                    durabilite: Number(outil.durabilite),
                })),
            },
            succes: succes.map((success) => ({
                nom: success.nom.trim(),
                description: success.description.trim(),
                dateObtention: new Date(success.dateObtention).toISOString(),
            })),
        };
    
        try {
            await axios.put(`https://olidevwebapi.netlify.app/api/joueur/update/${idJoueur}`, joueurModifie);
            setMessage(`Joueur modifié avec succès : ${nomJoueur}`);
        } catch (error: any) {
            setMessage(`Erreur lors de la modification du joueur : ${error.response?.data?.message || error.message}`);
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

    return (
        <div>
            <h1>
                <FormattedMessage id="modifierPerso.title" />
            </h1>
            {message && <p>{message}</p>}
            {joueur ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="nomJoueur">
                            <FormattedMessage id="modifierPerso.form.nomJoueur.label" />
                        </label>
                        <input
                            type="text"
                            id="nomJoueur"
                            value={nomJoueur}
                            onChange={(e) => setNomJoueur(e.target.value)}
                            placeholder={joueur.nomJoueur}
                            required
                        />
                    </div>
    
                    <div>
                        <label htmlFor="versionMinecraft">
                            <FormattedMessage id="modifierPerso.form.versionMinecraft.label" />
                        </label>
                        <input
                            type="text"
                            id="versionMinecraft"
                            value={versionMinecraft}
                            onChange={(e) => setVersionMinecraft(e.target.value)}
                            placeholder={joueur.versionMinecraft}
                            required
                        />
                    </div>
    
                    <div>
                        <label htmlFor="heuresJeu">
                            <FormattedMessage id="modifierPerso.form.heuresJeu.label" />
                        </label>
                        <input
                            type="number"
                            id="heuresJeu"
                            value={heuresJeu}
                            onChange={(e) => setHeuresJeu(Number(e.target.value))}
                            placeholder={`${joueur.heuresJeu}`}
                            required
                        />
                    </div>
    
                    <div>
                        <label htmlFor="modeHardcore">
                            <FormattedMessage id="modifierPerso.form.modeHardcore.label" />
                        </label>
                        <input
                            type="checkbox"
                            id="modeHardcore"
                            checked={modeHardcore}
                            onChange={(e) => setModeHardcore(e.target.checked)}
                        />
                    </div>
    
                    <div>
                        <h3>
                            <FormattedMessage id="modifierPerso.form.inventaire.title" />
                        </h3>
    
                        <div>
                            <h4>
                                <FormattedMessage id="modifierPerso.form.blocs.title" />
                            </h4>
                            {blocs.map((bloc, index) => (
                                <div key={index}>
                                    <label htmlFor={`typeBloc${index}`}>
                                        <FormattedMessage id="modifierPerso.form.blocs.type" />
                                    </label>
                                    <input
                                        type="text"
                                        id={`typeBloc${index}`}
                                        value={bloc.type}
                                        onChange={(e) => {
                                            const newBlocs = [...blocs];
                                            newBlocs[index].type = e.target.value;
                                            setBlocs(newBlocs);
                                        }}
                                        placeholder={bloc.type}
                                    />
                                    <label htmlFor={`quantiteBloc${index}`}>
                                        <FormattedMessage id="modifierPerso.form.blocs.quantite" />
                                    </label>
                                    <input
                                        type="number"
                                        id={`quantiteBloc${index}`}
                                        value={bloc.quantite}
                                        onChange={(e) => {
                                            const newBlocs = [...blocs];
                                            newBlocs[index].quantite = Number(e.target.value);
                                            setBlocs(newBlocs);
                                        }}
                                        placeholder={`${bloc.quantite}`}
                                    />
                                </div>
                            ))}
                            <button type="button" onClick={ajouterBloc}>
                                <FormattedMessage id="modifierPerso.form.ajouterBloc" />
                            </button>
                        </div>
    
                        <div>
                            <h4>
                                <FormattedMessage id="modifierPerso.form.outils.title" />
                            </h4>
                            {outils.map((outil, index) => (
                                <div key={index}>
                                    <label htmlFor={`typeOutil${index}`}>
                                        <FormattedMessage id="modifierPerso.form.outils.type" />
                                    </label>
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
                                        <option value="">
                                            <FormattedMessage id="modifierPerso.outils.options.default" />
                                        </option>
                                        {[
                                            "modifierPerso.outils.options.houe",
                                            "modifierPerso.outils.options.hache",
                                            "modifierPerso.outils.options.pioche",
                                            "modifierPerso.outils.options.trident",
                                            "modifierPerso.outils.options.arc",
                                            "modifierPerso.outils.options.epée",
                                            "modifierPerso.outils.options.pelle"
                                        ].map((id) => (
                                            <option key={id} value={intl.formatMessage({ id })}>
                                                {intl.formatMessage({ id })}
                                            </option>
                                        ))}
                                    </select>
                                    {/* Matériau, Durabilité */}
                                </div>
                            ))}
                            <button type="button" onClick={ajouterOutil}>
                                <FormattedMessage id="modifierPerso.form.ajouterOutil" />
                            </button>
                        </div>
                    </div>
                    <button type="submit">
                        <FormattedMessage id="modifierPerso.form.submit" />
                    </button>
                </form>
            ) : (
                <p>
                    <FormattedMessage id="modifierPerso.loading" />
                </p>
            )}
        </div>
    );
}

export default ModifierPerso;
