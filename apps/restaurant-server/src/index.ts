import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { db_connect } from "./db/db_connect";
import { errorMiddleware } from "./utility/errorHandler";
import userRouter from "./route/userRoute";
import cookieParser from "cookie-parser";
import menuRoute from "./route/menuRoute";

const app = express();
config();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const allowed_Origins = process.env.CORS_URL
  ? process.env.CORS_URL.split(",")
  : [];
console.log(allowed_Origins);
app.use(cors());
// app.use(
//   cors({
//     origin: (origin, callBack) => {
//       console.log("origin", origin);
//       if (!origin || allowed_Origins.indexOf(origin) === -1) {
//         return callBack(
//           new Error(`Cor's Policy doesn't allow ${origin}`),
//           false
//         );
//       }
//       return callBack(null, true);
//     },
//     credentials: true,
//   })
// );

db_connect();
app.use("/api", userRouter);
app.use("/api", menuRoute);

app.use(errorMiddleware);
app.listen(4000, () => console.log("Express Connected...."));
