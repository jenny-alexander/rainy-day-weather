import React from 'react';
import styles from './App.module.scss';
//import SearchBar from '../Common/SearchBar/SearchBar';
import DailyForecast from '../Forecast/Daily/DailyForecast';
import WeeklyForecast from '../Forecast/Weekly/WeeklyForecast';
//import WeeklyForecast from '../Forecast/Weekly/WeeklyForecast';
import Highlights from '../Highlights/Highlights';
//import cx from 'classnames';


const App: React.FC = () => {

  // let name: string = 'Jen';
  // let age: number | string; //example of a union type where the age can be either a string or a number
  // let isStudent: true;
  // let hobbies: string [];
  // let role:[number, string]; //tuple containing one number and one string
  
  // //Object...start with a Type
  // type Person = {
  //   name: string,
  //   age?: number, //adding ? makes it optional
  // }
  // let person: Person = {
  //   name: 'Jennifer',
  //   age: 43,
  // }
  // console.log(person)
  // //array of persons
  // //let lotsOfPeople: Person[];

  return (
    <div className={styles.appContainer}>
      Hello Jennifer
      <DailyForecast />
      <Highlights />
      <WeeklyForecast />
    </div>
  );
}

export default App;
