import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
interface IdataObj {
  name: string;
  society: string;
  houseNumber: string;
  city: string;
  state: string;
  pincode: string;
  mobile: string;
}
export const addNewAddress = createAsyncThunk(
  "add/address",
  async (
    { dataObj, userId }: { dataObj: IdataObj; userId: string },
    { rejectWithValue }
  ) => {
    try {
      const req = await fetch(
        `${import.meta.env.VITE_API}/api/addNewAddress/${userId}`,
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
        error instanceof Error ? error.message : "Address Creation Unsuccess !";
      toast.error(errMessage);
      return rejectWithValue(errMessage);
    }
  }
);
export const updateAddress = createAsyncThunk(
  "update/address",
  async (
    {
      dataObj,
      userId,
      addressId,
    }: { dataObj: IdataObj; userId: string; addressId: string },
    { rejectWithValue }
  ) => {
    try {
      const req = await fetch(
        `${import.meta.env.VITE_API}/api/updateAddress/${userId}/${addressId}`,
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
        error instanceof Error ? error.message : "Address Updation Unsuccess !";
      toast.error(errMessage);
      return rejectWithValue(errMessage);
    }
  }
);
export const fetchAddresses = createAsyncThunk(
  "fetch/addresses",
  async (userId: string, { rejectWithValue }) => {
    try {
      const req = await fetch(
        `${import.meta.env.VITE_API}/api/fetchAddresses/${userId}`,
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
        error instanceof Error ? error.message : "Address Fetching Unsuccess !";
      toast.error(errMessage);
      return rejectWithValue(errMessage);
    }
  }
);
