import {useState, useEffect} from 'react';
import { IGeoLocationResponseDTO, fetchGeoLocation } from '../../api/geolocation/geolocationApi';
import {IWeatherResponseDTO, fetchWeather } from '../../api/weather/weatherApi';
import styles from './SearchBar.module.scss';
import cx from 'classnames';
import { ForInitializer } from 'typescript';

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
    const[searchLocation, setSearchLocation] = useState<IGeoLocationResponseDTO>
        ({
            country: '',
            lat: 0,
            lon: 0,
            name: '',
            state: '',
            key: '',
        });
  
    // useEffect (() => {
    //     navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    // },[]);

    //TODO: Search for user's location when loading the app & show the weather at that location

    //Get location from user's browser:
    const successCallback = (position: any) => {
        console.log('Browser location is:', position);
        setUserLocation(position);
    };
  
    const errorCallback = (error: any) => {
        console.log('Error retrieving browser gelocation:', error);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);        
        getGeoLocation(event.target.value);
    }

    const getWeather = async(location: IGeoLocationResponseDTO) => {
        try {
            const weather: IWeatherResponseDTO  = await fetchWeather(location.lat, location.lon);
            if ( Object.entries(weather).length > 0 ) {
                console.log('weather from API is:', weather);
                setWeather(weather);
                console.log('*** about to call returnWeather from parent comp');
                returnWeather(weather);
                console.log('*** about to call returnLocation from parent comp');
                console.log('***search Term is:', searchTerm);
                returnLocation(searchTerm);
            }
        }catch (e){
            console.log('error getting weather:', e);
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
                console.log('...with key:', geoLocationWithKey)
                setGeoLocation(geoLocationWithKey);
            }
        }catch (e) {
            console.log('error fetching location:', e);
        } 

    }

    const selectPlace = (location: IGeoLocationResponseDTO) => {
        const place: string = [location.name, location.state, location.country]
            .filter(element => Boolean(element)).join(', ');       
        setSearchTerm(place);
        setSearchLocation(location);
        setGeoLocation([]); //clear out the list of values from geolocation API
        setActiveSearch(false);
    }

    const searchForWeather = () => {
        console.log('i will search for this location:', searchLocation);
        getWeather(searchLocation);
    }

    const clearSearchTerm = () => {
        setSearchTerm('');
        setActiveSearch(false);
    }

    return (
        <div className={styles.searchbar}>
            <div className={styles.searchbarInput}>
                <div className={styles.inputWrapper}>                    
                    <input placeholder='Enter a location...' 
                        className={styles.input} 
                        type="text"
                        value={searchTerm}
                        onChange={handleChange}                        
                    /> 
                </div>                
                <button className={`${searchTerm === '' ? cx(styles.hideInputButton) : styles.clearInputButton}`}
                    onClick={()=>clearSearchTerm()}
                >
                    <i className="fa-solid fa-x"/>
                </button>
                <button onClick={() => searchForWeather()} className={styles.searchButton}>Search</button>
            </div>
            { geoLocation.length === 0 && activeSearch ?
                <div className={styles.searchError}>Could not find location. Try again.</div> : null
            }
            {
                searchTerm === '' || geoLocation.length === 0 ? null :             
                    <div className={styles.listContainer}>
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