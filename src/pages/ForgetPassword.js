import React, { useState } from "react";
import Centered from "../components/layouts/Centered";
import Card from "../components/UI/Card";
import Input from "../components/UI/Input";
import Form from "../components/UI/Form";
import useInput from "../hooks/useInput";
import { validateEmail } from "../utils/regularExpression";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import Alert from "../components/UI/Alert";
import { forgetPassword } from "../store/Action/loginAction";

const validateEmailInput = (value) => validateEmail(value);
const ForgetPassword = () => {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    inputValue: emailValue,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlureHandler,
    isInputValid: isEmailValid,
    inputHasError: emailHasError,
    reset: emailReset,
  } = useInput(validateEmailInput);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setMessage(null);
    setIsLoading(true);
    if (!isEmailValid) {
      setErrorMessage("Invalied Inputs");
      setIsLoading(false);
      return;
    }
    try {
      const res = await forgetPassword(emailValue);
      setIsLoading(false);
      emailReset();
      setMessage("Check your E-mail for reset password ");
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.response.data.message);
      console.log(error);
    }
  };

  const buttonProps = {
    type: "submit",
    title: "Confirm",
    buttonStyle: "btn-primary",
  };

  return (
    <Centered width="4">
      <Card title="Forget Password">
        <Form inputs={buttonProps} handleSubmit={handleSubmit}>
          <Input
            label="Email"
            error={emailHasError}
            errorMessage="Email is not valid"
            input={{
              required: true,
              type: "email",
              placeholder: "Email..",
              id: "email",
              name: "email",
              value: emailValue,
              onChange: emailChangeHandler,
              onBlur: emailBlureHandler,
            }}
          />
        </Form>
        {isLoading && <LoadingSpinner />}
        {message && <Alert message={message} />}
        {errorMessage && <Alert message={errorMessage} error />}
      </Card>
    </Centered>
  );
};

export default ForgetPassword;
