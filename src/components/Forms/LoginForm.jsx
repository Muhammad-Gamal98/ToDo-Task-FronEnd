import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import useInput from "../../hooks/useInput";
import Centered from "../layouts/Centered";
import Card from "../UI/Card";
import Form from "../UI/Form";
import Input from "../UI/Input";
import { validateEmail } from "../../utils/regularExpression.js";
import AuthContext from "../../store/auth-context";
import loginAction from "../../store/Action/loginAction";

const validateEmailInput = (value) => validateEmail(value);
const validatePasswordInput = (value) => value.trim().length >= 5;

function LoginForm() {
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
    isInputValid: passwordEmailValid,
    inputHasError: passwordHasError,
    reset: passwordReset,
  } = useInput(validatePasswordInput);

  let formIsValid = false;
  if (isEmailValid && passwordEmailValid) {
    formIsValid = true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formIsValid) {
      console.log("unvalid submit");
      return;
    }
    try {
      const res = await loginAction(emailValue, passwordValue);
      console.log(res);
      authCtx.logIn(res.data);
      emailReset();
      passwordReset();
    } catch (error) {
      console.log("errrrrrrrrrrr");
      console.log(error);
    }
  };
  const buttonProps = {
    type: "submit",
    title: "Login",
    buttonStyle: "btn-primary",
    handleSubmit,
  };

  return (
    <>
      <Centered width="6">
        <Card title="Login">
          <Form inputs={buttonProps} handleSubmit={handleSubmit}>
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
              errorMessage="Passwor less than 6 character"
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
}

export default LoginForm;
