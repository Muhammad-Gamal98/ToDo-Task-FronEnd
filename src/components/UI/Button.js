import React from "react";

function Button({ title, buttonStyle, type, onClick }) {
  return (
    <button className={`btn ${buttonStyle}`} type={type} onClick={onClick}>
      {title}
    </button>
  );
}

export default Button;
