import express from "express";
import { generateOrder } from "../controller/orderController";

const orderRouter = express.Router();

orderRouter.post("/generateOrder/:userId", generateOrder);

export default orderRouter;
