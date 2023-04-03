import React from 'react';
import styles from './SearchBar.module.scss';
//import cx from 'classnames';

const SearchBar: React.FC = () => {
    return (
        <div className={styles.searchbar}>
            <input placeholder='Enter a location...' 
                   className={styles.input} 
                   type="text" />
            <button className={styles.searchButton}>Search</button>
        </div>
    )
}

export default SearchBar;