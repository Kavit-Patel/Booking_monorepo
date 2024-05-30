import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export interface IregisterUser {
  name: string;
  email: string;
  password: string;
  image: string;
}

export const loginUser = createAsyncThunk(
  "login/user",
  async (dataObj: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const req = await fetch(`${import.meta.env.VITE_API}/api/login`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataObj),
      });
      const data = await req.json();
      if (data.success) {
        toast.success(data.message);
        return data.response;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Login Unsuccess !";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const registerUser = createAsyncThunk(
  "register/user",
  async (dataObj: IregisterUser, { rejectWithValue }) => {
    try {
      const req = await fetch(`${import.meta.env.VITE_API}/api/register`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataObj),
      });
      const data = await req.json();
      if (data.success) {
        toast.success(data.message);
        return data.response;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Registration Unsuccess !";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const autoLogin = createAsyncThunk(
  "auto_login/user",
  async (_, { rejectWithValue }) => {
    try {
      const req = await fetch(`${import.meta.env.VITE_API}/api/autoLogin`, {
        credentials: "include",
        method: "GET",
      });
      const data = await req.json();
      if (data.success) {
        toast.success(data.message);
        return data.response;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Auto_Login Unsuccess !";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const logOut = createAsyncThunk(
  "logOut/user",
  async (_, { rejectWithValue }) => {
    try {
      const req = await fetch(`${import.meta.env.VITE_API}/api/logOut`, {
        credentials: "include",
        method: "GET",
      });
      const data = await req.json();
      if (data.success) {
        toast.success(data.message);
        return;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "LogOut Unsuccess !";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);
