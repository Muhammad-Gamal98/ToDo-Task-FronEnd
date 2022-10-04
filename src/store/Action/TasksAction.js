import axios from "axios";
import URL from "../../constants/URL";
import { taskAction } from "../taskSlice";

export const getTasksAction = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      return await axios({
        method: "GET",
        url: `${URL}/task`,
        withCredentials: true,
      });
    };
    try {
      const res = await fetchData();
      dispatch(taskAction.replaceTask({ tasks: res.data.data }));
    } catch (error) {
      if (error.response.data.message === "No Data found") {
        dispatch(taskAction.replaceTask({ tasks: [] }));
      }
      console.log(error);
      if (error.response.data.message.includes("expired")) {
        throw new Error("Expired");
      }
    }
  };
};
export const sendTask = (
  titleValue,
  descriptionValue,
  priorityValue,
  startDateValue,
  endDateValue
) => {
  return async (dispatch) => {
    return await axios({
      method: "POST",
      url: `${URL}/task`,
      data: {
        title: titleValue,
        description: descriptionValue,
        priority: priorityValue,
        startDate: startDateValue,
        endDate: endDateValue,
      },
      withCredentials: true,
    });
  };
};
export const editTaskStatus = (status, id) => {
  return async (dispatch) => {
    const editStatus = async () => {
      return await axios({
        method: "PATCH",
        url: `${URL}/task/${id}`,
        data: {
          status: status,
        },
        withCredentials: true,
      });
    };
    try {
      const res = await editStatus();
      dispatch(getTasksAction());
    } catch (error) {
      console.log(error);
      if (
        error.response.data.message.includes("expired") ||
        error.response.data.message.includes("logged")
      ) {
        throw new Error("Expired");
      }
    }
  };
};
export const removeTask = (id) => {
  return async (dispatch) => {
    const deleteTask = async () => {
      return await axios({
        method: "DELETE",
        url: `${URL}/task/${id}`,
        withCredentials: true,
      });
    };
    try {
      await deleteTask();
      dispatch(getTasksAction());
    } catch (error) {
      console.log(error);
      if (
        error.response.data.message.includes("expired") ||
        error.response.data.message.includes("logged")
      ) {
        throw new Error("Expired");
      }
    }
  };
};
