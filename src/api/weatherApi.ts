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

export interface IWeatherResponseDTO {
    lat: string,
    lon: string,
    timezone: string,
    timezone_offset: number,
    current: 
        {
            dt: number,
            temp: number, //temperature
            feels_like: number,
            uvi: number, //uv
            wind_speed: number, //wind speed
            humidity: number, //humidity
        },
    data: [
        {
            dt: number,
            temp: {
                min: number,
                max: number,
            },
            humidity: number,
            wind_speed: number,
            pop: number,
            univ: number
            weather: {
                main: string,
                description: string,
            }
        }
    ]
}

export async function fetchGeoLocation(searchTerm: string) {
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