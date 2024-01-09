import { useState, useRef, useEffect } from 'react';
import { fetchGeoLocation } from '../../api/geolocation/geolocationApi';
import { fetchWeather } from '../../api/weather/weatherApi';
import { fetchReverseGeoLocation } from '../../api/geolocation/reverseGeolocationApi';
import styles from './SearchBar.module.scss';
import cx from 'classnames';
import { IGeoLocationResponseDTO } from '../../ts/interfaces/geolocation.interface';
import { IWeatherResponseDTO } from '../../ts/interfaces/weather.interface';

interface SearchBarProps {
    returnWeather: (weather: IWeatherResponseDTO) => void;
    returnLocation: (location: string) => void;
    showSpinner: (on: boolean) => void;
}

const SearchBar = ({ returnWeather, returnLocation, showSpinner }: SearchBarProps): JSX.Element => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [activeSearch, setActiveSearch] = useState<boolean>(false);
    const [geoLocation, setGeoLocation] = useState<IGeoLocationResponseDTO[]>([]);
    const [userLocationSearch, setUserLocationSearch] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [disableSearchButton, setHideSearchButton] = useState<boolean>(false);
    const [searchLocation, setSearchLocation] = useState<IGeoLocationResponseDTO>
        ({
            country: '',
            lat: 0,
            lon: 0,
            name: '',
            state: '',
            key: '',
        });
    const inputRef = useRef<HTMLInputElement>(null);

    //put the cursor in the search field
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        if (userLocationSearch) {
            getWeather(searchLocation);
            setUserLocationSearch(false);
        }
    }, [userLocationSearch]);

    //Get location from user's browser:
    const locationClick = () => {
        showSpinner(true);
        setHideSearchButton(true);
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }
    const successCallback = (position: any) => {
        getReverseGeoLocation(position.coords.latitude, position.coords.longitude);
    };
    const errorCallback = (error: any) => {
        setError('Could not retrieve your location. Check your location permissions.');
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        getGeoLocation(event.target.value);
    }

    const getWeather = async (location: IGeoLocationResponseDTO) => {
        if (searchLocation.key !== "") {
            try {
                const weather: IWeatherResponseDTO = await fetchWeather(location.lat, location.lon);
                if (Object.entries(weather).length > 0) {
                    returnWeather(weather);
                    returnLocation(searchTerm);
                }
            } catch (e) {
                setError(`Error getting weather. Please try again.`);
            }
        } else {
            setError('Choose a location from the list');
        }
        showSpinner(false);
        setHideSearchButton(false);
    }

    const getGeoLocation = async (searchTerm: string) => {
        setActiveSearch(true);
        try {
            const geoLocation: IGeoLocationResponseDTO[] = await fetchGeoLocation(searchTerm);
            if (geoLocation.length > 0) {
                const geoLocationWithKey = geoLocation.map(location => {
                    return {
                        ...location,
                        key: crypto.randomUUID(),
                    }
                })
                setGeoLocation(geoLocationWithKey);
            }
        } catch (e) {
            setError(`Error getting location. Please try again.`);
        }
    }

    const getReverseGeoLocation = async (lat: number, lon: number) => {
        try {
            const reverseGeoLocation: IGeoLocationResponseDTO[] = await fetchReverseGeoLocation(lat, lon);
            if (reverseGeoLocation.length > 0) {
                const reverseGeoLocationWithKey = reverseGeoLocation.map(location => {
                    return {
                        ...location,
                        key: crypto.randomUUID(),
                    }
                })
                selectPlace(reverseGeoLocationWithKey[0]);
                setUserLocationSearch(true);
            }
        } catch (e) {
            setError(`Error getting location. Please try again.`);
        }
    }

    const selectPlace = (location: IGeoLocationResponseDTO) => {
        const place: string = [location.name, location.state, location.country]
            .filter(element => Boolean(element)).join(', ');
        setSearchTerm(place);
        setError('');
        setSearchLocation(location);
        setGeoLocation([]); //clear out the list of values from geolocation API
        setActiveSearch(false);
    }

    const searchForWeather = () => {
        getWeather(searchLocation);
    }

    const clearSearchTerm = () => {
        inputRef.current?.focus();
        setSearchTerm('');
        setError('');
        setActiveSearch(false);
        setSearchLocation({
            country: '',
            lat: 0,
            lon: 0,
            name: '',
            state: '',
            key: '',
        });
    }

    return (
        <div className={styles.searchbar}>
            <div className={`${error ? cx(styles.searchError, styles.showError) : styles.searchError}`}>
                <div><i className="fa-solid fa-circle-exclamation"></i></div>
                <div>{error}</div>
            </div>
            <div className={styles.searchbarInput}>
                <div className={styles.test}>
                    <div className={styles.inputWrapper}>
                        <input placeholder='Enter a location...'
                            className={styles.input}
                            ref={inputRef}
                            type="text"
                            value={searchTerm}
                            onChange={handleChange}
                        />
                    </div>
                    <button title="Clear Search" className={`${searchTerm === '' ? cx(styles.clearInputButton, styles.hideInputButton) : styles.clearInputButton}`}
                        onClick={() => clearSearchTerm()}
                    >
                        <i className="fa-solid fa-x" />
                    </button>
                </div>
                <button title="Search for Weather"
                    disabled={disableSearchButton}
                    className={`${disableSearchButton ? cx(styles.searchButton, styles.hide) : styles.searchButton}`}
                    onClick={() => searchForWeather()}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>
            {
                <div className={`${searchTerm === '' || (searchTerm !== '' && !activeSearch) ? styles.userLocation : cx(styles.userLocation, styles.hide)}`}>
                    <button className={styles.location} id='location' onClick={() => locationClick()}>
                        <div>Detect User Location</div>
                    </button>
                </div>
            }
            {
                searchTerm === '' || geoLocation.length === 0 ? null :
                    <div className={styles.listContainer}>
                        {geoLocation.length === 0 && activeSearch ?
                            <div className={styles.searchError}>Could not find location. Try again.</div> : null
                        }
                        <li className={styles.locationList}>
                            {
                                geoLocation.length > 0 ?
                                    geoLocation.map((item: IGeoLocationResponseDTO) => {
                                        return (
                                            <button key={item.key}
                                                onClick={() => selectPlace(item)}>
                                                {item.name}, {item.state}, {item.country}
                                            </button>
                                        )
                                    }) : null
                            }
                        </li>
                    </div>
            }
        </div>
    )
}

export default SearchBar;