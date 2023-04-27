import {useEffect, useState} from 'react';
import styles from './WeeklyForecast.module.scss';
import { IWeatherResponseDTO } from '../../../api/weather/weatherApi';
import { weatherIconImages } from '../../../utils/constants/images';

const dayNames: string[] = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
];

type WeeklyForecastProps = {
    // mobileView: boolean;
    weatherProp: IWeatherResponseDTO;
}

const WeeklyForecast = ({weatherProp}: WeeklyForecastProps): JSX.Element => {
    const [weather, setWeather] = useState<IWeatherResponseDTO>();
    useEffect(() => {        
        if ( weatherProp !== undefined ) {
            setWeather(weatherProp)
        }
    },[weatherProp])

    const getDayOfWeek = (date: number) => {
        let formattedDate: Date = new Date(date*1000);
        const day = dayNames[formattedDate.getDay()];
        return day;
    }

    return (
        <div className={styles.weekly}> 
            <div className={styles.weeklyTitle}>Weekly Forecast</div>
            <div className={styles.weeklyForecast}>
                {
                    weather?.daily !== undefined ? 
                    (weather?.daily.map((weekDay, index: number) => {
                        if ( index > 0 )
                        return (
                            <div className={styles.dayForecast} 
                                //  key={weekDay + '-' + index}
                            >
                                <div className={styles.dayOfWeek}>{getDayOfWeek(weekDay.dt)}</div>
                                <div className={styles.imageContainer}>                         
                                     <img className={styles.image} src={weatherIconImages.get(weekDay.weather[0].id)}/>
                                 </div>
                                 <div className={styles.rainPrecip}>
                                        <img className={styles.precipImage} src='/images/rain.png'></img>
                                        {Math.round(weekDay.pop * 100)}%
                                    </div>
                                 <div className={styles.highLowContainer}>
                                     <div className={styles.highTemp}>{Math.round(weekDay.temp.max)}°</div>
                                     <div>/</div>
                                     <div className={styles.lowTemp}>{Math.round(weekDay.temp.min)}°</div>
                                 </div> 
                             </div>
                            )
                    }) )
                    : <div>Error retrieving weekly forecast</div>
                }
            </div>
        </div>
    )
}

export default WeeklyForecast;