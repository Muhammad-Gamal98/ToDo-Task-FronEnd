import { useState } from "react";
const useInput = (checkValidate) => {
  const [inputValue, setInputValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const isInputValid = checkValidate(inputValue);
  const [isInputValidState, setIsInputValid] = useState(isInputValid);
  const inputHasError = !isInputValid && isTouched;
  // console.log(inputValue, isTouched, isInputValid, inputHasError);
  const inputChangeHandler = (event) => {
    // console.log(event.target.value);
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
    isTouched,
    reset,
  };
};
export default useInput;
