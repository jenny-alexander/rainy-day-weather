import {useRef, useState, useEffect} from 'react';
import { IWeatherResponseDTO } from '../../../api/weather/weatherApi';
import styles from './HourlyForecast.module.scss';
import { weatherIconImages } from '../../../utils/constants/images';
import cx from 'classnames';
type HourlyForecastProps  = {
    mobileView: boolean,
    weatherProp: IWeatherResponseDTO,
}

const HourlyForecast = ({mobileView, weatherProp}:HourlyForecastProps) : JSX.Element => {
    const [weather, setWeather] = useState<IWeatherResponseDTO>();
    const [mobile, setMobile] = useState<boolean>(mobileView);
    const scrollToRef  = useRef<HTMLInputElement>(null);

    useEffect(() =>{        
        setWeather(weatherProp);
    },[weatherProp])
    const leftScroll = ()  => {
        scrollToRef.current?.scrollBy({top: 0, left:-200, behavior: "smooth"});
    }
    const rightScroll = ()  => {
        scrollToRef.current?.scrollBy({top: 0, left:200, behavior: "smooth"});
    }

    const getTime = (date: number) => {
        let formattedDate: Date = new Date(date*1000);        
        const outTime: string = formattedDate.toLocaleTimeString('en-US', {hour: 'numeric', hour12:true});        
        return outTime;
    }

    return (
        <div className={`${mobileView ? cx(styles.hourlyMainContainer, styles.mobile) : styles.hourlyMainContainer}`}>
                <div className={styles.hourlyTitle}>Hourly Forecast</div>
                <div className={styles.hourlyContainer}>
                    <button title="Scroll hourly weather left" className={styles.leftArrow} onClick={() => leftScroll()}>
                        <i className="fa-solid fa-angle-left"/>
                    </button>
                    <div ref={scrollToRef} className={styles.scrollContainer} tabIndex={0}>
                {
                    weather?.hourly !== undefined ? 
                    (weather?.hourly.map((hour, index: number) => {
                        if ( index < 12 )
                        return (
                            <div className={styles.hourlyForecast} key={hour + '-' + index}>
                                <div className={styles.hourlyTime}>{getTime(hour.dt)}</div>
                                <div className={styles.hourlyImageContainer}>                         
                                     <img alt="Image of hourly weather" className={styles.hourlyImage} src={weatherIconImages.get(hour.weather[0].id)}/>
                                </div>
                                <div className={styles.hourlyTemp}>{Math.round(hour.temp)}°</div>
                                <div className={styles.precipContainer}>
                                    <div className={styles.precipImageContainer}>
                                        <img alt="raindrop image depicting precipitation" className={styles.precipImage} src='/images/rain.png'></img>
                                    </div>
                                    <div className={styles.hourlyPOP}>{Math.round(hour.pop * 100)}%</div> 
                                </div>                               
                             </div>
                            )
                    }) )
                    : <div>Error retrieving weekly forecast</div>
                }
                    </div>
                    <button title="Scroll hourly weather right" className={styles.rightArrow} onClick={() => rightScroll()}>
                        <i className="fa-solid fa-angle-right"/>
                    </button>
                </div>
            </div>
    )
}

export default HourlyForecast;