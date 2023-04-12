import {useState, useEffect} from 'react';
import styles from './App.module.scss';
import SearchBar from '../SearchBar/SearchBar';
import DailyForecast from '../Forecast/Daily/DailyForecast';
import WeeklyForecast from '../Forecast/Weekly/WeeklyForecast';
import Highlights from '../Highlights/Highlights';
import { IWeatherResponseDTO } from '../../api/weather/weatherApi';


const App = (): JSX.Element => {
  const [mobileView, setMobileView] = useState(false);
  const mql = window.matchMedia('(max-width: 905px)');
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
    <div className={`${mobileView ? styles.smallAppContainer : styles.appContainer}`}>   
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
  );

}

export default App;