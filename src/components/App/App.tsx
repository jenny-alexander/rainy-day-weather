import {useState, useEffect} from 'react';
import styles from './App.module.scss';
import SearchBar from '../SearchBar/SearchBar';
import DailyForecast from '../Forecast/Daily/DailyForecast';
import WeeklyForecast from '../Forecast/Weekly/WeeklyForecast';
import Highlights from '../Highlights/Highlights';
import { IWeatherResponseDTO } from '../../api/weather/weatherApi';

const App = (): JSX.Element => {
  const [mobileView, setMobileView] = useState(false);
  const mql = window.matchMedia('(max-width: 1025px)');
  const [weather, setWeather] = useState<IWeatherResponseDTO>();
  const [location, setLocation] = useState<string>('');

  useEffect(() => {
      setMobileView(mql.matches)
  },[mql.matches]);  

  mql.addEventListener('change', (e) => { setMobileView(mql.matches)  });

  const handleGetWeather = (weather: IWeatherResponseDTO): void => {
    setWeather(weather);
  }
  const handleGetLocation = (location: string): void => {
    setLocation(location);
  }

  return (
    <>
    {/* <div className={styles.titleContainer}>
      <div className={styles.appTitle}>Mauzy Day Weather</div>
      <img alt-text="Image of today's weather" className={styles.dailyImage} 
                                  src='/images/sailboat.png'/>
    </div> */}
    
    <div className={`${mobileView ? styles.smallAppContainer : styles.appContainer}`}> 
    <div className={styles.titleContainer}>
      <div className={styles.appTitle}>Mauzy Day Weather</div>
      <img alt-text="Image of today's weather" className={styles.dailyImage} 
                                  src='/images/sailboat.png'/>
    </div>
      <SearchBar 
        returnWeather={handleGetWeather}
        returnLocation={handleGetLocation}
      />
      {
        weather !== undefined ?
          <>
            <DailyForecast 
              mobileView={mobileView}  
              weatherProp={weather}
              locationProp={location}     
            /> 
            <Highlights mobileView={mobileView} 
                        weatherProp={weather}
            />
            <WeeklyForecast mobileView={mobileView}
                            weatherProp={weather}/> 
          </>: null
      }


    </div>    
    </>
  );

}

export default App;