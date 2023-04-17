import {useState, useEffect} from 'react';
import styles from './App.module.scss';
import SearchBar from '../SearchBar/SearchBar';
import DailyForecast from '../Forecast/Daily/DailyForecast';
import WeeklyForecast from '../Forecast/Weekly/WeeklyForecast';
import Highlights from '../Highlights/Highlights';
import Switch from '../Common/Switch/Switch';
import { IWeatherResponseDTO } from '../../api/weather/weatherApi';

const App = (): JSX.Element => {
  const [mobileView, setMobileView] = useState(false);
  const mql = window.matchMedia('(max-width: 1025px)');
  const [weather, setWeather] = useState<IWeatherResponseDTO>();
  const [location, setLocation] = useState<string>('');
  const [alert, setAlert] = useState<boolean>(false);
  const [isToggled, setIsToggled] = useState<boolean>(false);

  useEffect(() => {
      setMobileView(mql.matches)
  },[mql.matches]);  

  mql.addEventListener('change', (e) => { setMobileView(mql.matches)  });

  const handleGetWeather = (weather: IWeatherResponseDTO): void => {
    setWeather(weather);
    if ( weather?.alerts && weather.alerts.length > 0) {
      setAlert(true);
    }
  }
  const handleGetLocation = (location: string): void => {
    setLocation(location);
  }

  return (
    <>
      <div className={`${mobileView ? 
          styles.smallAppContainer : styles.appContainer}`}>
      <div className={styles.menuOptions}>
        <Switch isToggled={isToggled} onToggle={()=> setIsToggled(!isToggled)} />
        { alert ?  
          <button className={styles.alerts}>
            <i className="fa-solid fa-triangle-exclamation"/>
          </button> 
          : null 
        }
        </div>
        <SearchBar 
            returnWeather={handleGetWeather}
            returnLocation={handleGetLocation}
          />
        <div className={styles.titleContainer}>
          <div className={styles.appTitle}>Rainy Day Weather</div>
        </div>
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
                <WeeklyForecast weatherProp={weather}/> 
              </> : 
              <div className={styles.logoContainer}>
                <img className={styles.logo} src='/images/umbrella.png'></img>
              </div>
          }

      </div>
    </>
  );

}

export default App;