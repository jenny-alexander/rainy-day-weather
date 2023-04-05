import {useState, useEffect} from 'react';
import styles from './App.module.scss';
import DailyForecast from '../Forecast/Daily/DailyForecast';
import WeeklyForecast from '../Forecast/Weekly/WeeklyForecast';
import Highlights from '../Highlights/Highlights';

const App = () => {
  const [mobileView, setMobileView] = useState(false);
  const mql = window.matchMedia('(max-width: 875px)');

  useEffect(() => {
      setMobileView(mql.matches)
  },[mql.matches]);  

  mql.addEventListener('change', (e) => { setMobileView(mql.matches)  });

  return (
    <div className={`${mobileView ? styles.smallAppContainer : styles.appContainer}`}>      
      <DailyForecast mobileView={mobileView}/>
      <Highlights mobileView={mobileView}/>
      <WeeklyForecast mobileView={mobileView}/>
    </div>
  );

}

export default App;