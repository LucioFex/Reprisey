import cheerio from 'cheerio';
import axios from 'axios';
import { IArgenpropData, ObjectStNu, IArgenpropRentalFeats } from '../../types';

const websiteSeachApi = async (location: string): Promise<ObjectStNu> => {
    /* Returns Argenprop API result recommendations Object after manual search */
    const url = `https://api.sosiva451.com/Ubicaciones/buscar?stringBusqueda=${location}`;
    const apiFetch = axios.get(url, { headers: { 'Accept-Encoding': 'gzip,deflate,compress' } });
    return (await apiFetch).data[0].value;
};

const zoneFormatter = (zoneData: ObjectStNu): string[] => {
    /* Formats the zone type from 'IdZone' -> 'zone' (e.g: IdSubBarrio -> sub-barrio) */
    const rawZoneType: string = Object.keys(zoneData)[0];

    let zoneType: string = rawZoneType.slice(2);
    const zoneName: string = zoneData[`Codigo${zoneType}`] as string;

    zoneType = zoneType === 'SubBarrio' ? 'sub-barrio' : zoneType.toLowerCase();
    return [zoneType, zoneName];
};

const getRentalsInZone = async (zoneType: string, zoneName: string): Promise<string> => {
    /* Fetch of rentals in the zone selected */
    const url = `https://www.argenprop.com/departamento-alquiler-${zoneType}-${zoneName}`;
    const fetchDom = await axios.get(url, { headers: { 'Accept-Encoding': 'gzip,deflate,compress' } });

    const { data }: { data: string } = fetchDom;
    return data;
};

const separateCosts = (costs: string[]): number[] => {
    /* Returns the 'price' and 'expenses' of a rental's cost */

    // Filter of the 'Consultar precio' rentals
    if (costs[0].includes('Consultar precio')) throw Error('"Consultar precio" rental');
    if (costs[1] === undefined) costs[1] = '0'; // Expenses covered

    // e.g of processing: '$ 36.333\expenses' -> 36333
    const regex = /(\$ |\$)|(\.)|(\nex(\S+))/g;
    const [price, expenses]: number[] = [
        parseFloat(costs[0].trim().replace(regex, '')),
        parseFloat(costs[1].trim().replace(regex, '')),
    ];

    return [price, expenses];
};

const getRentalFeatures = (features): IArgenpropRentalFeats => {
    // TO DO: Parse strings and numbers
    const rentalFeatures: IArgenpropRentalFeats = {
        squareMeters: features.find('.icono-superficie_cubierta').next().text().trim(),
        bedrooms: features.find('.icono-cantidad_dormitorios').next().text().trim(),
        antiquity: features.find('.icono-antiguedad').next().text().trim(),
        bathrooms: features.find('.icono-cantidad_banos').next().text().trim(),
        status: features.find('.icono-estado_propiedad').next().text().trim(),
        orientation: features.find('.icono-orientacion').next().text().trim(),
        environments: features.find('.icono-cantidad_ambientes').next().text().trim(),
    };

    for (const feat of Object.keys(rentalFeatures)) {
        if (rentalFeatures[feat] === '') rentalFeatures[feat] = null;
    }

    return rentalFeatures;
};

const processRentalData = (data: cheerio.TagElement): IArgenpropData => {
    /* Object formatting of the different rentals in the search */
    const $ = cheerio.load(data);

    const url = `https://www.argenprop.com${$('.card').attr('href')}`;
    const location: string = $('.card__address').html().trim();
    const description: string = $('.card__title').text().trim();

    const costs: string[] = $('.card__price').text().split('+');
    const [price, expenses]: number[] = separateCosts(costs);

    const imgRegex = /https(\S+\.jpg)/g;
    const img = $('.card__photos').find('li').html().match(imgRegex)[0];

    const features = $('.card__main-features');
    const {
        squareMeters,
        bedrooms,
        antiquity,
        bathrooms,
        status,
        orientation,
        environments,
    }: IArgenpropRentalFeats = getRentalFeatures(features);

    return {
        url,
        location,
        description,
        img,
        price,
        expenses,
    };
};

const organizeRentalsData = (rawHtmlData: string): IArgenpropData[] => {
    /* Returns all the fetch rentals (without filters) */
    const organizedData: IArgenpropData[] = [];
    const $ = cheerio.load(rawHtmlData);

    $('.listing__item').each((_index: number, elem: cheerio.TagElement) => {
        try {
            organizedData.push(processRentalData(elem));
        } catch (err) { /* Rental skip */ }
    });
    return organizedData;
};

const getArgenprop = async (location: string, filters: ObjectStNu): Promise<IArgenpropData[]> => {
    const value: ObjectStNu = await websiteSeachApi(location);
    const [zoneType, zoneName]: string[] = zoneFormatter(value);

    const rawHtmlData: string = await getRentalsInZone(zoneType, zoneName);
    const organizedData: IArgenpropData[] = organizeRentalsData(rawHtmlData);

    return organizedData;
};

export default getArgenprop;

// export interface IArgenpropData { TO DO
//     environments?: number;
//     bathrooms?: number;
//     antiquity?: number;
//     bedrooms?: number;
//     squareMeters?: number;
//     status?: string;
//     orientation?: string;
// }
