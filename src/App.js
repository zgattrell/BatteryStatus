import logo from './logo.svg';
import './App.css';
import {React, useState} from 'react';

function App() {
  const [powerLevel, setPowerLevel] = useState(0);
  const [powerStatus, setPowerStatus] = useState('high');
  const [charging, setCharging] = useState('true');

  const batteryLevel = navigator.getBattery().then((result) => {
    setPowerLevel(Math.ceil(result.level * 100));
    let powerStat = 'high';
    if(powerLevel < 80 && powerLevel > 20) powerStat = 'med';
    if(powerLevel < 20) powerStat = 'low';
    setPowerStatus(powerStat);
    setCharging(result.charging);
    result.onchargingchange = () => {
      setCharging(!charging);
    };
  });

  let batteryLvlClass = 'battery-level ' + powerStatus;
  let batIcon = <img className="batIcon" src="https://cdn4.iconfinder.com/data/icons/nature-2-10/32/155-512.png" width="80px" />;
  if(!charging) batIcon = '';

  return (
    <div className="App">
      <div className="battery">
        <div className={batteryLvlClass} style={{width: powerLevel + '%'}}>
        </div>
      </div>
      {batIcon}
    </div>
  );
}

export default App;
