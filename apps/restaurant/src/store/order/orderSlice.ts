import { createSlice } from "@reduxjs/toolkit";
import { Iaddress } from "../address/addressSlice";
import { IItem } from "../item/itemSlice";
import { fetchOrders, generateOrder } from "./orderApi";
interface Iproducts {
  product: IItem;
  quantity: number;
  price: number;
}
interface Iorder {
  _id: string;
  user: string;
  products: Iproducts[];
  address: Iaddress;
  tax: number;
  shipping: number;
  subtotal: number;
  total: number;
  payment: { payId: string; payStatus: string };
}
export interface IinitialState {
  orders: Iorder[] | [];
  currentOrder: Iorder | null;
  orderGeneratedStatus: "idle" | "success" | "pending" | "fail";
  orderFetchedStatus: "idle" | "success" | "pending" | "fail";
}
const initialState: IinitialState = {
  orders: [],
  currentOrder: null,
  orderGeneratedStatus: "idle",
  orderFetchedStatus: "idle",
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generateOrder.fulfilled, (state, action) => {
        state.orderGeneratedStatus = "success";
        state.currentOrder = action.payload;
      })
      .addCase(generateOrder.pending, (state) => {
        state.orderGeneratedStatus = "pending";
      })
      .addCase(generateOrder.rejected, (state) => {
        state.orderGeneratedStatus = "fail";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orderFetchedStatus = "success";
        state.orders = action.payload;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.orderFetchedStatus = "pending";
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.orderFetchedStatus = "fail";
      });
  },
});
export default orderSlice.reducer;
