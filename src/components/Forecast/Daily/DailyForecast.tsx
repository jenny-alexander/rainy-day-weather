import React from 'react';
import SearchBar from '../../SearchBar/SearchBar';
import styles from  './DailyForecast.module.scss';
//import cx from 'classnames';

const DailyForecast: React.FC = () => {
    return (
        <div className={styles.daily}>
            <SearchBar />
            <div className={styles.dailyDetails}>
                <img className={styles.dailyImage} src="/images/sun.png"/>
                <div className={styles.locationName}>Minneapolis, MN, USA</div>
                <div className={styles.temperature}>25°F</div>
                <div className={styles.day}>Tuesday Mar 28</div>
                <div className={styles.dailyForecast}>
                    <img className={styles.forecastImage} src="/images/cloudy-3.png"/>
                    <div>Cloudy with sunny periods</div>
                </div>

            </div>
        </div>

    )
}

export default DailyForecast;