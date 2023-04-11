import {useState} from 'react';
import { IGeoLocationResponseDTO, fetchGeoLocation } from '../../api/weatherApi';
import styles from './SearchBar.module.scss';
import cx from 'classnames';

const SearchBar = (): JSX.Element => {
    const[searchTerm, setSearchTerm] = useState<string>('');
    const[activeSearch, setActiveSearch] = useState<boolean>(false);
    const[geoLocation, setGeoLocation] = useState<IGeoLocationResponseDTO[]>([]);
    const[searchLocation, setSearchLocation] = useState<IGeoLocationResponseDTO>
        ({
            country: '',
            lat: 0,
            lon: 0,
            name: '',
            state: '',
            key: '',
        });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);        
        getGeoLocation(event.target.value);
    }
    const getGeoLocation = async(searchTerm: string) => {   
        setActiveSearch(true);     
        const geoLocation: IGeoLocationResponseDTO[] = await fetchGeoLocation(searchTerm);
        if ( geoLocation.length > 0 ) {
            const geoLocationsWithKey = geoLocation.map(location => {
                return {
                    ...location,
                    key: crypto.randomUUID(),
                }
            })
            console.log('...with key:', geoLocationsWithKey)
            setGeoLocation(geoLocationsWithKey);
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