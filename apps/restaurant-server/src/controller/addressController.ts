import { NextFunction, Request, Response, response } from "express";
import errorHandler from "../utility/errorHandler";
import { addressModel } from "../model/addressModel";

export const addNewAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const { name, society, houseNumber, city, state, pincode, mobile } =
      req.body;
    if (
      !userId ||
      !name ||
      !society ||
      !houseNumber ||
      !city ||
      !state ||
      !pincode ||
      !mobile
    )
      return next(new errorHandler(403, "Provide All Details !"));
    const newAddress = await addressModel.create({
      user: userId,
      name,
      society,
      houseNumber,
      city,
      state,
      pincode,
      mobile,
    });
    if (!newAddress)
      return next(new errorHandler(500, "Address Creation failed !"));
    return res.status(201).json({
      success: true,
      message: "New Address Created Successfully !",
      response: newAddress,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "New Address Addition Failed !",
    });
  }
};

export const updateAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, addressId } = req.params;
    const { name, society, houseNumber, city, state, pincode, mobile } =
      req.body;
    if (
      !userId ||
      !name ||
      !society ||
      !houseNumber ||
      !city ||
      !state ||
      !pincode ||
      !mobile
    )
      return next(new errorHandler(403, "Provide All Details !"));
    const updatedAddress = await addressModel.findByIdAndUpdate(
      addressId,
      {
        name,
        society,
        houseNumber,
        city,
        state,
        pincode,
        mobile,
      },
      { new: true }
    );
    if (!updatedAddress)
      return next(new errorHandler(500, "Address Updation failed !"));
    return res.status(201).json({
      success: true,
      message: "Address Updated Successfully !",
      response: updatedAddress,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "New Address Addition Failed !",
    });
  }
};

export const fetchAddresses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    if (!userId) return next(new errorHandler(403, "Provide UserId !"));
    const addresses = await addressModel.find({ user: userId });
    return res.status(200).json({
      success: true,
      message:
        addresses.length === 0
          ? "Addresses Fetched But Empty !"
          : "Addresses Fetched Successfully !",
      response: addresses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Address Fetching Failed !",
    });
  }
};
