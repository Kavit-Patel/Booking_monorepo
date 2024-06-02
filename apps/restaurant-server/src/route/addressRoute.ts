import express from "express";
import {
  addNewAddress,
  fetchAddresses,
  updateAddress,
} from "../controller/addressController";

const addressRoute = express.Router();

addressRoute.post("/addNewAddress/:userId", addNewAddress);
addressRoute.post("/updateAddress/:userId/:addressId", updateAddress);
addressRoute.get("/fetchAddresses/:userId", fetchAddresses);

export default addressRoute;
