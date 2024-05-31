import { createSlice } from "@reduxjs/toolkit";
import { addItem, fetchItem, fetchItems } from "./itemApi";

export interface IItem {
  _id: string;
  title: string;
  image: string;
  stock: number;
  price: number;
  likes: string[];
  disLikes: string[];
}

export interface IinitialState {
  items: IItem[] | [];
  item: IItem | null;
  itemsFetchedStatus: "idle" | "pending" | "success" | "fail";
  itemAddedStatus: "idle" | "pending" | "success" | "fail";
  singleItemFetchedStatus: "idle" | "pending" | "success" | "fail";
}

const initialState: IinitialState = {
  items: [],
  item: null,
  itemsFetchedStatus: "idle",
  itemAddedStatus: "idle",
  singleItemFetchedStatus: "idle",
};
const itmeSlice = createSlice({
  name: "item",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addItem.fulfilled, (state, action) => {
        state.itemAddedStatus = "success";
        state.item = action.payload;
      })
      .addCase(addItem.pending, (state) => {
        state.itemAddedStatus = "pending";
      })
      .addCase(addItem.rejected, (state) => {
        state.itemAddedStatus = "fail";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.itemsFetchedStatus = "success";
        state.items = action.payload;
      })
      .addCase(fetchItems.pending, (state) => {
        state.itemsFetchedStatus = "pending";
      })
      .addCase(fetchItems.rejected, (state) => {
        state.itemsFetchedStatus = "fail";
      })
      .addCase(fetchItem.fulfilled, (state, action) => {
        state.singleItemFetchedStatus = "success";
        state.item = action.payload;
      })
      .addCase(fetchItem.pending, (state) => {
        state.singleItemFetchedStatus = "pending";
      })
      .addCase(fetchItem.rejected, (state) => {
        state.singleItemFetchedStatus = "fail";
      });
  },
});

export default itmeSlice.reducer;
