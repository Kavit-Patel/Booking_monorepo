import mongoose from "mongoose";

export interface Iaddress {
  _id: string;
  user: mongoose.Types.ObjectId;
  name: string;
  society: string;
  houseNumber: string;
  city: string;
  state: string;
  pincode: string;
  mobile: string;
}

const addressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  society: String,
  houseNumber: Number,
  city: String,
  state: String,
  pincode: Number,
  mobile: { type: String },
});
export const addressModel = mongoose.model<Iaddress>("Address", addressSchema);
