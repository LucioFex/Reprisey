// import cheerio from 'cheerio';
import axios from 'axios';
import { IArgenpropFunc } from '../../utils/interfaces/rentalsInterfaces';

const websiteSeachApi = async (location: string): Promise<Record<string, unknown>> => {
    /* Returns Argenprop API result recommendations Object after manual search */
    const url = `https://api.sosiva451.com/Ubicaciones/buscar?stringBusqueda=${location}`;
    const apiFetch = axios.get(url, { headers: { 'Accept-Encoding': 'gzip,deflate,compress' } });
    return (await apiFetch).data[0];
};

const zoneFormatter = (zoneData): string => {
    /* Formats the zone type from 'IdZone' -> 'zone' (e.g: IdProvincia -> provincia) */
    const rawZoneType: string = Object.keys(zoneData)[0];
    const zoneType: string = rawZoneType.slice(2).toLowerCase();
    return zoneType;
};

const getArgenprop = async (location: string, query: unknown): Promise<IArgenpropFunc> => {
    const { value } = await websiteSeachApi(location);
    const zoneType: string = zoneFormatter(value);

    return [{ location: 'TODO' }];
};

export default getArgenprop;
