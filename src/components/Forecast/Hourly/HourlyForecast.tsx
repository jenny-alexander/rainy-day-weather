import {useRef} from 'react';
import styles from './HourlyForecast.module.scss';
import { weatherIconImages } from '../../../utils/constants/images';



const HourlyForecast = () : JSX.Element => {
    const scrollToRef  = useRef<HTMLInputElement>(null);
    const leftScroll = ()  => {
        scrollToRef.current?.scrollBy({top: 0, left:-200, behavior: "smooth"});
    }
    const rightScroll = ()  => {
        scrollToRef.current?.scrollBy({top: 0, left:200, behavior: "smooth"});
    }
    return (
        <div className={styles.hourlyMainContainer}>
                {/* <div className={styles.hourlyTitle}>Hourly</div> */}
                <div className={styles.hourlyContainer}>
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
                </div>
            </div>
    )
}

export default HourlyForecast;