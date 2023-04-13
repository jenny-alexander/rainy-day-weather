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
}

// export const initialWeatherResponse: IWeatherResponseDTO = {
//     current: {
//         weather: [
//             {
//             id: 0,
//             description: '',
//             }
//         ],
//     }
// };

export async function fetchWeather(lat: number, lon: number) {
    console.log('in fetchWeather api and params are:', lat, lon);
    try {
        // const response = await axios.get<IWeatherResponseDTO>(
            const response = await axios.get(
            `${config.weather.api.baseUrl}?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&appid=${config.appId}&units=imperial`,
        );
        console.log('weather api response.data is:', response.data);
        return response.data;
    } catch (err) {
        const error = err as Error | AxiosError;
        console.log(`Failed to fetch weather: ${error.message}`, error);
        return {};
    }    
}