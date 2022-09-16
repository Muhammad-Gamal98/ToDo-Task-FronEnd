import { useState } from "react";
const useInput = (checkValidate) => {
  const [inputValue, setInputValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const isInputValid = checkValidate(inputValue);
  const inputHasError = !isInputValid && isTouched;

  const inputChangeHandler = (event) => {
    setInputValue(event.target.value);
  };
  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };
  const reset = () => {
    setIsTouched(false);
    setInputValue("");
  };

  return {
    inputValue,
    inputChangeHandler,
    inputBlurHandler,
    isInputValid,
    inputHasError,
    reset,
  };
};
export default useInput;
