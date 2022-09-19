import React from "react";

function Button(props) {
  return (
    <button
      className={`btn ${props.buttonStyle}`}
      type={props.type}
      onClick={props.onClick}
    >
      {props.title}
    </button>
  );
}

export default Button;
