import {useEffect, useState} from 'react';
import styles from './Highlights.module.scss';
import { IWeatherResponseDTO } from '../../api/weather/weatherApi';
import { highlightsImage } from '../../utils/constants/images';

type DailyHighlightsProps = {
    mobileView: boolean;
    weatherProp: IWeatherResponseDTO;
}

interface highlightsWeather {
    minTemp: string,
    maxTemp: string,
    humidity: string,
    wind: string,
    rain: string,
    uv: string,
    airQuality: string,
}

const Highlights = ({mobileView, weatherProp}: DailyHighlightsProps): JSX.Element => {
    const [wind, setWind] = useState<string>('');
    const [uv, setUv] = useState<string>('');
    const [maxTemp, setMaxTemp] = useState<string>('');
    const [minTemp, setMinTemp] = useState<string>('');
    const [rain, setRain] = useState<string>('');
    const [humidity, setHumidity] = useState<string>('');
    const [airQuality, setAirQuality] = useState<string>('2');

    interface IHighlights {
        section: string;
        imageCode: number;
        reading: string| undefined;
        unit: string,      
    }

    useEffect(() => {                
        if (weatherProp.daily[0].wind_speed !== undefined) {
            setWind(Math.round(weatherProp.daily[0].wind_speed).toString());            
        }
        if (weatherProp.daily[0].uvi !== undefined) {
            setUv(Math.round(weatherProp.daily[0].uvi).toString())
        }
        if (weatherProp.daily[0].humidity !== undefined) {
            setHumidity(Math.round(weatherProp.daily[0].humidity).toString())
        }
        if (weatherProp.daily[0].pop !== undefined) {
            setRain(Math.round(weatherProp.daily[0].pop * 100).toString())
        }
        //TODO: Get air quality
        // if (weatherProp.daily[0].wind !== undefined) {
        //     setUv(Math.round(weatherProp.daily[0].uvi).toString())
        // }
        if (weatherProp.daily[0].temp.max !== undefined) {
            setMaxTemp(Math.round(weatherProp.daily[0].temp.max).toString())
        }
        if (weatherProp.daily[0].temp.min !== undefined) {
            setMinTemp(Math.round(weatherProp.daily[0].temp.min).toString())
        }    
    },[weatherProp])

    const highlights: IHighlights[] = [    
        {section: 'temperature', imageCode: 1, reading: maxTemp + ' / ' + minTemp, unit: 'F°'},
        {section: 'wind', imageCode: 2, reading: wind, unit: 'mi/h'},
        {section: 'rain', imageCode: 3, reading: rain, unit: '%'},
        {section: 'humidity', imageCode: 4, reading: humidity, unit: '%'},
        {section: 'air quality', imageCode: 5, reading: airQuality, unit: 'AQI'},
        {section: 'uv', imageCode: 6, reading: uv, unit: 'UV'}
    ];

    return (
        <div className={`${mobileView ? styles.mobileHighlights : styles.highlights}`}>
            <div className={styles.highlightsTitle}>Today's Forecast</div>
            <div className={styles.highlightsDetails}>                
            {highlights.map((highlights, index: number) => {
                    return (
                        <div className={styles.sectionDetails} key={highlights.section + '-' + index}>
                            { mobileView ? null :
                                <div className={styles.sectionTitle}>{highlights.section}</div>
                            }
                            <div className={styles.sectionInfo}>
                                <img className={styles.image} src={highlightsImage.get(highlights.imageCode)}/>                                
                                <div className={styles.sectionReading}>
                                    {highlights.reading !== undefined ? highlights.reading : ''
                                    } {highlights.unit}
                                </div>
                            </div>
                        </div>)
                })}
            </div>
        </div>
    )
}

export default Highlights;