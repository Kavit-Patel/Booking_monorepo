import { createSlice } from "@reduxjs/toolkit";
import { addItem } from "./itemApi";

export interface IItem {
  id: string;
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
}

const initialState: IinitialState = {
  items: [],
  item: null,
  itemsFetchedStatus: "idle",
  itemAddedStatus: "idle",
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
      });
  },
});

export default itmeSlice.reducer;
