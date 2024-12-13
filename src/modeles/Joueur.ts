export interface Bloc {
    _id: string;
    type: string;
    quantite: number;
}

export interface Outil {
    _id: string;
    type: string;
    materiau: string;
    durabilite: number;
}

export interface Inventaire {
    _id: string;
    blocs: Bloc[];
    outils: Outil[];
}

export interface Succès {
    nom: string;
    description: string;
    dateObtention: string;
}

export interface Joueur {
    _id: string;
    nomJoueur: string;
    versionMinecraft: string;
    inventaire: Inventaire;
    succes: Succès[];
    heuresJeu: number;
    modeHardcore: boolean;
}