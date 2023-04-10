import axios, { AxiosError } from 'axios';
import { config } from '../config/appConfig';

export interface IGeoLocationResponseDTO {
        country: string,
        lat: number,
        lon: number,
        name: string,
        state: string,
        key: string,
}

export async function fetchGeoLocation(searchTerm: string) {
    console.log('api key is:', config.weather.api.appId);
    console.log('search term is:', searchTerm)
    try {
        const response = await axios.get<IGeoLocationResponseDTO[]>(
            `http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=${config.weather.api.appId}`,
        );
        console.log('response.data is:', response.data);
        return response.data;
    } catch (err) {
        const error = err as Error | AxiosError;
        console.log(`Failed to fetch global stats: ${error.message}`, error);
        return [];
        // if(!axios.isAxiosError(error)){
        //     // do whatever you want with native error
        // }
        // // do what you want with your axios error
        // console.log(`Failed to fetch global stats: ${error.message}`, error);
    
    }    
}