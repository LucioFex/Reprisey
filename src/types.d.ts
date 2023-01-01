export interface IRentalsDefault {
    description: string;
    availableWebsites: string[];
}

export interface IArgenpropData {
    location?: string;
    description?: string;
    imgs?: string[];
    price?: number;
    expenses?: number;
    environments?: number;
    bathrooms?: number;
    antiquity?: number;
    bedrooms?: number;
}

export type ObjectStNu = Record<string, string | number> | undefined;
