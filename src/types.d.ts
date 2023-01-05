export interface IRentalsDefault {
    description: string;
    availableWebsites: string[];
}

export interface IArgenpropData {
    url: string;
    location: string;
    description: string;
    img: string;
    price: number;
    expenses: number;
    squareMeters?: number;
    bedrooms?: number;
    antiquity?: number;
    bathrooms?: number;
    status?: string;
    orientation?: string;
    environments?: number;
}

export type ObjectStNu = Record<string, string | number> | undefined;

export interface IArgenpropRentalFeats {
    squareMeters?: number;
    bedrooms?: number;
    antiquity?: number;
    bathrooms?: number;
    status?: string;
    orientation?: string;
    environments?: number;
}
