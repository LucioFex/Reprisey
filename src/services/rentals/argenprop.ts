// import cheerio from 'cheerio';
import axios from 'axios';
import { IArgenpropData, ObjectStNu } from '../../types';

const websiteSeachApi = async (location: string): Promise<ObjectStNu> => {
    /* Returns Argenprop API result recommendations Object after manual search */
    const url: string = `https://api.sosiva451.com/Ubicaciones/buscar?stringBusqueda=${location}`;
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

const getRentalsInZone = async (zoneType: string, zoneName: string): Promise<IArgenpropData[]> => {
    /* Fetch of rentals in the zone selected */
    const url = `https://www.argenprop.com/departamento-alquiler-${zoneType}-${zoneName}`;
    const fetchDom = await axios.get(url, { headers: { 'Accept-Encoding': 'gzip,deflate,compress' } });

    const { data }: { data: IArgenpropData[] } = fetchDom;
    console.log(data);
    return data;
};

const getArgenprop = async (location: string, query: ObjectStNu): Promise<IArgenpropData[]> => {
    const value: ObjectStNu = await websiteSeachApi(location);
    const [zoneType, zoneName]: string[] = zoneFormatter(value);
    const apiData = getRentalsInZone(zoneType, zoneName);

    return apiData; // Error
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
