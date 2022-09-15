import React from "react";
import classes from "./Centered.module.css";

function Centered(props) {
  return (
    <div className="container">
      <div className={`row justify-content-center ${classes.vCentered}`}>
        <div className={`col-${props.width}`}>{props.children}</div>
      </div>
    </div>
  );
}

export default Centered;
