import {useState, useEffect} from 'react';
import styles from './App.module.scss';
import DailyForecast from '../Forecast/Daily/DailyForecast';
import WeeklyForecast from '../Forecast/Weekly/WeeklyForecast';
import Highlights from '../Highlights/Highlights';

const App = () => {
  const [mobileView, setMobileView] = useState(false);
  //const [mobileWeeklyView, setMobileWeeklyView] = useState(false);
  const mql = window.matchMedia('(max-width: 875px)');
  //const mqlWeekly = window.matchMedia('(max-width: 550px)');

  useEffect(() => {
      setMobileView(mql.matches)
  },[mql.matches]);  
  // useEffect(() => {
  //   setMobileWeeklyView(mql.matches)
  // },[mqlWeekly.matches]); 

  mql.addEventListener('change', (e) => { setMobileView(mql.matches)  });
  //mqlWeekly.addEventListener('change', (e) => { setMobileView(mqlWeekly.matches)  });


  return (
    <div className={`${mobileView ? styles.smallAppContainer : styles.appContainer}`}>      
      <DailyForecast mobileView={mobileView}/>
      <Highlights mobileView={mobileView}/>
      <WeeklyForecast mobileView={mobileView}/>
    </div>
  );

}

export default App;