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
    minPrice?: number;
    maxPrice?: number;
    minExpenses?: number;
    maxExpenses?: number;
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
