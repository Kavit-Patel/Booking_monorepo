import { createSlice } from "@reduxjs/toolkit";
import { addToCart, getCart } from "./cartApi";
import { IItem } from "../item/itemSlice";

export interface Icart {
  _id: string;
  item: IItem;
  user: string;
  quantity: number;
}

export interface IinitialState {
  cart: Icart[] | [];
  cartFetchedStatus: "idle" | "pending" | "success" | "fail";
  addToCartStatus: "idle" | "pending" | "success" | "fail";
}

const initialState: IinitialState = {
  cart: [],
  cartFetchedStatus: "idle",
  addToCartStatus: "idle",
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.fulfilled, (state, action) => {
        state.addToCartStatus = "success";
        state.cart = [...state.cart, action.payload];
      })
      .addCase(addToCart.pending, (state) => {
        state.addToCartStatus = "pending";
      })
      .addCase(addToCart.rejected, (state) => {
        state.addToCartStatus = "fail";
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.cartFetchedStatus = "success";
        state.cart = action.payload;
      })
      .addCase(getCart.pending, (state) => {
        state.cartFetchedStatus = "pending";
      })
      .addCase(getCart.rejected, (state) => {
        state.cartFetchedStatus = "fail";
      });
  },
});
export default cartSlice.reducer;
