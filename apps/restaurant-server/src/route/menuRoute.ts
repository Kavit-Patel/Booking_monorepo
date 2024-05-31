import express from "express";
import { addItem, getItem, getItems } from "../controller/menuController";
import { isAdmin } from "../controller/userController";

const menuRoute = express.Router();

menuRoute.post("/addItem", isAdmin, addItem);
menuRoute.get("/getItems", getItems);
menuRoute.get("/getItem/:id", getItem);

export default menuRoute;
