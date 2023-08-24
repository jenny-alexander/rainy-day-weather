import {useState, useEffect, CSSProperties} from 'react';
import styles from './App.module.scss';
import SearchBar from '../SearchBar/SearchBar';
import DailyForecast from '../Forecast/Daily/DailyForecast';
import WeeklyForecast from '../Forecast/Weekly/WeeklyForecast';
import Highlights from '../Highlights/Highlights';
import Switch from '../Common/Switch/Switch';
import Alert from '../Alert/Alert';
import { IWeatherResponseDTO } from '../../api/weather/weatherApi';
import { ScaleLoader } from 'react-spinners';

const App = (): JSX.Element => {
  const [mobileView, setMobileView] = useState(false);
  const mql = window.matchMedia('(max-width: 1025px)');
  const [weather, setWeather] = useState<IWeatherResponseDTO>();
  const [location, setLocation] = useState<string>('');
  const [alert, setAlert] = useState<boolean>(false);
  const [isToggled, setIsToggled] = useState<boolean>(true);
  const [theme, setTheme] = useState<string>('light');
  const [fontLoaded, setFontLoaded] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);  

  useEffect(() => {
      setMobileView(mql.matches)
  },[mql.matches]);

  useEffect(() => {
    document.fonts.ready.then(() => {
      setFontLoaded(true);
    })
  },[])

  mql.addEventListener('change', (e) => { setMobileView(mql.matches)  });

  const handleGetWeather = (weather: IWeatherResponseDTO): void => {
    setWeather(weather);
    console.log('weather is:', weather);
    if ( weather?.alerts && weather.alerts.length > 0) {
      setAlert(true);
    } else {
      setAlert(false);
    }
  }
  const handleGetLocation = (location: string): void => {
    setLocation(location);
  }

  const toggleMode = () => {    
    setIsToggled(!isToggled);
    const newTheme = theme === 'light' ? 'dark' : 'light';    
    setTheme(newTheme);
  }
  const alertClick = () => {    
    setShowModal(!showModal)
  }

  const locationClick = (on : boolean) => {    
    setIsLoading(on);
  }
  const override: CSSProperties = {
    display: "flex",
    margin: "0 auto",
    borderColor: "Grey",
  };

  if (!fontLoaded) {
    return(
      <></>
    )
  } else {
      return (
        <div className={styles.mainContainer} data-theme={theme}>
          <div className={styles.menuOptions}>
            <Switch title="Dark Theme Toggle" isToggled={isToggled} onToggle={toggleMode} />
            { alert ?  
              <button id='alerts' title="Alerts" className={styles.alerts} onClick={() => alertClick()}>
                <i className="fa-solid fa-triangle-exclamation"/>
              </button> 
              : null 
            }
          </div>
          { weather === undefined ? <div className={styles.centerAppContainer}></div> : null }
          <div className={`${mobileView ? styles.smallAppContainer : styles.appContainer}`}>
            <SearchBar 
                returnWeather={handleGetWeather}
                returnLocation={handleGetLocation}
                showSpinner={locationClick}
            />
            { isLoading ? 
                <div className={styles.sweetLoading}> 
                  <ScaleLoader
                    aria-label="Loading Spinner"
                    aria-live="polite"
                    aria-busy={isLoading}
                    cssOverride={override}
                    color='rgb(104, 117, 217'
                  />
                </div>
              : null }
            <div className={styles.titleContainer}>
              <div className={styles.appTitle}>Rainy Day Weather</div>
            </div>
              {
                weather !== undefined ?
                <>
                  <Alert show = {showModal}
                    weatherProp = {weather}
                    themeProp = {theme}
                    setShow={setShowModal}
                  /> 
                  <div className={styles.detailsContainer}>
                      <DailyForecast 
                        mobileView={mobileView}  
                        weatherProp={weather}
                        locationProp={location}     
                      /> 
                      <Highlights mobileView={mobileView} 
                                  weatherProp={weather}
                      />
                      <WeeklyForecast weatherProp={weather}/>
                  </div></> : 
                  <div className={styles.logoContainer}>
                    <img className={styles.logo} alt="Umbrella logo of app" src='/images/umbrella_yellow.png'></img>
                  </div>         
              }
          </div>
        </div>
      );
    }
}

export default App;