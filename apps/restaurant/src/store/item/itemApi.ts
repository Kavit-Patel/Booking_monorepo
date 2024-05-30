import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const addItem = createAsyncThunk(
  "add/item",
  async (
    dataObj: { title: string; image: string; stock: number; price: number },
    { rejectWithValue }
  ) => {
    try {
      const req = await fetch(`${import.meta.env.VITE_API}/api/addItem`, {
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
      const errMessage =
        error instanceof Error ? error.message : "Adding Item Failed !";
      toast.error(errMessage);
      return rejectWithValue(errMessage);
    }
  }
);
