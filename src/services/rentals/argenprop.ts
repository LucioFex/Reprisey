import cheerio from 'cheerio';
import axios from 'axios';
import { IArgenpropData, ObjectStNu } from '../../types';

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

const processRentalData = (data): IArgenpropData => { // TO DO
    /* Object formatting of the different rentals in the search */
    const rentalData: IArgenpropData = {};
    const $ = cheerio.load(data);

    const costs: string[] = $('.card__price').text().split('+');

    // Filter of the 'Consultar precio' rentals
    if (costs[0].includes('Consultar precio')) throw Error('"Consultar precio" rental');

    const [price, expenses]: string[] = [
        costs[0].trim().slice(2).split('.').join(''), // Done
        costs[1].trim().slice(1).split('.').join(''), // Need Fix
    ];

    console.log([price, expenses]);

    return { location: 'dummy info' };
};

const organizeRentalsData = (rawHtmlData: string): IArgenpropData[] => {
    const organizedData: IArgenpropData[] = [];
    const $ = cheerio.load(rawHtmlData);

    $('.listing__item').each((_index, elem) => {
        try {
            organizedData.push(processRentalData(elem));
        } catch (err) {
            // console.error('Rental skiped\n', err); // Rental skip
        }
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

// export interface IArgenpropData {
//     location?: string;
//     description?: string;
//     imgs?: string[];
//     price?: number;
//     expenses?: number;
//     environments?: number;
//     bathrooms?: number;
//     antiquity?: number;
//     bedrooms?: number;
// }
