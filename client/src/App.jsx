import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { useState } from 'react';
import NavBar from './components/NavBar';
import Database from './pages/Database';
import ChartCreator from './pages/ChartCreator';
import './App.css'

Chart.register(CategoryScale);

export default function App() {
  const [navbarState, setNavbarState] = useState('chart');

  const updateNavbarState = (newState) => {
    setNavbarState(newState);
  }

  return (
    <div className='app'>
      <NavBar updateAppState={updateNavbarState}/>
      {navbarState === 'chart'
        ? (
          <ChartCreator />
        )
        : (
          <Database />
        )
      }
    </div>
  );
}