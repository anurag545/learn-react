import logo from './logo.svg';
import './App.css';
import React from 'react';

function App() {
  const [timerValue, setTimerValue] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);
  let timerId = React.useRef(null);
  let lastTickTiming = React.useRef();

  const format = (value) => {
    const milliSeconds = Math.floor(value % 1000);
    const seconds = Math.floor((value /(1000)) % 60);
    const minutes = Math.floor((value /(1000 *60)) % 60);
    const hours = Math.floor((value /(1000 *60*60)) % 24);
    return `${hours}:${minutes}:${seconds}:${milliSeconds}`;
  }

  const handleButtonClick = () => {
    setIsRunning(!isRunning)
    clearInterval(timerId.current)
    // this is bad way because, setInterval might take time to run the so information might be incorrect
    // if(!isRunning) {
    //   timerId.current = setInterval(() => {
    //     setTimerValue(prevState => prevState + 10);
    //   },10);
    // }
    if(!isRunning) {
      lastTickTiming.current = Date.now();
      timerId.current = setInterval(() => {
          const now = Date.now();
          const timePassed = now - lastTickTiming.current;
          setTimerValue(
            (duration) =>
              // Use the callback form of setState to ensure
              // we are using the latest value of duration.
              duration + timePassed,
          );
          lastTickTiming.current = now;
        }, 1)
    }
  };

  const handleResetClick = () => {
    setIsRunning(false);
    setTimerValue(0);
    clearInterval(timerId.current);
  }

  return (
    <div className="App" style={{ marginTop: "50px" }}>
      <button onClick={() => handleButtonClick()}>Start/Stop</button>
      <button onClick={() => handleResetClick()}>Reset</button>
        {format(timerValue)}
    </div>
  );
}

export default App;
