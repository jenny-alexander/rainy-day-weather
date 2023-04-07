import {useState, useEffect} from 'react';
import { IWeatherResponseDTO } from '../../api/weatherApi';
import { fetchGeoLocation } from '../../api/weatherApi';
import styles from './SearchBar.module.scss';

const SearchBar = (): JSX.Element => {
    const[searchTerm, setSearchTerm] = useState<string>('');
    const[location, setLocation] = useState<IWeatherResponseDTO[] | undefined>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value.trim());
    }
    const getGeoLocation = async(searchTerm: string) => {
        searchTerm = 'London';
        console.log('going to search for location...', searchTerm)
        // const geoLocation = await fetchGeoLocation(searchTerm);
        // setLocation(geoLocation);
        
        
        // console.log('location data is:', geoLocation);
        // if (!geoLocation) {
        //     throw new Error("Unexpected error: Missing name");
        // }
        
    }

    useEffect(() => {
        if (searchTerm === '') return;
        getGeoLocation(searchTerm);
      }, [searchTerm])

    return (
        <div className={styles.searchbar}>
            <input placeholder='Enter a location...' 
                   className={styles.input} 
                   type="text"
                   value={searchTerm}
                   onChange={handleChange}
                   />
                   
            <button className={styles.searchButton}>Search</button>
        </div>
    )
}

export default SearchBar;