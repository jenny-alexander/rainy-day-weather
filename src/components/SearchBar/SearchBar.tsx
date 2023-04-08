import {useState, useEffect} from 'react';
import { IWeatherResponseDTO, fetchGeoLocation } from '../../api/weatherApi';
import styles from './SearchBar.module.scss';

const SearchBar = (): JSX.Element => {
    const[searchTerm, setSearchTerm] = useState<string>('');
    //const[location, setLocation] = useState<IWeatherResponseDTO[] | undefined >([]);
    const[location, setLocation] = useState<IWeatherResponseDTO[]>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value.trim());
    }
    const getGeoLocation = async(searchTerm: string) => {
        // searchTerm = 'London';
        console.log('going to search for location...', searchTerm)
        const geoLocation: IWeatherResponseDTO[] = await fetchGeoLocation(searchTerm);
        setLocation(geoLocation);
    }

    useEffect(() => {
        if (searchTerm === '') return;
        getGeoLocation(searchTerm);
      }, [searchTerm])

    return (
        <div className={styles.searchbar}>
            <div className={styles.searchbarInput}>
                <input placeholder='Enter a location...' 
                    className={styles.input} 
                    type="text"
                    value={searchTerm}
                    onChange={handleChange}
                />
                {/* <div className={styles.listWrapper}></div> */}

                <button className={styles.searchButton}>Search</button>


            </div>
            <div className={styles.listContainer}>
                <li className={styles.locationList}>
                    {
                        location.length > 0 ? 
                            location.map((item: IWeatherResponseDTO)=> {
                                return (<button>{item.name},{item.state},{item.country}</button>)
                            }) : null
                    }
                </li> 
            </div>


        </div>
    )
}

export default SearchBar;