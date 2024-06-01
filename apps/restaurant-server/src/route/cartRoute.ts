import express from "express";
import {
  addToCart,
  getCart,
  removeItem,
  syncLsDb,
} from "../controller/cartController";

const cartRouter = express.Router();

cartRouter.post("/addToCart/:userId/:itemId", addToCart);
cartRouter.get("/getCart/:userId", getCart);
cartRouter.post("/syncLsDb/:userId", syncLsDb);
cartRouter.get("/removeItem/:userId/:itemId", removeItem);

export default cartRouter;
