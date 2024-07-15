// Contants
import { RADIUS } from "../constants";

const Circle = ({cordinate}) => {
    return (
      <div
        style={{
          position: "absolute",
          width: RADIUS * 2 + 'px',
          height: RADIUS * 2 + 'px',
          top: cordinate.top,
          left: cordinate.left,
          borderRadius: "50%",
          backgroundColor: cordinate.backgroundColor
        }}
      >
      </div>
    )
  }
  export default Circle;