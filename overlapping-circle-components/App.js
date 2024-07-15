import './App.css';
import { useEffect, useState } from 'react';

// Utils
import checkElementOverlap from './utils/checkElementOverlap';

// Constants
import { RADIUS, NORMAL_COLOR, OVERLAP_COLOR } from './constants.js';

// Components
import Circle from './components/circle';

function App() {
  const [circleCordinates, setCircleCordinates] = useState([]);
  useEffect(() => {
    const handleClickEvent = (e) => {
      let clientX = e.clientX;
      let clientY = e.clientY;
      let currCordinate = {
        top: clientY - RADIUS,
        left:  clientX - RADIUS,
        bottom: clientY + RADIUS,
        right: clientX + RADIUS,
        backgroundColor: NORMAL_COLOR
      }
      setCircleCordinates(prevState => {
        for(let prevCordinate of prevState) {
          if(checkElementOverlap(prevCordinate, currCordinate)) {
            currCordinate.backgroundColor = OVERLAP_COLOR;
            break;
          }
      }
        return [...prevState, currCordinate]
      })
    }
    window.document.addEventListener("click", handleClickEvent);
    return () => {
      window.document.removeEventListener("click",handleClickEvent);
    }
  },[])
  return (
    <div className="App" style={{width: "100vw", height: "100vh"}}>
      <div>
      {
        circleCordinates.map((cordinate,index) => <Circle key={index} cordinate={cordinate} />)
      }
      </div>
    </div>
  );
}

export default App;


// for dragiing can complete later
// import { useEffect, useRef, useState } from "react";
// import "./styles.css";

// const getRadius = (x1, x2, y1, y2) => {
//   const x = Math.abs(x2 - x1);
//   const y = Math.abs(y2 - y1);
//   const d = Math.pow(Math.pow(x, 2) + Math.pow(y, 2), 0.5);
//   return d;
// };

// export default function App() {
//   const centerCoords = useRef();
//   const [circles, setCircles] = useState(null);
//   const handleDragStart = (e) => {
//     // starting poing
//     const { x, y } = e;
//     centerCoords.current = {
//       x,
//       y
//     };
//     // document.addEventListener("mousemove", handleDragContinue);
//   };

//   // const handleDragContinue = (e) => {
//   //   console.log("is it moving...");
//   // };

//   const handleOverlappingCircles = () => {
//     // cic2, r1 r2
//   };

//   const handleDragEnd = (e) => {
//     console.log(e.which, "which mouse");
//     // ending coordinate
//     const { x, y } = e;
//     const { x: centerX, y: centerY } = centerCoords.current;
//     const r = getRadius(x, centerX, y, centerY);
//     const circleCoords = {
//       centerX,
//       centerY,
//       endX: x,
//       endY: y,
//       r,
//       top: centerY - r,
//       left: centerX - r,
//       right: centerX + r,
//       bottom: centerY + r
//     };
//     console.log(circleCoords);
//     setCircles(circleCoords);
//     // document.removeEventListener("mousemove", handleDragContinue);
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleDragStart);
//     document.addEventListener("mouseup", handleDragEnd);
//   }, []);

//   return (
//     circles && (
//       <div
//         style={{
//           border: "1px solid black",
//           position: "absolute",
//           borderRadius: "50%",
//           top: `${circles.top}px`,
//           left: `${circles.left}px`,
//           // bottom: `${circles.bottom}px`,
//           // right: `${circles.right}px`
//           width: `${2 * circles.r}px`,
//           height: `${2 * circles.r}px`
//         }}
//       ></div>
//     )
//   );
// }

