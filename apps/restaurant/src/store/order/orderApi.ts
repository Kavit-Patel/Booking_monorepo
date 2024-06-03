import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
interface IdataObj {
  cartIds: string[];
  products: { product: string; quantity: number; price: number }[];
  address: string;
  tax: number;
  shipping: number;
  subtotal: number;
  total: number;
}
export const generateOrder = createAsyncThunk(
  "generate/order",
  async (
    { dataObj, userId }: { dataObj: IdataObj; userId: string },
    { rejectWithValue }
  ) => {
    try {
      const req = await fetch(
        `${import.meta.env.VITE_API}/api/generateOrder/${userId}`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataObj),
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
        error instanceof Error ? error.message : "Order Generation Unsuccess !";
      toast.error(errMessage);
      return rejectWithValue(errMessage);
    }
  }
);
export const fetchOrders = createAsyncThunk(
  "fetch/orders",
  async (userId: string, { rejectWithValue }) => {
    try {
      const req = await fetch(
        `${import.meta.env.VITE_API}/api/fetchUserOrders/${userId}`,
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
        error instanceof Error ? error.message : "Order Fetching Unsuccess !";
      toast.error(errMessage);
      return rejectWithValue(errMessage);
    }
  }
);
