import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { db_connect } from "./db/db_connect";
import { errorMiddleware } from "./utility/errorHandler";
import userRouter from "./route/userRoute";
import cookieParser from "cookie-parser";
import menuRoute from "./route/menuRoute";
import cartRouter from "./route/cartRoute";
import orderRouter from "./route/orderRoute";
import addressRoute from "./route/addressRoute";
import Razorpay from "razorpay";
import paymentRouter from "./route/paymentRoute";

const app = express();
config();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const allowed_Origins = process.env.CORS_URL
  ? process.env.CORS_URL.split(",")
  : [];
console.log(allowed_Origins);
// app.use(cors());
app.use(
  cors({
    origin: (origin, callBack) => {
      if (!origin || allowed_Origins.indexOf(origin) === -1) {
        return callBack(
          new Error(`Cor's Policy doesn't allow ${origin}`),
          false
        );
      }
      return callBack(null, true);
    },
    credentials: true,
  })
);

db_connect();
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});
app.use("/api", userRouter);
app.use("/api", menuRoute);
app.use("/api", cartRouter);
app.use("/api", orderRouter);
app.use("/api", addressRoute);
app.use("/api", paymentRouter);

app.use(errorMiddleware);
app.listen(4000, () => console.log("Express Connected...."));
