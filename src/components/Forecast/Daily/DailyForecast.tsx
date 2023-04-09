// import {useState, useEffect} from 'react';
import SearchBar from '../../SearchBar/SearchBar';
import styles from  './DailyForecast.module.scss';
type DailyForecastProps = {
    mobileView: boolean;
}

const DailyForecast = ({mobileView}: DailyForecastProps): JSX.Element => {
    // const[location, setLocation] = useState('');

    

    return (
        <div className={`${mobileView ? styles.mobileDaily : styles.daily}`}>
            <SearchBar />
            { mobileView ? <div className={styles.locationName}>Minneapolis, MN, USA</div> : null}
            <div className={styles.dailyDetails}>
                <div className={styles.imageContainer}>
                    <img alt-text="Image of today's weather" className={styles.dailyImage} src="/images/sun.png"/>
                </div>                
                <div className={styles.detailsContainer}>
                    { mobileView ? null : <div className={styles.locationName}>Minneapolis, MN, USA</div> }
                    <div className={styles.temperature}>25°F</div>
                    <div className={styles.date}>Tuesday Mar 28</div>
                </div>

            </div>
        </div>

    )
}

export default DailyForecast;