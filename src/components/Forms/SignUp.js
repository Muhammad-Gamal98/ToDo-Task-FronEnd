import React, { useState } from "react";
import { Link } from "react-router-dom";
import useInput from "../../hooks/useInput";
import Centered from "../layouts/Centered";
import { validateEmail } from "../../utils/regularExpression.js";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Form from "../UI/Form";
import Input from "../UI/Input";
import Alert from "../UI/Alert";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useDispatch } from "react-redux";
import { signupAction } from "../../store/Action/loginAction";

const validateEmailInput = (value) => validateEmail(value);
const validatePasswordInput = (value) => value.trim().length >= 5;

const SignUp = () => {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    inputValue: nameValue,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    isInputValid: isNameValid,
    inputHasError: nameHasError,
    reset: nameReset,
  } = useInput((val) => val.trim() !== "");
  const {
    inputValue: emailValue,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlureHandler,
    isInputValid: isEmailValid,
    inputHasError: emailHasError,
    reset: emailReset,
  } = useInput(validateEmailInput);
  const {
    inputValue: passwordValue,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlureHandler,
    isInputValid: passwordValid,
    inputHasError: passwordHasError,
    reset: passwordReset,
  } = useInput(validatePasswordInput);
  const {
    inputValue: passwordConfirmValue,
    inputChangeHandler: passwordConfirmChangeHandler,
    inputBlurHandler: passwordConfirmBlureHandler,
    isInputValid: passwordConfirmValid,
    inputHasError: passwordConfirmHasError,
    reset: passwordConfirmReset,
  } = useInput((val) => {
    return val === passwordValue;
  });
  let formIsValied = false;
  if (isNameValid && isEmailValid && passwordValid && passwordConfirmValid) {
    formIsValied = true;
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);
    setMessage(null);

    setIsLoading(true);
    if (!formIsValied) {
      setErrorMessage("Invalied Inputs");
      setIsLoading(false);
      return;
    }
    try {
      const res = await signupAction(
        nameValue,
        emailValue,
        passwordValue,
        passwordConfirmValue
      );
      setIsLoading(false);
      nameReset();
      emailReset();
      passwordReset();
      passwordConfirmReset();
      setMessage(
        "You are register successfully, please verifiy your account via E-mail."
      );
    } catch (error) {
      setIsLoading(false);
      if (error.response.data.message.includes("Duplicate")) {
        setErrorMessage("This Email already exist");
      } else {
        setErrorMessage("Error while registering");
      }
      console.log(error);
    }
  };

  const buttonProps = {
    type: "submit",
    title: "submit",
    buttonStyle: "btn-primary",
  };

  return (
    <>
      <Centered width="6">
        <Card title="SignUp">
          <Form inputs={buttonProps} handleSubmit={handleSubmit}>
            <Input
              label="Name"
              error={nameHasError}
              errorMessage="Name is not valid"
              input={{
                required: true,
                type: "text",
                id: "name",
                name: "name",
                value: nameValue,
                onChange: nameChangeHandler,
                onBlur: nameBlurHandler,
              }}
            />
            <Input
              label="Email"
              error={emailHasError}
              errorMessage="Email is not valid"
              input={{
                required: true,
                type: "email",
                id: "email",
                name: "email",
                value: emailValue,
                onChange: emailChangeHandler,
                onBlur: emailBlureHandler,
              }}
            />
            <Input
              label="Password"
              error={passwordHasError}
              errorMessage="Password less than 5 character"
              input={{
                required: true,
                type: "password",
                id: "password",
                name: "password",
                value: passwordValue,
                onChange: passwordChangeHandler,
                onBlur: passwordBlureHandler,
              }}
            />
            <Input
              label="ConfirmPassword"
              error={passwordConfirmHasError}
              errorMessage="Password Not the same"
              input={{
                required: true,
                type: "password",
                id: "confirmPassword",
                name: "confirmPassword",
                value: passwordConfirmValue,
                onChange: passwordConfirmChangeHandler,
                onBlur: passwordConfirmBlureHandler,
              }}
            />
          </Form>
          {isLoading && <LoadingSpinner />}
          {message && <Alert message={message} />}
          {errorMessage && <Alert message={errorMessage} error />}

          <Link to="/login">
            <p>Already have an account</p>
          </Link>
        </Card>
      </Centered>
    </>
  );
};

export default SignUp;
