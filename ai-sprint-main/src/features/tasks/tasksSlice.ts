import { createSlice } from "@reduxjs/toolkit";
import { addingTask, editingTask } from "./tasksActions";

interface TaskState {
  isLoading: boolean;
  isSuccess: boolean;
  errorMsg: string | null;
}

const initialState: TaskState = {
  isLoading: false,
  isSuccess: false,
  errorMsg: null,
};

const taskAddingSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    resetTaskState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMsg = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addingTask.pending, (state) => {
        state.isLoading = true;
        state.errorMsg = null;
      })
      .addCase(addingTask.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addingTask.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMsg = action.payload as string;
      })
      .addCase(editingTask.pending, (state) => {
        state.isLoading = true;
        state.errorMsg = null;
      })
      .addCase(editingTask.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(editingTask.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMsg = action.payload as string;
      });
  },
});

export const { resetTaskState } = taskAddingSlice.actions;
export default taskAddingSlice.reducer;
