import { createSlice } from "@reduxjs/toolkit";
import { generatePaymentIntent } from "./paymentApi";

export interface Ipayment {
  _id: string;
  user: string;
  order: string;
  amount: number;
  paymentIntent: string;
}
export interface IinitialState {
  payments: Ipayment[] | [];
  paymentIntent: Ipayment | null;
  paymentsFetchedStatus: "idle" | "pending" | "success" | "fail";
  paymentIntentGenerationStatus: "idle" | "pending" | "success" | "fail";
  //   pendingPaymentRequestStatus: "idle" | "pending" | "success" | "fail";
}
const initialState: IinitialState = {
  payments: [],
  paymentIntent: null,
  paymentsFetchedStatus: "idle",
  paymentIntentGenerationStatus: "idle",
};
const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    paymentRequest: (state, action) => {
      state.paymentIntent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generatePaymentIntent.fulfilled, (state, action) => {
        state.paymentIntentGenerationStatus = "success";
        state.paymentIntent = action.payload;
      })
      .addCase(generatePaymentIntent.pending, (state) => {
        state.paymentIntentGenerationStatus = "pending";
      })
      .addCase(generatePaymentIntent.rejected, (state) => {
        state.paymentIntentGenerationStatus = "fail";
      });
  },
});
export const { paymentRequest } = paymentSlice.actions;
export default paymentSlice.reducer;
