import { ModalPositionX, ModalPositionY } from "../ts/interfaces/modal.interface";

export const config = {
    appId: process.env.REACT_APP_WEATHER_KEY,
    geolocation: {
        api: {
            baseUrl: 'https://api.openweathermap.org/geo/1.0/direct',
        }
    },
    reverseGeolocation: {
        api: {
            baseUrl: 'https://api.openweathermap.org/geo/1.0/reverse',
        }
    },
    weather: {
        api: {
            baseUrl: 'https://api.openweathermap.org/data/3.0/onecall',

        }
    },
    alertModal: {
        title: "Alerts",
        showOverlay: true,
        positionX: ModalPositionX.center,
        positionY: ModalPositionY.center,
        padding: "20px",
    }
} as const;