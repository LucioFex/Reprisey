// import cheerio from 'cheerio';
import axios from 'axios';
import { IArgenpropFunc, ObjectStNu } from '../../types';

const websiteSeachApi = async (location: string): Promise<ObjectStNu> => {
    /* Returns Argenprop API result recommendations Object after manual search */
    const url = `https://api.sosiva451.com/Ubicaciones/buscar?stringBusqueda=${location}`;
    const apiFetch = axios.get(url, { headers: { 'Accept-Encoding': 'gzip,deflate,compress' } });
    return (await apiFetch).data[0].value;
};

const zoneFormatter = (zoneData: ObjectStNu): string => {
    /* Formats the zone type from 'IdZone' -> 'zone' (e.g: IdSubBarrio -> sub-barrio) */
    const rawZoneType: string = Object.keys(zoneData)[0];
    const zoneType: string = rawZoneType.slice(2).toLowerCase();
    return zoneType === 'subbarrio' ? 'sub-barrio' : zoneType;
};

const getArgenprop = async (location: string, query: ObjectStNu): Promise<IArgenpropFunc> => {
    const value: ObjectStNu = await websiteSeachApi(location);
    const zoneType: string = zoneFormatter(value);

    return [{ location: zoneType }];
};

export default getArgenprop;
