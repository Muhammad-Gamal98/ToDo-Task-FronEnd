import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
  },
  reducers: {
    replaceTask(state, action) {
      state.tasks = action.payload.tasks;
    },
  },
});
export const taskAction = taskSlice.actions;
export default taskSlice;
