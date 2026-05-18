import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "../../services/authService";
import type {
  RegisterCredentials,
  LoginCredentials,
} from "../../types/user.types";
import axios, { AxiosError } from "axios";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials: RegisterCredentials, { rejectWithValue }) => {
    try {
      const data = await authService.register(credentials);
      const token = data.token || data.accessToken;
      if (data && token) {
        // Don't store token — user will log in after registering
        return { ...data, token };
      } else {
        return rejectWithValue("Invalid response from server");
      }
    } catch (error) {
      const err = error as AxiosError<{ message?: string }> | Error;
      console.error("Register error:", err);
      let errorMessage = "Registration failed. Please try again.";
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      return rejectWithValue(errorMessage);
    }
  },
);


export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const data = await authService.login(credentials);
      const token = data.token || data.accessToken;
      if (data && token) {
        localStorage.setItem("token", token);
        return { ...data, token };
      } else {
        return rejectWithValue("Invalid response from server");
      }
    } catch (error) {
      const err = error as AxiosError<{ message?: string }> | Error;
      console.error("Login error:", err);
      let errorMessage = "Login failed. Please check your credentials.";
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      return rejectWithValue(errorMessage);
    }
  },
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/auth/valid-token",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const user = response.data?.data;
      if (user) {
        localStorage.setItem("token", token);
        return { user, token };
      } else {
        return rejectWithValue("Failed to fetch user data");
      }
    } catch (error) {
      const err = error as AxiosError<{ message?: string }> | Error;
      console.error("Fetch user error:", err);
      let errorMessage = "Failed to authenticate. Please try again.";
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      return rejectWithValue(errorMessage);
    }
  },
);

