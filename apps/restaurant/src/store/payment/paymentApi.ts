import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const generatePaymentIntent = createAsyncThunk(
  "generate/payment",
  async (
    {
      userId,
      orderId,
      amount,
    }: { userId: string; orderId: string; amount: number },
    { rejectWithValue }
  ) => {
    try {
      const req = await fetch(
        `${import.meta.env.VITE_API}/api/generatePaymentIntent/${userId}/${orderId}`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount }),
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
        error instanceof Error
          ? error.message
          : "PaymentIntent Generation Unsuccess !";
      toast.error(errMessage);
      return rejectWithValue(errMessage);
    }
  }
);
