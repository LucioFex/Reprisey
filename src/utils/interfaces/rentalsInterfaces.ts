interface IRentalsDefault {
    description: string;
    availableWebsites: string[];
}

interface IArgenpropData {
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

export { IRentalsDefault, IArgenpropData };
