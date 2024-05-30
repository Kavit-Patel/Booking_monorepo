import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import itemReducer from "./item/itemSlice";

export const store = configureStore({
  reducer: { user: userReducer, item: itemReducer },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
