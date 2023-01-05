export interface IRentalsDefault {
    description: string;
    availableWebsites: string[];
}

export interface IArgenpropData {
    url?: string; // remove '?'
    location?: string; // remove '?'
    description?: string; // remove '?'
    img?: string; // remove '?'
    price?: number; // remove '?'
    expenses?: number; // remove '?'
    environments?: number;
    bathrooms?: number;
    antiquity?: number;
    bedrooms?: number;
}

export type ObjectStNu = Record<string, string | number> | undefined;

export interface IArgenpropRentalFeats {
    squareMeters: number | null;
    bedrooms: number | null;
    antiquity: number | null;
    bathrooms: number | null;
    status: string | null;
    orientation: string | null;
    environments: number | null;
}
