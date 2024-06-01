import { createSlice } from "@reduxjs/toolkit";
import { addToCart, getCart, removeItem, syncLsDb } from "./cartApi";
import { IItem } from "../item/itemSlice";

export interface Icart {
  _id: string;
  item: IItem;
  user: string;
  quantity: number;
}

export interface IinitialState {
  cart: Icart[] | [];
  lsCart: Icart[] | [];
  cartFetchedStatus: "idle" | "pending" | "success" | "fail";
  cartSyncedStatus: "idle" | "pending" | "success" | "fail";
  addToCartStatus: "idle" | "pending" | "success" | "fail";
  itemRemovedStatus: "idle" | "pending" | "success" | "fail";
  lsCartStatus: "idle" | "pending" | "success" | "fail";
}

const initialState: IinitialState = {
  cart: [],
  lsCart: [],
  cartFetchedStatus: "idle",
  addToCartStatus: "idle",
  cartSyncedStatus: "idle",
  itemRemovedStatus: "idle",
  lsCartStatus: "idle",
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getLsCart: (state, action) => {
      state.lsCart = action.payload;
    },
  },
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
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        state.itemRemovedStatus = "success";
        state.cart = action.payload;
      })
      .addCase(removeItem.pending, (state) => {
        state.itemRemovedStatus = "pending";
      })
      .addCase(removeItem.rejected, (state) => {
        state.itemRemovedStatus = "fail";
      })
      .addCase(syncLsDb.fulfilled, (state, action) => {
        state.cartSyncedStatus = "success";
        state.lsCartStatus = "success";
        state.cart = action.payload;
        state.lsCart = action.payload;
      })
      .addCase(syncLsDb.pending, (state) => {
        state.cartSyncedStatus = "pending";
      })
      .addCase(syncLsDb.rejected, (state) => {
        state.cartSyncedStatus = "fail";
      });
  },
});
export const { getLsCart } = cartSlice.actions;
export default cartSlice.reducer;
