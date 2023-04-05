import styles from './Highlights.module.scss';

type DailyHighlightsProps = {
    mobileView: boolean;
}

const Highlights = ({mobileView}: DailyHighlightsProps) => {

    interface IHighlights {
        section: string;
        image: string;
        reading: string;
    }

    const highlights: IHighlights[] = [
        {
            section: 'temperature',
            image: '/images/thermometer.png',
            reading: '40°|33°',
        },
        {
            section: 'wind',
            image: '/images/wind.png',
            reading: '10.3 mi/h',
        },
        {
            section: 'rain',
            image: '/images/rain.png',
            reading: '45%',
        },
        {
            section: 'humidity',
            image: '/images/humidity.png',
            reading: '70%',
        },
        {
            section: 'air quality',
            image: '/images/oxygen.png',
            reading: 'Good',
        },
        {
            section: 'uv',
            image: '/images/rays.png',
            reading: 'High',
        },
                                ]

    return (
        <div className={`${mobileView ? styles.mobileHighlights : styles.highlights}`}>
            <div className={styles.highlightsTitle}>Today's Highlights</div>
            <div className={styles.highlightsDetails}>
            {highlights.map(highlights => {
                    return (
                        <div className={styles.sectionDetails}>
                            { mobileView ? null :
                                <div className={styles.sectionTitle}>{highlights.section}</div>
                            }
                            <div className={styles.sectionInfo}>
                                <img className={styles.image} src={highlights.image}/>
                                <div className={styles.sectionReading}>{highlights.reading}</div>
                            </div>
                        </div>)
                })}
            </div>
        </div>
    )
}

export default Highlights;