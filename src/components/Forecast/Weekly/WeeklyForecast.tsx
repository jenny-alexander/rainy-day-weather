import styles from './WeeklyForecast.module.scss';

const dayNames: string[] = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
];

let week: string[] = [];

let today:Date = new Date();
for(let i= 1; i < 8; i++) {
    let thisDay:Date = new Date(today);
    thisDay.setDate(today.getDate() + i);    
    week.push(dayNames[thisDay.getDay()]);
}

type WeeklyForecastProps = {
    mobileView: boolean;
}

const WeeklyForecast = ({mobileView}: WeeklyForecastProps) => {
    return (
        <div className={styles.weekly}> 
            <div className={styles.weeklyTitle}>Weekly Forecast</div>
            <div className={styles.weeklyForecast}>
                {week.map(weekDay => {
                    return (
                        <div className={styles.dayForecast}>
                            <div className={styles.dayOfWeek}>{weekDay}</div>
                            <div className={styles.imageContainer}>                         
                                <img className={styles.image} src="/images/cloudy-3.png"/>
                                <div className={styles.rainPrecip}>30% rain</div>
                            </div>
                            <div className={styles.highLowContainer}>
                                <div className={styles.highTemp}>40°</div>
                                <div>/</div>
                                <div className={styles.lowTemp}>32°</div>
                            </div>
                        </div>)
                })}
            </div>
        </div>
    )
}

export default WeeklyForecast;