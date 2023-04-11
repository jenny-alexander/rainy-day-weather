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
        console.log('geolocation api response.data is:', response.data);
        return response.data;
    } catch (err) {
        const error = err as Error | AxiosError;
        console.log(`Failed to fetch geolocation: ${error.message}`, error);
        return [];
        // if(!axios.isAxiosError(error)){
        //     // do whatever you want with native error
        // }
        // // do what you want with your axios error
        // console.log(`Failed to fetch global stats: ${error.message}`, error);    
    }    
}