import express from "express";
import { addToCart, getCart } from "../controller/cartController";

const cartRouter = express.Router();

cartRouter.post("/addToCart/:userId/:itemId", addToCart);
cartRouter.get("/getCart/:userId", getCart);

export default cartRouter;
