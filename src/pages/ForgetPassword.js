import React from "react";
import Centered from "../components/layouts/Centered";
import Card from "../components/UI/Card";
import Input from "../components/UI/Input";
import Form from "../components/UI/Form";

function ForgetPassword() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
  };

  const buttonProps = {
    type: "submit",
    title: "Confirm",
    buttonStyle: "btn-primary",
    handleSubmit,
  };

  return (
    <Centered width="4">
      <Card title="Forget Password">
        <Form inputs={buttonProps} handleSubmit={handleSubmit}>
          <Input
            label="Email"
            input={{
              type: "email",
              placeholder: "Email..",
              id: "email",
              name: "email",
            }}
          />
        </Form>
      </Card>
    </Centered>
  );
}

export default ForgetPassword;
