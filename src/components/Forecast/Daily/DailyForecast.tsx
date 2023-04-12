import { useState, useEffect } from 'react';
import styles from  './DailyForecast.module.scss';
import { weatherIconImages } from '../../../utils/constants/images';
import { IWeatherResponseDTO } from '../../../api/weather/weatherApi';
type DailyForecastProps = {
    mobileView: boolean;
    weatherProp: IWeatherResponseDTO;
    locationProp: string;
}

const DailyForecast = ({mobileView, weatherProp, locationProp}: DailyForecastProps): JSX.Element => {
    const [weather, setWeather] = useState<IWeatherResponseDTO>();
    const [location, setLocation] = useState<string>('');
    
    // const getImage = (code: number) => {
    //     if ( code === 200) {
    //         console.log('image found:', weatherIconImages.has(code));
    //         console.log('image path is:', weatherIconImages.get(code));
    //         return weatherIconImages.get(code);
    //     } else {
    //         console.log('no image found in map')
    //     }        
    // }
    useEffect(()=> {
        setWeather(weatherProp);
    },[weatherProp]); 
    useEffect(()=> {
        setLocation(locationProp);
    },[locationProp]); 

    return (
        <div className={`${mobileView ? styles.mobileDaily : styles.daily}`}>
            { mobileView ? <div className={styles.locationName}>{location}</div> : null}
            <div className={styles.dailyDetails}>
                {/* { Object.keys(weather).length > 0 ?  */}
                        <div className={styles.imageContainer}> 
                        <img alt-text="Image of today's weather" className={styles.dailyImage} 
                            src={weatherIconImages.get(weather?.current.weather[0].id)}/>
                        </div>
                     {/* : <div>Error getting today's weather image</div>
                }               */}
                <div className={styles.detailsContainer}>
                    { mobileView ? null : <div className={styles.locationName}>{location}</div> }
                    <div className={styles.temperature}>{weather?.current.temp}°F</div>
                    <div className={styles.date}>Tuesday Mar 28</div>
                </div>

            </div>
        </div>

    )
}

export default DailyForecast;