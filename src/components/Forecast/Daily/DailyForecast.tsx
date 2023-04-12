import { useState } from 'react';
import SearchBar from '../../SearchBar/SearchBar';
import styles from  './DailyForecast.module.scss';
import { images } from '../../../utils/constants';
import { IWeatherResponseDTO } from '../../../api/weather/weatherApi';
import { IGeoLocationResponseDTO } from '../../../api/geolocation/geolocationApi';
type DailyForecastProps = {
    mobileView: boolean;
}

const DailyForecast = ({mobileView}: DailyForecastProps): JSX.Element => {
    const [weather, setWeather] = useState<IWeatherResponseDTO>();
    const [location, setLocation] = useState<string>('');
    
    const getImage = (code: number) => {
        if ( code === 200) {
            console.log('image found:', images.has(code));
            console.log('image path is:', images.get(code));
            return images.get(code);
        } else {
            console.log('no image found in map')
        }        
    }   
    const handleGetWeather = (weather: IWeatherResponseDTO): void => {
        console.log('*** in handleGetWeather in Daily Forecast!');
        console.log('*** weather is:', weather);
        setWeather(weather);
    }
    const handleGetLocation = (location: string): void => {
        console.log('*** in handleLocation and location is;', location)
        setLocation(location);
    }
    return (
        <div className={`${mobileView ? styles.mobileDaily : styles.daily}`}>
            <SearchBar 
                returnWeather={handleGetWeather}
                returnLocation={handleGetLocation}
            />
            { mobileView ? <div className={styles.locationName}>{location}</div> : null}
            <div className={styles.dailyDetails}>
                {/* { Object.keys(weather).length > 0 ?  */}
                        <div className={styles.imageContainer}> 
                        <img alt-text="Image of today's weather" className={styles.dailyImage} 
                            src={images.get(weather?.current.weather[0].id)}/>
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