import React from "react";
import "./arrow.css";

const NextArrow = (props) => {
  return (
    <div
      className={props.className}
      style={{ ...props.style, display: "block" }}
      onClick={props.onClick}
    >
      <img src="/right-arrow.png" alt="Next" />
    </div>
  );
};

export default NextArrow;
