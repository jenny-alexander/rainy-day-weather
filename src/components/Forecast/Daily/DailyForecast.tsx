import SearchBar from '../../SearchBar/SearchBar';
import styles from  './DailyForecast.module.scss';
import { images } from '../../../utils/constants';
type DailyForecastProps = {
    mobileView: boolean;
}

const DailyForecast = ({mobileView}: DailyForecastProps): JSX.Element => {
    const getImage = (code: number) => {
        if ( code === 200) {
            console.log('image found:', images.has(code));
            console.log('image path is:', images.get(code));
            return images.get(code);
        } else {
            console.log('no image found in map')
        }        
    }   
    
    return (
        <div className={`${mobileView ? styles.mobileDaily : styles.daily}`}>
            <SearchBar />
            { mobileView ? <div className={styles.locationName}>Minneapolis, MN, USA</div> : null}
            <div className={styles.dailyDetails}>
                <div className={styles.imageContainer}>
                    <img alt-text="Image of today's weather" className={styles.dailyImage} 
                        src={getImage(200)}
                    />
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