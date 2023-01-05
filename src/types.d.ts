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
