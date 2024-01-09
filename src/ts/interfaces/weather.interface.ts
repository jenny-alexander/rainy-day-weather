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
            clouds: number, //cloudiness
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