export interface Bloc {
    _id: string;
    type: string;
    quantité: number;
}

export interface Outil {
    _id: string;
    type: string;
    matériau: string;
    durabilité: number;
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
    succès: Succès[];
    heuresJeu: number;
    modeHardcore: boolean;
}