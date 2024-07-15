import React, { useEffect, useRef, useState } from 'react';
import './App.css';
const MAX_LIMIT = 10;
const MIN_LIMIT = 0;

function App({defaultValue  = 0}) {
  const [counterValue, setCounterValue] = useState({value: defaultValue,flag: true});
  const timerId = useRef(null);
  const handleCouterStart = () => {
    timerId.current = setInterval(() => {
        setCounterValue(prev =>  {
          console.log(prev);
          if(prev.value + 1 === MAX_LIMIT && prev.flag) {
            return {value: prev.value + 1, flag: false}
          }
          if(prev.value - 1 === MIN_LIMIT - 1 && !prev.flag) {
            return {value: prev.value + 1,flag: true}
          }
          if(prev.value < MAX_LIMIT && prev.flag) {
            return {...prev, value: prev.value + 1};
          }else if(prev.value >= MIN_LIMIT && !prev.flag) {
            return {...prev, value: prev.value - 1};
          }
          else {
            return prev;
          }
        })
    }, 1000);
  }

  useEffect(() => {
    return () => {
      clearInterval(timerId.current);
    }
  },[])

  return (
    <div className="App">
      <p>{counterValue?.value}</p>
      <button onClick={handleCouterStart}>Start Counter</button>
    </div>
  );
}

export default App;
