import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import URL from "../../constants/URL";
import useInput from "../../hooks/useInput";
import { resetPassword } from "../../store/Action/loginAction";
import Centered from "../layouts/Centered";
import Alert from "../UI/Alert";
import Card from "../UI/Card";
import Form from "../UI/Form";
import Input from "../UI/Input";

const validatePasswordInput = (value) => value.trim().length >= 5;

const ResetPassword = () => {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validURL, setValidURL] = useState();
  const [successReset, setSuccessReset] = useState(false);

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
  const param = useParams();
  useEffect(() => {
    const verifyReset = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: `${URL}/user/resetpassword/${param.id}/${param.token}`,
        });

        setValidURL(true);
      } catch (error) {
        console.log(error);
        setValidURL(false);
      }
    };
    verifyReset();
  }, [param]);
  let formIsValied = false;
  if (passwordValid && passwordConfirmValid) {
    formIsValied = true;
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);
    setMessage(null);
    setSuccessReset(false);

    setIsLoading(true);
    if (!formIsValied) {
      setSuccessReset(false);
      setErrorMessage("Unvalied Inputs");
      setIsLoading(false);
      return;
    }
    try {
      const res = await resetPassword(
        passwordValue,
        passwordConfirmValue,
        param.id,
        param.token
      );
      setIsLoading(false);
      passwordReset();
      passwordConfirmReset();
      setMessage("Password is reseted");
      setSuccessReset(true);
    } catch (error) {
      setIsLoading(false);
      setSuccessReset(false);
      setErrorMessage(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  const buttonProps = {
    type: "submit",
    title: "Confirm",
    buttonStyle: "btn-primary",
    passReset: successReset,
  };
  return (
    <>
      <Centered width="6">
        {!validURL && <h1>404 Not Valid</h1>}
        {validURL && (
          <Card title="Reset Password">
            <Form
              passReset={successReset}
              inputs={buttonProps}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
            >
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
            {message && <Alert message={message} />}
            {errorMessage && <Alert message={errorMessage} error />}
          </Card>
        )}
      </Centered>
    </>
  );
};

export default ResetPassword;
