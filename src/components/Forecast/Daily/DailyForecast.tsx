import React from 'react';
import SearchBar from '../../SearchBar/SearchBar';
import styles from  './DailyForecast.module.scss';

type DailyForecastProps = {
    mobileView: boolean;
}

const DailyForecast = ({mobileView}: DailyForecastProps) => {

    return (
        <div className={`${mobileView ? styles.mobileDaily : styles.daily}`}>
            <SearchBar />
            { mobileView ? <div className={styles.locationName}>Minneapolis, MN, USA</div> : null}
            {/* <div className={styles.locationName}>Minneapolis, MN, USA</div> */}
            <div className={styles.dailyDetails}>
            
                <div className={styles.imageContainer}>
                    <img className={styles.dailyImage} src="/images/sun.png"/>
                </div>                
                <div className={styles.detailsContainer}>
                    { mobileView ? null : <div className={styles.locationName}>Minneapolis, MN, USA</div> }
                    <div className={styles.temperature}>25°F</div>
                    <div className={styles.date}>Tuesday Mar 28</div>
                </div>
                {/* <div className={styles.dailyForecast}>
                    <img className={styles.forecastImage} src="/images/cloudy-3.png"/>
                    <div>Cloudy with sunny periods</div>
                </div> */}

            </div>
        </div>

    )
}

export default DailyForecast;