import React, { useEffect, useState, useRef } from 'react';
import {progressBarTime, progressBarLength, progressBarStepSize, totalSteps}  from '../constants';

const ProgressBar = ({barId, handleDone, status}) => {
    const [value, setValue] = useState(0);
    const timerId = useRef(null);

    useEffect(() => {
        if(status === "inprogress") {
            timerId.current = setInterval(() => {
                setValue((prevValue) => {
                    prevValue += progressBarStepSize;
                    let newValue = (prevValue*100)/totalSteps;
                    if(prevValue > totalSteps) {
                        clearInterval(timerId);
                        handleDone(barId)
                    } 
                    return newValue;
                })
            }, progressBarTime)
        }
        return () => {
            clearInterval(timerId.current);
        }
    },[status])

    useEffect(() => {
        if(status === "paused") {
            clearInterval(timerId.current);
            timerId.current = null;
        }
    },[status])

    return (
        <div style={{width: `${progressBarLength}px`, height: "20px",border: "1px solid black", marginBottom: "5px", overflow: "hidden"}}>
            <div style={{transform: `scaleX(${value / 100})`, height: "20px", backgroundColor: "green", transformOrigin: "left", width: "inherit" }}>         
            </div>
        </div>
    )
}

function ProgressBarWrapper({progressBarTime, progressBarLength, progressBarStepSize}) {
    const [progressBarData, setProgressBarData] = React.useState([]);
    const [isRunning, setIsRunning] = React.useState(false);

    const shouldProgressBarRun = (data) => {
        let count = 0;
        for(let item of data) {
            if(item?.state === "inprogress") {
                count = count + 1;
            }
        }
        return count < 3 
    }

    const handleAddProgressBar = () => {
        setProgressBarData((prevData) => {
            let newData = [...prevData];
            if(shouldProgressBarRun(newData)) {
                setIsRunning(true);
                newData.push({"state": "inprogress",id: newData?.length});
            }else {
                newData.push({"state": "pending",id: newData?.length});
            }
            return newData;
        })
    }

    const handleProgressBarDone = (id) => {
        progressBarData.forEach((item, index) => {
            if(item?.id === id && item?.state === "inprogress" ) {
                setProgressBarData((prevData => {
                    let newData = [...prevData];
                    newData[index] = {...newData[index], state: "completed"};
                    let item = newData.find((item) => item.state === "pending");
                    let isAllCompleted = newData.every((item) => item.state === "completed");
                    if(item) {
                        newData[item?.id] =  {...newData[index], state: "inprogress"}
                    }else if(isAllCompleted) {
                        setIsRunning(() => false);
                    }
                    return newData;
                }))
            }
        }) 
    }

    const handleReset = () => {
        setProgressBarData([]);
    }

    const handleRunningState = () => {
        let itemPaused = progressBarData.find((item) => item.state === "paused");
        if(isRunning) {
            setIsRunning(false);
            setProgressBarData((prevData => {
                let newData = [...prevData];
                return newData.map((item) =>  item.state === "inprogress" ? {...item, state: "paused"} : item)
            }))
        }else if(itemPaused) {
            setIsRunning(true);
            setProgressBarData((prevData => {
                let newData = [...prevData];
                return newData.map((item) =>  item.state === "paused" ? {...item, state: "inprogress"} : item)
            }))
        }
    }

  return (
    <div>
        <button onClick={handleAddProgressBar}> Add New Progess Bar</button>
        <button onClick={handleRunningState}>{isRunning ? "Pause" : "Start"}</button>
        <button onClick={handleReset}> Reset</button>
        {progressBarData?.map((data, index) => (data?.state === "inprogress" || data?.state === "completed" || data?.state === "paused") && <ProgressBar key={index} barId={data.id} handleDone={handleProgressBarDone} status={data?.state}/>)}
    </div>
  );
}

export default ProgressBarWrapper;