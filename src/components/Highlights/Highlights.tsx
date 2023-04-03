import React from 'react';
import styles from './Highlights.module.scss';
//import cx from 'classnames';

const Highlights: React.FC = () => {

    const sections: string[] = ['temperature',
                                 'wind',
                                 'rain',
                                 'humidity',
                                 'air quality',
                                 'uv',
                                ]

    return (
        <div className={styles.highlights}>
            <div className={styles.highlightsTitle}>Today's Highlights</div>
            <div className={styles.highlightsDetails}>
            {sections.map(section => {
                    return (
                        <div className={styles.sectionDetails}>
                            <div className={styles.sectionTitle}>{section}</div>
                            <div className={styles.sectionInfo}>
                                <img className={styles.image} src="/images/humidity.png"/>
                                <div className={styles.sectionReading}>Average</div>
                            </div>
                        </div>)
                })}
            </div>
        </div>
    )
}

export default Highlights;