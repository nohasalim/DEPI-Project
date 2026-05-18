import { createAsyncThunk } from "@reduxjs/toolkit";
import * as taskService from "../../services/taskService";
import type { AddTaskPayload, EditTaskPayload } from "../../types/task.types";

export const addingTask = createAsyncThunk(
  "project/addingTask",
  async ({ projectId, taskData }: AddTaskPayload, { rejectWithValue }) => {
    try {
      if (!projectId) return rejectWithValue("Project ID is not correct");
      const { status, data, message } = await taskService.addingTask(
        projectId,
        taskData,
      );

      if (status !== "success") {
        // Check console log Here
        console.log(status);
        return rejectWithValue(message || "Adding new task is failed");
      }
      return data;
    } catch (error: unknown) {
      // Check console log Here
      console.log(error);
      type AxiosErrorLike = { response?: { data?: { message?: unknown } } };
      const axiosErr = error as AxiosErrorLike;
      const messageFromResponse =
        axiosErr.response &&
        axiosErr.response.data &&
        typeof axiosErr.response.data.message === "string"
          ? axiosErr.response.data.message
          : undefined;
      const message =
        messageFromResponse ?? (error instanceof Error ? error.message : undefined) ??
        "Something went wrong while adding task";
      return rejectWithValue(message);
    }
  },
);

export const editingTask = createAsyncThunk(
  "project/editingTask",
  async (
    { projectId, taskId, taskData }: EditTaskPayload,
    { rejectWithValue },
  ) => {
    try {
      if (!projectId) return rejectWithValue("Project ID is not correct");
      if (!taskId) return rejectWithValue("Task ID is not correct");
      const { status, data, message } = await taskService.editingTask(
        taskId,
        taskData,
      );

      // const { status, data, message } = await taskService.editingTask(
      //   projectId,
      //   taskId,
      //   taskData,
      // );

      if (status !== "success") {
        // Check console log Here
        console.log(status);
        return rejectWithValue(message || "Editig task is failed");
      }
      return data;
    } catch (error: unknown) {
      // Check console log Here
      console.log(error);
      type AxiosErrorLike = { response?: { data?: { message?: unknown } } };
      const axiosErr = error as AxiosErrorLike;
      const messageFromResponse =
        axiosErr.response &&
        axiosErr.response.data &&
        typeof axiosErr.response.data.message === "string"
          ? axiosErr.response.data.message
          : undefined;
      const message =
        messageFromResponse ?? (error instanceof Error ? error.message : undefined) ??
        "Something went wrong while editing task";
      return rejectWithValue(message);
    }
  },
);
