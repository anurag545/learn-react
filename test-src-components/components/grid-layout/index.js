import React, { useEffect, useRef, useState } from 'react';
// import './App.css';

function GridLayout({mappingArray, delay}) {
    const [selectedIndex, setSelectedIndex] = useState({});
    const totalBoxLength = mappingArray.flat(1).filter((item) => item === 1).length;
    const handleBoxClick = (rowIndex, colIndex) => {
        let clickedKey = rowIndex + "," + colIndex;
        if(selectedIndex[clickedKey]) {
            return;
        }else {
            setSelectedIndex((prevObject) => {
                let newObject = {...prevObject};
                newObject[clickedKey] = true;
                return newObject;
            });
            if (Object.keys(selectedIndex).length + 1 === totalBoxLength) {
                let timerId = window.setInterval(() => {
                    setSelectedIndex((prevObject) => {
                        let newObject = { ...prevObject };
                        if (Object.keys(newObject).length === 0) {
                            window.clearInterval(timerId);
                        } else {
                            delete newObject[Object.keys(newObject)[Object.keys(newObject).length - 1]];
                        }
                        return newObject;
                    });
                }, delay);
            }

        }
    }

  return (
    <div className="App">
        {
            mappingArray.map((rowArray, rowIndex) => {
                return rowArray.map((column, colIndex) => {
                    if(!column) {
                       return <div style={{width: "200px", height: "200px"}}></div>
                    }else {
                        return <div key={rowIndex + colIndex} style={{width: "200px", height: "200px", border: column ? "1px solid grey" : "", margin: "10px", backgroundColor: selectedIndex[rowIndex + "," + colIndex] ? "red": "blue"}} onClick={() => handleBoxClick(rowIndex, colIndex)}>
                        </div>
                    }
                })
            })
        }
    </div>
  );
}

export default GridLayout;
