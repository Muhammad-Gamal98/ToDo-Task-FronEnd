import React from "react";
import classes from "./Form.module.css";
import Button from "./Button";
import LoadingSpinner from "./LoadingSpinner";
import { Link } from "react-router-dom";

function Form(props) {
  return (
    <form className={classes.formStyle}>
      {props.children}
      {props.inputs &&
        (props.passReset ? (
          <Link to="/login">
            <Button {...props.inputs} onClick={props.handleSubmit} />
          </Link>
        ) : (
          <Button {...props.inputs} onClick={props.handleSubmit} />
        ))}
      {props.isLoading && <LoadingSpinner />}
    </form>
  );
}

export default Form;
