import {useState, useRef, useEffect} from 'react';
import { IGeoLocationResponseDTO, fetchGeoLocation } from '../../api/geolocation/geolocationApi';
import {IWeatherResponseDTO, fetchWeather } from '../../api/weather/weatherApi';
import styles from './SearchBar.module.scss';
import cx from 'classnames';

interface SearchBarProps {
    returnWeather: (weather: IWeatherResponseDTO) => void;
    returnLocation: (location: string) => void;
}

const SearchBar = ({returnWeather, returnLocation}: SearchBarProps): JSX.Element => {
    const[searchTerm, setSearchTerm] = useState<string>('');
    const[activeSearch, setActiveSearch] = useState<boolean>(false);
    const[userLocation, setUserLocation] = useState<GeolocationCoordinates>();
    const[geoLocation, setGeoLocation] = useState<IGeoLocationResponseDTO[]>([]);    
    const[weather, setWeather] = useState<IWeatherResponseDTO>();
    const[error, setError] = useState<string>("");
    const[searchLocation, setSearchLocation] = useState<IGeoLocationResponseDTO>
        ({
            country: '',
            lat: 0,
            lon: 0,
            name: '',
            state: '',
            key: '',
        });
    const inputRef = useRef<HTMLInputElement>(null);
  
    // useEffect (() => {
    //     navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    // },[]);

    //TODO: Search for user's location when loading the app & show the weather at that location
    useEffect (() => {
            inputRef.current?.focus();
    },[]);

    // //Get location from user's browser:
    // const successCallback = (position: any) => {        
    //     setUserLocation(position);
    // };
  
    // const errorCallback = (error: any) => {
    //     console.log('Error retrieving browser gelocation:', error);
    // };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);        
        getGeoLocation(event.target.value);
    }

    const getWeather = async(location: IGeoLocationResponseDTO) => {        
        if (searchLocation.key !== "") {            
            try {
                const weather: IWeatherResponseDTO  = await fetchWeather(location.lat, location.lon);
                if ( Object.entries(weather).length > 0 ) {               
                    setWeather(weather);                          
                    returnWeather(weather);                    
                    returnLocation(searchTerm);
                }
            }catch (e) {                
                setError(`Error getting weather. Please try again.`);
            }
        }else {
            setError('Choose a location from the list');
        }
    }

    const getGeoLocation = async(searchTerm: string) => {   
        setActiveSearch(true);
        try {
            const geoLocation: IGeoLocationResponseDTO[] = await fetchGeoLocation(searchTerm);
            if ( geoLocation.length > 0 ) {
                const geoLocationWithKey = geoLocation.map(location => {
                    return {
                        ...location,
                        key: crypto.randomUUID(),
                    }
                })                
                setGeoLocation(geoLocationWithKey);
            }
        }catch (e) {
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
            {/* <FontAwesomeIcon icon="fa-solid fa-location-dot" />         */}
            {/* <div className={`${mobileView ? styles.smallAppContainer : styles.appContainer}`}> */}
            {/* <div className={cx(styles.searchError)}> */}
            <div className={`${error ? cx(styles.searchError, styles.showError) : styles.searchError}`}>
                <div><i className="fa-solid fa-circle-exclamation"></i></div>
                <div>{error}</div>
            </div>
            <div className={styles.searchbarInput}>
                {/* <button className={styles.location}>
                    <i className="fa-solid fa-location-dot"></i>
                </button> */}
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
                    <button className={`${searchTerm === '' ? cx(styles.clearInputButton, styles.hideInputButton) : styles.clearInputButton}`}
                        onClick={()=>clearSearchTerm()}
                    >
                        <i className="fa-solid fa-x"/>
                    </button>
                </div>
                <button onClick={() => searchForWeather()} className={styles.searchButton}>Search</button>
            </div>
            {/* { geoLocation.length === 0 && activeSearch ?
                <div className={styles.searchError}>Could not find location. Try again.</div> : null
            } */}
            {
                searchTerm === '' || geoLocation.length === 0 ? null :             
                    <div className={styles.listContainer}>
                                    { geoLocation.length === 0 && activeSearch ?
                <div className={styles.searchError}>Could not find location. Try again.</div> : null
            }
                        <li className={styles.locationList}>
                            {
                                geoLocation.length > 0 ? 
                                    geoLocation.map((item: IGeoLocationResponseDTO)=> {
                                        return (
                                            <button key={item.key}
                                                onClick={()=> selectPlace(item)}>
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