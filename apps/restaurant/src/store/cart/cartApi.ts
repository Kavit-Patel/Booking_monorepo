import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const addToCart = createAsyncThunk(
  "add/cart",
  async (
    dataObj: { itemId: string; userId: string; quantity: number },
    { rejectWithValue }
  ) => {
    try {
      const req = await fetch(
        `${import.meta.env.VITE_API}/api/addToCart/${dataObj.userId}/${dataObj.itemId}`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: dataObj.quantity }),
        }
      );
      const data = await req.json();
      if (data.success) {
        toast.success(data.message);
        return data.response;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      const errMessage =
        error instanceof Error ? error.message : "Cart Addition Unsuccess !";
      toast.error(errMessage);
      return rejectWithValue(errMessage);
    }
  }
);

export const getCart = createAsyncThunk(
  "fetch/cart",
  async (userId: string, { rejectWithValue }) => {
    try {
      const req = await fetch(
        `${import.meta.env.VITE_API}/api/getCart/${userId}`,
        {
          credentials: "include",
        }
      );
      const data = await req.json();
      if (data.success) {
        toast.success(data.message);
        return data.response;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      const errMessage =
        error instanceof Error ? error.message : "Cart Addition Unsuccess !";
      toast.error(errMessage);
      return rejectWithValue(errMessage);
    }
  }
);
