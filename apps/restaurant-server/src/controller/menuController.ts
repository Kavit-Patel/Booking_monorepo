import { NextFunction, Request, Response, response } from "express";
import errorHandler from "../utility/errorHandler";
import { menuModel } from "../model/menuModel";

export const addItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, image, stock, price } = req.body;
    console.log("first", title, image, stock, price);
    if (!title || !image || !stock || !price)
      return next(new errorHandler(403, "Provide all details !"));
    const newItem = await menuModel.create({ title, image, stock, price });
    if (!newItem) return next(new errorHandler(500, "Item Addition failed !"));
    return res.status(201).json({
      success: true,
      message: "Item added successfully !",
      response: newItem,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Adding new Item Fail !" });
  }
};
export const getItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const items = await menuModel.find({});
    return res.status(200).json({
      success: true,
      message:
        items.length === 0
          ? "Items Fetched Successfully,but empty !"
          : "Items Fetched successfully !",
      response: items,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Fetching items Fail !" });
  }
};

export const getItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) return next(new errorHandler(403, "No Item id given !"));
    const item = await menuModel.findById(id);
    if (!item) return next(new errorHandler(403, "Item  doesn't exists !"));
    return res.status(200).json({
      success: true,
      message: "Item Fetched successfully !",
      response: item,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Fetching item Fail !" });
  }
};
