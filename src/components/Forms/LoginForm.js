import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import useInput from "../../hooks/useInput";
import Centered from "../layouts/Centered";
import Card from "../UI/Card";
import Form from "../UI/Form";
import Input from "../UI/Input";
import { validateEmail } from "../../utils/regularExpression.js";
import AuthContext from "../../store/auth-context";
import { loginAction } from "../../store/Action/loginAction";
import Alert from "../UI/Alert";

const validateEmailInput = (value) => validateEmail(value);
const validatePasswordInput = (value) => value.trim().length >= 5;

const LoginForm = () => {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
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

  let formIsValied = false;
  if (isEmailValid && passwordValid) {
    formIsValied = true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setMessage(null);
    setIsLoading(true);
    if (!formIsValied) {
      setErrorMessage("Invalied Inputs");
      setIsLoading(false);
      return;
    }
    try {
      const res = await loginAction(emailValue, passwordValue);
      authCtx.logIn(res.data);
      setIsLoading(false);

      if (res.data.status === "notVerified") {
        setErrorMessage(res.data.message);
      } else {
        emailReset();
        passwordReset();
        setMessage("Login successfully.");
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
  const buttonProps = {
    type: "submit",
    title: "Login",
    buttonStyle: "btn-primary",
  };

  return (
    <>
      <Centered width="6">
        <Card title="Login">
          <Form
            inputs={buttonProps}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          >
            <Input
              label="Email"
              error={emailHasError}
              errorMessage="Email is not valid"
              input={{
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
                type: "password",
                id: "password",
                name: "password",
                value: passwordValue,
                onChange: passwordChangeHandler,
                onBlur: passwordBlureHandler,
              }}
            />
          </Form>
          {message && <Alert message={message} />}
          {errorMessage && <Alert message={errorMessage} error />}
          <Link to="/forget-Password">
            <p>Forget Password?</p>
          </Link>
          <Link to="/signup">
            <p>Sign Up</p>
          </Link>
        </Card>
      </Centered>
    </>
  );
};

export default LoginForm;
