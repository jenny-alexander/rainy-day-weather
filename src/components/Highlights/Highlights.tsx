import { useEffect, useState } from 'react';
import styles from './Highlights.module.scss';
import { IWeatherResponseDTO } from '../../api/weather/weatherApi';
import { highlightsImage } from '../../utils/constants/images';

type DailyHighlightsProps = {
    mobileView: boolean;
    weatherProp: IWeatherResponseDTO;
}

const Highlights = ({ mobileView, weatherProp }: DailyHighlightsProps): JSX.Element => {
    const [wind, setWind] = useState<string>('');
    const [uv, setUv] = useState<string>('');
    const [maxTemp, setMaxTemp] = useState<string>('');
    const [minTemp, setMinTemp] = useState<string>('');
    const [rain, setRain] = useState<string>('');
    const [humidity, setHumidity] = useState<string>('');
    const [clouds, setClouds] = useState<string>('');

    interface IHighlights {
        section: string;
        imageCode: number;
        reading: string | undefined;
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
        if (weatherProp.daily[0].clouds !== undefined) {
            setClouds(Math.round(weatherProp.daily[0].clouds).toString())
        }
        if (weatherProp.daily[0].temp.max !== undefined) {
            setMaxTemp(Math.round(weatherProp.daily[0].temp.max).toString())
        }
        if (weatherProp.daily[0].temp.min !== undefined) {
            setMinTemp(Math.round(weatherProp.daily[0].temp.min).toString())
        }
    }, [weatherProp])

    const highlights: IHighlights[] = [
        { section: 'temperature', imageCode: 1, reading: maxTemp + ' / ' + minTemp, unit: 'F°' },
        { section: 'wind', imageCode: 2, reading: wind, unit: 'mi/h' },
        { section: 'PoP', imageCode: 3, reading: rain, unit: '%' },
        { section: 'humidity', imageCode: 4, reading: humidity, unit: '%' },
        { section: 'cloud cover', imageCode: 5, reading: clouds, unit: '%' },
        { section: 'uv', imageCode: 6, reading: uv, unit: 'UV' },
    ];

    return (
        <div className={`${mobileView ? styles.mobileHighlights : styles.highlights}`}>
            <div className={styles.highlightsTitle}>Today's Highlights</div>
            <div className={styles.highlightsDetails}>
                {highlights.map((highlights, index: number) => {
                    return (
                        <div className={styles.sectionDetails} key={highlights.section + '-' + index}>
                            {mobileView ? null :
                                <div className={styles.sectionTitle}>{highlights.section}</div>
                            }
                            <div className={styles.sectionInfo}>
                                <img alt="weather highlight icon" className={styles.image} src={highlightsImage.get(highlights.imageCode)} />
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