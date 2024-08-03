import React from "react";
import "./color.css";

const Color = (props) => {
  const { setColor, id, color } = props;

  return (
    <>
      <ul className="colors ps-0 d-flex">
        <li
          onClick={() => setColor(id)}
          className="cursor-pointer"
          style={{ backgroundColor: props?.color ? props?.color : "black" }}
        ></li>
      </ul>
    </>
  );
};

export default Color;
