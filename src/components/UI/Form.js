import React from "react";
import classes from "./Form.module.css";
import Button from "./Button";

function Form(props) {
  return (
    <form className={classes.formStyle}>
      {props.children}
      <Button {...props.inputs} onClick={props.handleSubmit} />
    </form>
  );
}

export default Form;
