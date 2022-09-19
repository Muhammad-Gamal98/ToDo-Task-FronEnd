import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTasksAction } from "../../store/Action/TasksAction";
import StatusContainer from "../StatusContainer/StatusContainer";
const status = [
  {
    title: "To Do",
    color: "bg-secondary",
    status: "TODO",
  },
  {
    title: "In Progress",
    color: "bg-warning",
    status: "IN progress",
  },
  {
    title: "Under Review",
    color: "bg-info",
    status: "Under Review",
  },
  {
    title: "Rework",
    color: "bg-danger",
    status: "Rework",
  },
  {
    title: "Completed",
    color: "bg-success",
    status: "Completed",
  },
];

function TaskList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasksAction());
  }, []);
  return (
    <div className="row mx-3 my-3">
      {status.map((el, index) => {
        return (
          <div key={index} className="col-12 my-3">
            <StatusContainer
              title={el.title}
              color={el.color}
              status={el.status}
            />
          </div>
        );
      })}
    </div>
  );
}

export default TaskList;
