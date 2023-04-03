import React from 'react';
import styles from './WeeklyForecast.module.scss';
//import cx from 'classnames';

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

const WeeklyForecast: React.FC = () => {
    return (
        <div className={styles.weekly}>
            <div className={styles.weeklyTitle}>Weekly Forecast</div>
            <div className={styles.weeklyForecast}>
                {week.map(weekDay => {
                    return (
                        <div className={styles.dayForecast}>
                            <div className={styles.dayOfWeek}>{weekDay}</div>                            
                            <img className={styles.image} src="/images/cloudy-3.png"/>
                            <div className={styles.highLowContainer}>
                                <div className={styles.highTemp}>40°</div>
                                <div className={styles.lowTemp}>32°</div>
                            </div>
                        </div>)
                })}
            </div>
        </div>
    )
}

export default WeeklyForecast;