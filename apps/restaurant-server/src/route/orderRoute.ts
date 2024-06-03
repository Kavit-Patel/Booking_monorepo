import express from "express";
import { fetchUserOrders, generateOrder } from "../controller/orderController";

const orderRouter = express.Router();

orderRouter.post("/generateOrder/:userId", generateOrder);
orderRouter.get("/fetchUserOrders/:userId", fetchUserOrders);

export default orderRouter;
