import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import itemReducer from "./item/itemSlice";
import cartReducer from "./cart/cartSlice";
import addressReducer from "./address/addressSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    item: itemReducer,
    cart: cartReducer,
    address: addressReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
