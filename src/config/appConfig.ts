export const config = {
    weather: {
        api: {
            baseUrl: 'https://api.openweathermap.org/data/2.5/weather',
            appId: process.env.REACT_APP_WEATHER_KEY,
        }
    }
} as const;