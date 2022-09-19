import React from "react";
import { useSelector } from "react-redux";
import Task from "../Task/Task";

const statusName = {
  1: "TODO",
  2: "IN progress",
  3: "Under Review",
  4: "Rework",
  5: "Completed",
};
const convertToTimeStamp = (date) => {
  return Math.floor(date.getTime() / 1000);
};
const priorityName = { 1: "Low", 2: "Medium", 3: "High" };

function StatusContainer(props) {
  // const [tasks, setTasks] = useState(props.tasks);
  const tasks = useSelector((state) => state.task.tasks);
  const filteredTasks = [...tasks].filter(
    (t) => statusName[t.status] === props.status
  );
  const sortedTasks = filteredTasks.sort((a, b) => {
    if (
      convertToTimeStamp(new Date(a.endDate)) -
        convertToTimeStamp(new Date(b.endDate)) ===
      0
    ) {
      return b.priority - a.priority;
    } else {
      return (
        convertToTimeStamp(new Date(a.endDate)) -
        convertToTimeStamp(new Date(b.endDate))
      );
    }
  });
  return (
    <div className={`card ${props.color}`}>
      <div className="card-body ">
        <h5 className="card-title d-flex justify-content-end text-white">
          {props.title}
        </h5>
        <div className="row row-cols-3 g-2">
          {sortedTasks &&
            sortedTasks.map((el, index) => {
              return (
                <Task
                  key={el._id}
                  id={el._id}
                  status={el.status}
                  title={el.title}
                  priority={priorityName[el.priority]}
                  description={el.description}
                  startDate={new Date(el.startDate).toLocaleString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  endDate={new Date(el.endDate).toLocaleString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default StatusContainer;
