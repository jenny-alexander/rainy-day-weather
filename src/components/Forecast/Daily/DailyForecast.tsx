import { useState, useEffect } from 'react';
import HourlyForecast from '../Hourly/HourlyForecast';
import styles from  './DailyForecast.module.scss';
import { weatherIconImages, nightIconImages } from '../../../utils/constants/images';
import { IWeatherResponseDTO } from '../../../api/weather/weatherApi';
import Formatter from '../../../utils/formatter/formatter';
// import 
type DailyForecastProps = {
    mobileView: boolean;
    weatherProp: IWeatherResponseDTO;
    locationProp: string;
}

const DailyForecast = ({mobileView, weatherProp, locationProp}: DailyForecastProps): JSX.Element => {
    const [weather, setWeather] = useState<IWeatherResponseDTO>();
    const [location, setLocation] = useState<string>('');
    const [night, setNight] = useState<boolean>(false);
    
    useEffect(()=> {
        setWeather(weatherProp);        
        if (weatherProp.current.dt !== undefined) {
            let formattedDate: Date = new Date(weatherProp.current.dt*1000);            
            const time: string = formattedDate.toLocaleTimeString('en-US',{hour12: false});            
            if ( parseInt(time.substring(0,2)) >= 18) {
                setNight(true);
            } else {                
                setNight(false);
            }            
        }
    },[weatherProp]); 
    
    useEffect(()=> {
        setLocation(locationProp);                
    },[locationProp]);

    return (
        <div className={`${mobileView ? styles.mobileDaily : styles.daily}`}>
            { mobileView ? <div className={styles.locationName}>{location}</div> : null}
            <div className={styles.dailyDetails}>
                <div className={styles.imageContainer}> 
                
                <img alt-text="Image of today's weather" className={styles.dailyImage} 
                    src={ 
                        night ? nightIconImages.get(weather?.current.weather[0].id) : 
                                 weatherIconImages.get(weather?.current.weather[0].id)
                        }
                />
                </div>
                <div className={styles.detailsContainer}>
                    { mobileView ? null : <div className={styles.locationName}>{location}</div> }
                    <div className={styles.temperature}>
                        {weather?.current.temp !== undefined ? Math.round(weather?.current.temp) : 'Temperature not found' }°F
                    </div>
                    <div className={styles.feelsLike}>
                        { weather?.current.feels_like ? 
                            Math.round(weather?.current.feels_like) !== Math.round(weather.current.temp) ?
                                `Feels like: ${Math.round(weather.current.feels_like)}` : null 
                            : null
                        }
                    </div>
                    <div className={styles.date}>Last Updated: {
                        weather?.current.dt !== undefined ? Formatter.convertDate(weather?.current.dt) : 'Date not found'}
                    </div>
                </div>

            </div>
            { weather !== undefined ? 
                <HourlyForecast weatherProp = {weather}
                                 mobileView = {mobileView}/> 
                : null }
        </div>

    )
}

export default DailyForecast;