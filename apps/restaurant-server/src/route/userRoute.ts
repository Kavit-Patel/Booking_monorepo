import express from "express";
import {
  loginUser,
  registerUser,
  userAutoLogin,
} from "../controller/userController";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/autoLogin", userAutoLogin);

export default userRouter;
