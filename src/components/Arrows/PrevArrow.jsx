import React from "react";
import "./arrow.css";

const PrevArrow = (props) => {
  return (
    <div
      className={props.className}
      style={{ ...props.style, display: "block" }}
      onClick={props.onClick}
    >
      <img src="/left-arrow.png" alt="Prev" />
    </div>
  );
};

export default PrevArrow;
