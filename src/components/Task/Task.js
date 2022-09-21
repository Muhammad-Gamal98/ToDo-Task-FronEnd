import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useInput from "../../hooks/useInput";
import { editTaskStatus, removeTask } from "../../store/Action/TasksAction";
import { images } from "../../constants";
import Select from "../UI/Select";
import classes from "./Task.module.css";
import LoadingSpinner from "../UI/LoadingSpinner";
import AuthContext from "../../store/auth-context";
const priorityObj = {
  High: "🔴",
  Medium: "🟠",
  Low: "🟢",
};
let isInitial = true;
const Task = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const authCtx = useContext(AuthContext);
  const {
    inputValue: statusValue,
    inputChangeHandler: statusChangeHandler,
    inputBlurHandler: statusBlureHandler,
    isInputValid: isStatusValid,
    inputHasError: statusHasError,
    isInputValidState: isStatusValidState,
    reset: statusReset,
  } = useInput((val) => {
    return val != props.status && val.trim() !== "";
  });
  const onChangeHandler = (event) => {
    statusChangeHandler(event);
  };
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (!isStatusValid) {
      return;
    }
    dispatch(editTaskStatus(statusValue, props.id)).catch((error) => {
      authCtx.logOut();
    });
  }, [statusValue, isStatusValid, props.id, dispatch]);

  const removeTaskHandler = () => {
    setLoading(true);
    try {
      dispatch(removeTask(props.id));
      setLoading(true);
    } catch (error) {
      console.log(error);
      authCtx.logOut();
    }
  };

  return (
    <div className="col">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h3>{props.title}</h3>
            <span className="text-muted">
              {priorityObj[`${props.priority}`]}
              {props.priority}
            </span>
            <div className={classes.iconContainer}>
              <img
                onClick={removeTaskHandler}
                src={images.removeIcon}
                alt=""
                className={classes.closeIcon}
              />
            </div>
          </div>
          <div>
            <p>{props.description}</p>
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <p>Start Date : {props.startDate}</p>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <p>End Date : {props.endDate}</p>
            </div>
          </div>
          {loading && <LoadingSpinner />}
          <Select
            // value={props.status}
            message="Move to another status"
            value={statusValue}
            // onBlur={statusBlureHandler}
            onChange={onChangeHandler}
            options={[
              { value: 1, text: "TODO" },
              { value: 2, text: "IN Progress" },
              { value: 3, text: "Under Review" },
              { value: 4, text: "Rework" },
              { value: 5, text: "Completed" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Task;
