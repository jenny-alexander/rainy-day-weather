export const config = {
    appId: process.env.REACT_APP_WEATHER_KEY,
    geolocation: {
        api: {
            baseUrl: 'http://api.openweathermap.org/geo/1.0/direct',
        }
    },
    weather: {
        api: {
            baseUrl: 'https://api.openweathermap.org/data/3.0/onecall',
            
        }
    }
} as const;