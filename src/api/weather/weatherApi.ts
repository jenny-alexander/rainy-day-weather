import axios, { AxiosError } from 'axios';
import { config } from '../../config/appConfig';
export interface IWeatherResponseDTO {
    lat: number,
    lon: number,
    timezone: string,
    timezone_offset: number,
    current: 
        {
            dt?: number, //date
            temp: number, //temperature
            feels_like?: number,
            uvi?: number, //uv
            wind_speed?: number, //wind speed
            humidity?: number, //humidity
            weather: [
                {
                id: number,
                description: string,
                }
            ],
        },
    daily: [
        {
            dt: number,
            temp: {
                min: number,
                max: number,
            },
            humidity: number,
            wind_speed: number,
            pop: number,
            uvi: number
            weather: [{
                id: number,
                description: string,
            }],
        },
    ],
    hourly: [
        {
            dt: number,
            temp: number,
            humidity: number,
            wind_speed: number,
            pop: number,
            uvi: number
            weather: [{
                id: number,
                description: string,
            }],
        },
    ],
    alerts: [{
        description: string,
        start: number,
        end: number,
        event: string,
        sender_name: string,    
    }],
}

export async function fetchWeather(lat: number, lon: number) {    
    try {        
            const response = await axios.get(
            `${config.weather.api.baseUrl}?lat=${lat}&lon=${lon}&exclude=minutely&appid=${config.appId}&units=imperial`,            
        );        
        return response.data;
    } catch (err) {        
        const error = err as Error | AxiosError;        
        throw {error};
    }    
}