import axios, { AxiosError } from 'axios';
import { config } from '../config/appConfig';
import { format } from 'path';

export interface IWeatherResponseDTO {
        country: string,
        lat: number,
        lon: number,
        name: string,
        state: string,
}


export async function fetchGeoLocation(searchTerm: string) {
    console.log('api key is:', config.weather.api.appId);
    console.log('search term is:', searchTerm)
    try {
        
        const response = await axios.get<IWeatherResponseDTO[]>(
            `http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=${config.weather.api.appId}`,
          );

            // const formattedResponse: IWeatherResponseDTO = response.data.map(item  => {
            //     country: item.country,
            //     lat: item.lat,
            //     lon: item.lon,
            //     name: item.name,
            //     state: item.state,
                
            // })
            // console.log('the formattedResponse is:', formattedResponse);
            // const formattedResponse: IWeatherResponseDTO = response.data.map(item => {

            // })
            console.log('response.data is:', response.data);
            return response.data;
            
            //This works if I can't figure it out....
            // response.data.map(item => {
            //     console.log('item in loop is:', item)
            //   });
            
        //   console.log('response is:', response);
        //   const { data } = response;
        //   console.log('data is:', data);
        //   return { results: data };

      
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