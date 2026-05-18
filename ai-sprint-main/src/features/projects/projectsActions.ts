import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  FormGenerateProjectDetails,
  EditProjectPayload,
} from "../../types/project.types";
import * as projectService from "../../services/projectService";
import api from "../../services/api";
import type { Project } from "../../types/project.types";

export const generateProject = createAsyncThunk(
  "project/generate",
  async (projectData: FormGenerateProjectDetails, { rejectWithValue, dispatch }) => {
    try {
      const { status, data, message } =
        await projectService.aiGenerateProjectTasks(projectData);

      if (status !== "success") {
        // Check console log Here
        console.log(status);
        return rejectWithValue(message || "Generating project tasks is failed");
      }
      // Refresh projects list
      dispatch(fetchProjects());
      console.log("Generated Project Data:", data); // Check console log Here
      // Return generated project details
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
        "Something went wrong while generating tasks";
      return rejectWithValue(message);
    }
  },
);

export const editProject = createAsyncThunk(
  "project/edit",
  async (
    { projectId, projectData }: EditProjectPayload,
    { rejectWithValue, dispatch },
  ) => {
    try {
      if (!projectId) return rejectWithValue("Project ID is not correct");
      const { status, data, message } = await projectService.editProject(
        projectId,
        projectData,
      );

      if (status !== "success") {
        // Check console log Here
        console.log(status);
        return rejectWithValue(message || "Editing project is failed");
      }
      // Refresh projects list
      dispatch(fetchProjects());
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
        "Something went wrong while editing project";
      return rejectWithValue(message);
    }
  },
);

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<{ status: string; data: Project[] }>(
        "/api/v1/projects",
      );
      return response.data.data;
    } catch (error: unknown) {
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
        "Failed to fetch projects";
      return rejectWithValue(message);
    }
  },
);

// Delete project by ID
export const deleteProject = createAsyncThunk(
  "project/delete",
  async (
    projectId: string,
    { rejectWithValue, dispatch },
  ) => {
    try {
      console.log("Attempting to delete project with ID:", projectId); // Check console log Here
      if (!projectId) {
        return rejectWithValue("Project ID is not correct");
      }

      const { status, message } =
        await projectService.deleteProject(projectId);

      if (status !== "success") {
        console.log(status);

        return rejectWithValue(
          message || "Deleting project failed",
        );
      }

      // Refresh projects list
      await dispatch(fetchProjects());

      return projectId;
    } catch (error: unknown) {
      console.log(error);

      type AxiosErrorLike = {
        response?: {
          data?: {
            message?: unknown;
          };
        };
      };

      const axiosErr = error as AxiosErrorLike;

      const messageFromResponse =
        typeof axiosErr.response?.data?.message ===
          "string"
          ? axiosErr.response.data.message
          : undefined;

      const message =
        messageFromResponse ??
        (error instanceof Error
          ? error.message
          : undefined) ??
        "Something went wrong while deleting project";

      return rejectWithValue(message);
    }
  },
);