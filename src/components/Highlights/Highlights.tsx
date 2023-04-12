import {useEffect, useState} from 'react';
import styles from './Highlights.module.scss';
import { IWeatherResponseDTO } from '../../api/weather/weatherApi';
import { highlightsImage } from '../../utils/constants/images';

type DailyHighlightsProps = {
    mobileView: boolean;
    weatherProp: IWeatherResponseDTO;
}

const Highlights = ({mobileView, weatherProp}: DailyHighlightsProps): JSX.Element => {
    const [weather, setWeather] = useState<IWeatherResponseDTO>();
    interface IHighlights {
        section: string;
        imageCode: number;
        reading: number| undefined;
        unit: string,      
    }

    useEffect(() => {
        console.log('weatherProp is:', weatherProp);
        setWeather(weatherProp);
    },[weatherProp])

    const highlights: IHighlights[] = [    
        {
            section: 'temperature',
            imageCode: 1,
            reading: weather?.current.temp,
            unit: 'F°',            
        },
        {
            section: 'wind',
            imageCode: 2,
            reading: weather?.current.wind_speed,
            unit: 'mi/h',
        },
        {
            section: 'rain',
            imageCode: 3,
            reading: 45,
            unit: '%',
        },
        {
            section: 'humidity',
            imageCode: 4,
            reading: weather?.current.humidity,
            unit: '%',
        },
        {
            section: 'air quality',
            imageCode: 5,
            reading: 2,
            unit: 'AQI'
        },
        {
            section: 'uv',
            imageCode: 6,
            reading: weather?.current.uvi,
            unit: 'UV'
        },
                                ]

    return (
        <div className={`${mobileView ? styles.mobileHighlights : styles.highlights}`}>
            <div className={styles.highlightsTitle}>Today's Highlights</div>
            <div className={styles.highlightsDetails}>
            {highlights.map((highlights, index: number) => {
                    return (
                        <div className={styles.sectionDetails} key={highlights.section + '-' + index}>
                            { mobileView ? null :
                                <div className={styles.sectionTitle}>{highlights.section}</div>
                            }
                            <div className={styles.sectionInfo}>
                                <img className={styles.image} src={highlightsImage.get(highlights.imageCode)}/>                                
                                <div className={styles.sectionReading}>{highlights.reading} {highlights.unit}</div>
                            </div>
                        </div>)
                })}
            </div>
        </div>
    )
}

export default Highlights;