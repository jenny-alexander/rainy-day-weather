import styles from './SearchBar.module.scss';

const SearchBar = () => {
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