// import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import GridLayout from './components/grid-layout';

function App() {
  // we can later create a function that we can pass for creating the mappingArray based on our req
  const mappingArray = [
    [1,1,1],
    [1,1,1],
    [1,1,1]
  ]
  return (
    <div className="App">
        <GridLayout mappingArray={mappingArray} delay={1000} /> 
    </div>
  );
}

export default App;
