import React from 'react';
import styles from './DailyForecast.module.scss';
// import SearchBar from '../../SearchBar/SearchBar';
//import cx from 'classnames';

const MobileDailyForecast: React.FC = () => {
    return (
            
            <div className={styles.mobileDaily}>
                <div className={styles.locationName}>Minneapolis, MN, USA</div>
                <div className={styles.dailyDetails}>
                    <div className={styles.imageContainer}>
                        <img className={styles.mobileDailyImage} src="/images/sun.png"/>
                    </div>
                    <div className={styles.detailsContainer}>
                        <div className={styles.mobileTemperature}>25°F</div>
                        <div className={styles.mobileDate}>Tuesday Mar 28</div>
                    </div>
                </div>
            </div>
    )
}

export default MobileDailyForecast;