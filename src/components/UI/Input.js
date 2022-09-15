import React from "react";

function Input(props) {
  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={props.input.id}>
        {props.label}
      </label>
      <input
        className={`form-control ${props.error ? "is-invalid" : ""}`}
        {...props.input}
      />
      {props.error && (
        <div className="invalid-feedback">{props.errorMessage}</div>
      )}
    </div>
  );
}

export default Input;
