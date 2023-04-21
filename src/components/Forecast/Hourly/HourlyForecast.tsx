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
        console.log('in useEffect of hourly and weather is:', weather);
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
                    <button className={styles.leftArrow} onClick={() => leftScroll()}>
                        <i className="fa-solid fa-angle-left"/>
                    </button>
                    <div ref={scrollToRef} className={styles.scrollContainer}>
                {
                    weather?.hourly !== undefined ? 
                    (weather?.hourly.map((hour, index: number) => {
                        if ( index < 12 )
                        return (
                            <div className={styles.hourlyForecast} 
                                //  key={weekDay + '-' + index}
                            >
                                <div className={styles.hourlyTime}>{getTime(hour.dt)}</div>
                                <div className={styles.hourlyImageContainer}>                         
                                     <img className={styles.hourlyImage} src={weatherIconImages.get(hour.weather[0].id)}/>
                                </div>
                                <div className={styles.hourlyTemp}>{Math.round(hour.temp)}°</div>
                                <div className={styles.precipContainer}>
                                    <div className={styles.precipImageContainer}>
                                        <img className={styles.precipImage} src='/images/rain.png'></img>
                                    </div>
                                    <div className={styles.hourlyPOP}>{Math.round(hour.pop * 100)}%</div> 
                                </div>                               
                             </div>
                            )
                    }) )
                    : <div>Error retrieving weekly forecast</div>
                }
                    </div>
                    <button className={styles.rightArrow} onClick={() => rightScroll()}>
                        <i className="fa-solid fa-angle-right"/>
                    </button>
                </div>




                {/* <div className={styles.hourlyContainer}>
                    <button className={styles.leftArrow} onClick={() => leftScroll()}>
                        <i className="fa-solid fa-angle-left"/>
                    </button>
                    <div ref={scrollToRef} className={styles.scrollContainer}>
                        <div className={styles.hourlyForecast}>
                            <div className={styles.hourlyTime}>2pm</div>
                            <img alt-text="Image of today's weather" className={styles.dailyImage} 
                                src={ weatherIconImages.get(300) }/>                    
                            <div className={styles.hourlyTemp}>50°F</div>
                        </div>
                        <div className={styles.hourlyForecast}>
                            <div className={styles.hourlyTime}>3pm</div>
                            <img alt-text="Image of today's weather" className={styles.dailyImage} 
                                src={ weatherIconImages.get(300) }/>                    
                            <div className={styles.hourlyTemp}>50°F</div>
                        </div>
                        <div className={styles.hourlyForecast}>
                            <div className={styles.hourlyTime}>4pm</div>
                            <img alt-text="Image of today's weather" className={styles.dailyImage} 
                                src={ weatherIconImages.get(300) }/>                    
                            <div className={styles.hourlyTemp}>50°F</div>
                        </div>
                        <div className={styles.hourlyForecast}>
                            <div className={styles.hourlyTime}>5pm</div>
                            <img alt-text="Image of today's weather" className={styles.dailyImage} 
                                src={ weatherIconImages.get(300) }/>                    
                            <div className={styles.hourlyTemp}>50°F</div>
                        </div>
                        <div className={styles.hourlyForecast}>
                            <div className={styles.hourlyTime}>6pm</div>
                            <img alt-text="Image of today's weather" className={styles.dailyImage} 
                                src={ weatherIconImages.get(300) }/>                    
                            <div className={styles.hourlyTemp}>50°F</div>                    
                        </div>
                        <div className={styles.hourlyForecast}>
                            <div className={styles.hourlyTime}>7pm</div>
                            <img alt-text="Image of today's weather" className={styles.dailyImage} 
                                src={ weatherIconImages.get(300) }/>                    
                            <div className={styles.hourlyTemp}>50°F</div>
                        </div>
                        <div className={styles.hourlyForecast}>
                            <div className={styles.hourlyTime}>8pm</div>
                            <img alt-text="Image of today's weather" className={styles.dailyImage} 
                                src={ weatherIconImages.get(300) }/>                    
                            <div className={styles.hourlyTemp}>50°F</div>
                        </div>
                        <div className={styles.hourlyForecast}>
                            <div className={styles.hourlyTime}>9pm</div>
                            <img alt-text="Image of today's weather" className={styles.dailyImage} 
                                src={ weatherIconImages.get(300) }/>                    
                            <div className={styles.hourlyTemp}>50°F</div>
                        </div>
                    </div> 
                    <button className={styles.rightArrow} onClick={() => rightScroll()}>
                        <i className="fa-solid fa-angle-right"/>
                    </button>
                </div> */}
            </div>
    )
}

export default HourlyForecast;