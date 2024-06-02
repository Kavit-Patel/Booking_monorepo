import { createSlice } from "@reduxjs/toolkit";
import { addNewAddress, fetchAddresses, updateAddress } from "./addressApi";

export interface Iaddress {
  _id: string;
  user: string;
  name: string;
  society: string;
  houseNumber: string;
  city: string;
  state: string;
  pincode: string;
  mobile: string;
}

export interface IinitialState {
  addresses: Iaddress[] | [];
  selectedAddress: Iaddress | null;
  newAddressCreatedStatus: "idle" | "pending" | "success" | "fail";
  addressUpdatedStatus: "idle" | "pending" | "success" | "fail";
  addressesFetchedStatus: "idle" | "pending" | "success" | "fail";
}

const initialState: IinitialState = {
  addresses: [],
  selectedAddress: null,
  newAddressCreatedStatus: "idle",
  addressUpdatedStatus: "idle",
  addressesFetchedStatus: "idle",
};
const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.addressesFetchedStatus = "success";
        state.addresses = action.payload;
      })
      .addCase(fetchAddresses.pending, (state) => {
        state.addressesFetchedStatus = "pending";
      })
      .addCase(fetchAddresses.rejected, (state) => {
        state.addressesFetchedStatus = "fail";
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.newAddressCreatedStatus = "success";
        state.addresses = [...state.addresses, action.payload];
      })
      .addCase(addNewAddress.pending, (state) => {
        state.newAddressCreatedStatus = "pending";
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.newAddressCreatedStatus = "fail";
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.addressUpdatedStatus = "success";
        const updateAddresses = state.addresses.map((el) => {
          if (el._id === action.payload._id) {
            return action.payload;
          } else {
            return el;
          }
        });
        state.addresses = [...updateAddresses];
      })
      .addCase(updateAddress.pending, (state) => {
        state.addressUpdatedStatus = "pending";
      })
      .addCase(updateAddress.rejected, (state) => {
        state.addressUpdatedStatus = "fail";
      });
  },
});
export default addressSlice.reducer;
