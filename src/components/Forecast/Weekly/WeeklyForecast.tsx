import React from 'react';
import styles from './WeeklyForecast.module.scss';
//import cx from 'classnames';

let today:Date = new Date();
for(let i= 1; i < 8; i++) {
    let thisDay:Date = new Date(today);
    thisDay.setDate(today.getDate() + i);
    console.log(thisDay.getDate());
}

const WeeklyForecast: React.FC = () => {
    return (
        <div className={styles.weekly}>
            <div className={styles.weeklyTitle}>Weekly Forecast</div>
        </div>
    )
}

export default WeeklyForecast;