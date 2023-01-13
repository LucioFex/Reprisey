export interface IFeats {
    squareMeters?: number;
    bedrooms?: number;
    antiquity?: number;
    bathrooms?: number;
    status?: string;
    orientation?: string;
    environments?: number;
}

export interface IFilters {
    order?: 'featured' | 'expensive' | 'cheapest' | 'newest';
    min_price?: number;
    max_price?: number;
    min_expenses?: number;
    max_expenses?: number;
    environments?: number;
}

export interface IData extends IFeats {
    url: string;
    location: string;
    description: string;
    img: string;
    price: number;
    expenses: number;
}
