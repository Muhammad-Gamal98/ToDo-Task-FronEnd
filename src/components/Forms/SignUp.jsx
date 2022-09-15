import React from "react";
import { Link } from "react-router-dom";
import Centered from "../layouts/Centered";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Form from "../UI/Form";
import Input from "../UI/Input";

function SignUp() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
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
        <Card title="SignUp">
          <Form inputs={buttonProps} handleSumbit={handleSubmit}>
            <Input
              label="Name"
              input={{
                type: "text",

                id: "name",
                name: "name",
              }}
            />
            <Input
              label="Email"
              input={{
                type: "email",

                id: "email",
                name: "email",
              }}
            />
            <Input
              label="Password"
              input={{
                type: "password",

                id: "password",
                name: "password",
              }}
            />
            <Input
              label="Confirm Password"
              input={{
                type: "password",
                id: "Confirm-password",
                name: "Confirm-password",
              }}
            />
          </Form>
          <Link to="/login">
            <p>Already have an account</p>
          </Link>
        </Card>
      </Centered>
    </>
  );
}

export default SignUp;
