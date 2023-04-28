import axios, { AxiosError } from 'axios';
import { config } from '../../config/appConfig';

export interface IGeoLocationResponseDTO {
        country: string,
        lat: number,
        lon: number,
        name: string,
        state: string,
        key: string,
}

export async function fetchGeoLocation(searchTerm: string) {    
    try {
        const response = await axios.get<IGeoLocationResponseDTO[]>(
            `${config.geolocation.api.baseUrl}?q=${searchTerm}&limit=5&appid=${config.appId}`,            
        );
        return response.data;
    } catch (err) {
        const error = err as Error | AxiosError;        
        throw error;
    }    
}