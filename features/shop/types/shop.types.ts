import { ApiResponse } from "types/general.type";

export type Achat = {
    _id: string;
    prix: number;
    dateAchat: Date;
    produit: string;
    mail: string;
}

export type Produit = {
    _id: string;
    jeu: string;
    nom: string;
    prix: number;
}

export type Promotion = {
    _id: string;
    idProduit: string;
    pourcentage: number;
}

export type GetProductReponse = ApiResponse<{ produits: Produit[] }>;
export type GetPromotionsResponse = ApiResponse<{ produits: Promotion[] }>;
export type GetJeuxResponse = ApiResponse<{ jeux: string[]}>;
export type PostAchatResponse = ApiResponse<void>;
export type GetHistoriqueReponse = ApiResponse<Achat[]>;