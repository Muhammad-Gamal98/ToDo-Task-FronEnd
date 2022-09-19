import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useInput from "../../hooks/useInput";
import { getTasksAction, sendTask } from "../../store/Action/TasksAction";
import Alert from "../UI/Alert";
import Form from "../UI/Form";
import Input from "../UI/Input";
import LoadingSpinner from "../UI/LoadingSpinner";
import Modal from "../UI/Modal";
import Select from "../UI/Select";

const convertToTimeStamp = (date) => {
  return Math.floor(date.getTime() / 1000);
};
const TaskForm = (props) => {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    inputValue: titleValue,
    inputChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlureHandler,
    isInputValid: istitleValid,
    inputHasError: titleHasError,
    reset: titleReset,
  } = useInput((val) => val.trim() !== "");
  const {
    inputValue: descriptionValue,
    inputChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlureHandler,
    isInputValid: isdescriptionValid,
    inputHasError: descriptionHasError,
    reset: descriptionReset,
  } = useInput((val) => val.trim() !== "");
  const {
    inputValue: priorityValue,
    inputChangeHandler: priorityChangeHandler,
    inputBlurHandler: priorityBlureHandler,
    isInputValid: isPriorityValid,
    inputHasError: priorityHasError,
    reset: priorityReset,
  } = useInput((val) => val != "");
  const {
    inputValue: startDateValue,
    inputChangeHandler: startDateChangeHandler,
    inputBlurHandler: startDateBlureHandler,
    isInputValid: isStartDateValid,
    inputHasError: startDateHasError,
    reset: startDateReset,
  } = useInput((val) => val != "");
  const {
    inputValue: endDateValue,
    inputChangeHandler: endDateChangeHandler,
    inputBlurHandler: endDateBlureHandler,
    isInputValid: isEndDateValid,
    inputHasError: endDateHasError,
    reset: endDateReset,
  } = useInput(
    (val) =>
      val != "" &&
      convertToTimeStamp(new Date(val)) >=
        convertToTimeStamp(new Date(startDateValue))
  );
  let formIsValid = false;
  if (
    istitleValid &&
    isPriorityValid &&
    isdescriptionValid &&
    isStartDateValid &&
    isEndDateValid
  ) {
    formIsValid = true;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);
    setMessage(null);
    setIsLoading(true);
    if (!formIsValid) {
      setErrorMessage("Unvalied Inputs");
      setIsLoading(false);
      return;
    }
    try {
      const x = await dispatch(
        sendTask(
          titleValue,
          descriptionValue,
          priorityValue,
          startDateValue,
          endDateValue
        )
      );
      setIsLoading(false);
      dispatch(getTasksAction());
      setMessage("Task Added");
      titleReset();
      descriptionReset();
      priorityReset();
      startDateReset();
      endDateReset();
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.response.data.message);
      console.log("Error while add Task");
      console.log(error);
    }
  };
  return (
    <Modal
      onClose={props.onClose}
      title="Create Task"
      onHandelSubmit={handleSubmit}
    >
      <Form>
        <Input
          label="title"
          error={titleHasError}
          errorMessage="title is not valid"
          input={{
            type: "text",
            id: "title",
            name: "title",
            value: titleValue,
            onChange: titleChangeHandler,
            onBlur: titleBlureHandler,
          }}
        />
        <Input
          label="description"
          error={descriptionHasError}
          errorMessage="description is not valid"
          input={{
            type: "text",
            id: "description",
            name: "description",
            value: descriptionValue,
            onChange: descriptionChangeHandler,
            onBlur: descriptionBlureHandler,
          }}
        />
        <Select
          value={priorityValue}
          onChange={priorityChangeHandler}
          onBlur={priorityBlureHandler}
          error={priorityHasError}
          errorMessage="select a priority"
          title="select task priority"
          options={[
            { value: 1, text: "Low" },
            { value: 2, text: "Medium" },
            { value: 3, text: "High" },
          ]}
        />
        <label className="mt-2" htmlFor="startDate">
          Start Date:
        </label>
        <input
          className={`form-control mt-1 ${startDateHasError && "is-invalid"}`}
          onChange={startDateChangeHandler}
          onBlur={startDateBlureHandler}
          value={startDateValue}
          id="startDate"
          name="startDate"
          type="date"
        />
        {startDateHasError && (
          <div className="invalid-feedback">Select valid Start Date</div>
        )}
        <label className="mt-2" htmlFor="endDate">
          end Date:
        </label>
        <input
          className={`form-control mt-1 ${endDateHasError && "is-invalid"}`}
          value={endDateValue}
          onChange={endDateChangeHandler}
          onBlur={endDateBlureHandler}
          id="endDate"
          name="endDate"
          type="date"
        />
        {endDateHasError && (
          <div className="invalid-feedback">Select valid End Date</div>
        )}
      </Form>

      {isLoading && <LoadingSpinner />}
      {message && <Alert message={message} />}
      {errorMessage && <Alert message={errorMessage} error />}
    </Modal>
  );
};

export default TaskForm;
