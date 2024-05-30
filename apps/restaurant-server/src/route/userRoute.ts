import express from "express";
import {
  logOutUser,
  loginUser,
  registerUser,
  userAutoLogin,
} from "../controller/userController";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/autoLogin", userAutoLogin);
userRouter.get("/logOut", logOutUser);

export default userRouter;
