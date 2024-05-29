import { createSlice } from "@reduxjs/toolkit";
import { autoLogin, loginUser, registerUser } from "./userApi";

export interface Iuser {
  id: string;
  name: string;
  isAdmin: boolean;
  email: string;
  password: string;
  image: string;
  liked: string[];
  disLiked: string[];
  reviews: string[];
}
interface IinitialState {
  user: Iuser | null;
  loginStatus: "idle" | "pending" | "success" | "false";
  registrationStatus: "idle" | "pending" | "success" | "false";
  autoLoginStatus: "idle" | "pending" | "success" | "false";
}
const initialState: IinitialState = {
  user: null,
  loginStatus: "idle",
  registrationStatus: "idle",
  autoLoginStatus: "idle",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginStatus = "success";
        state.user = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loginStatus = "pending";
      })
      .addCase(loginUser.rejected, (state) => {
        state.loginStatus = "false";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registrationStatus = "success";
        state.user = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.registrationStatus = "pending";
      })
      .addCase(registerUser.rejected, (state) => {
        state.registrationStatus = "false";
      })
      .addCase(autoLogin.fulfilled, (state, action) => {
        state.autoLoginStatus = "success";
        state.user = action.payload;
      })
      .addCase(autoLogin.pending, (state) => {
        state.autoLoginStatus = "pending";
      })
      .addCase(autoLogin.rejected, (state) => {
        state.autoLoginStatus = "false";
      });
  },
});
export default userSlice.reducer;
