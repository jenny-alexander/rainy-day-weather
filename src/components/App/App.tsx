import React, {useState, useEffect} from 'react';
import styles from './App.module.scss';
import DailyForecast from '../Forecast/Daily/DailyForecast';
import WeeklyForecast from '../Forecast/Weekly/WeeklyForecast';
import Highlights from '../Highlights/Highlights';
import MobileDailyForecast from '../Forecast/Daily/MobileDailyForecast';
import SearchBar from '../SearchBar/SearchBar';
// import MobileWeeklyForecast from '../Forecast/Weekly/Mobile/MobileWeeklyForecast';
import MobileHighlights from '../Highlights/MobileHighlights';
//import cx from 'classnames';


const App: React.FC = () => {
  const [mobileView, setMobileView] = useState(false);
  const mql = window.matchMedia('(max-width: 875px)');

  useEffect(() => {
      setMobileView(mql.matches)
  },[mql.matches]);  

  mql.addEventListener('change', (e) => { setMobileView(mql.matches)  });

  if (mobileView) {
    return (
      <div className={styles.smallAppContainer}>     
       <SearchBar/> 
        <MobileDailyForecast />
         <MobileHighlights />
       {/* <MobileWeeklyForecast /> */}
      </div>
    )
  } else {
    return (
      <div className={styles.appContainer}>      
        <DailyForecast />
        <Highlights />
        <WeeklyForecast />
      </div>
    );
  }

  // return (
  //   <div className={styles.appContainer}>      
  //     <DailyForecast />
  //     <Highlights />
  //     <WeeklyForecast />
  //   </div>
  // );
}

export default App;