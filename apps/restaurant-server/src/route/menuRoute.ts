import express from "express";
import { addItem } from "../controller/menuController";
import { isAdmin } from "../controller/userController";

const menuRoute = express.Router();

menuRoute.post("/addItem", isAdmin, addItem);

export default menuRoute;
