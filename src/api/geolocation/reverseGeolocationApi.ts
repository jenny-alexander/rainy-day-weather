import axios from 'axios';
import { config } from '../../config/appConfig';

export interface IReverseGeoLocationResponseDTO {
    country: string,
    lat: number,
    lon: number,
    name: string,
    state: string,
    key: string,
}

export async function fetchReverseGeoLocation(lat: number, lon: number) {
    try {
        const response = await axios.get<IReverseGeoLocationResponseDTO[]>(
            `${config.reverseGeolocation.api.baseUrl}?lat=${lat}&lon=${lon}&limit=1&appid=${config.appId}`,
        );
        return response.data;
    } catch (err) {
        throw new Error("Error fetching reverse geolocation.", { cause: err });
    }
}