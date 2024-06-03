import { NextFunction, Request, Response, response } from "express";
import errorHandler from "../utility/errorHandler";
import { orderModel } from "../model/orderModel";
import { cartModel } from "../model/cartModel";

// export const generateOrder = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//   } catch (error) {
//     return res
//       .status(500)
//       .json({
//         success: false,
//         message:
//           error instanceof Error ? error.message : "Order Generation Failed !",
//       });
//   }
// };
export const generateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const { cartIds, products, address, tax, shipping, subtotal, total } =
      req.body;
    const isValidCartIds = (arr: any) =>
      arr.every((item: string) => typeof item === "string");
    const isValidProducts = (arr: any) => {
      return arr.every(
        (item: any) =>
          typeof item.product === "string" &&
          typeof item.quantity === "number" &&
          typeof item.price === "number"
      );
    };
    if (
      !isValidCartIds(cartIds) ||
      !isValidProducts(products) ||
      !address ||
      !tax ||
      !shipping ||
      !subtotal ||
      !total
    )
      return next(new errorHandler(403, "Provide All Details !"));
    const newOrder = await orderModel.create({
      user: userId,
      products,
      address,
      tax,
      shipping,
      subtotal,
      total,
    });
    if (!newOrder)
      return next(new errorHandler(500, "Order Generation Failed !"));
    // remove user cart after order generation successfully
    await cartModel.deleteMany({ _id: { $in: cartIds } });

    const populatedNewOrder = await orderModel
      .findById(newOrder._id)
      .populate("products.product")
      .populate("address");
    return res.status(201).json({
      success: true,
      message: "Order Generated SuccessFully !",
      response: populatedNewOrder,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Order Generation Failed !",
    });
  }
};

export const fetchUserOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    if (!userId) return next(new errorHandler(403, "Provide userId !"));
    const userOrders = await orderModel.find({ user: userId });
    return res.status(200).json({
      success: true,
      message:
        userOrders.length === 0
          ? "Orders Fetched but Empty !"
          : "Orders Fetched Successfully !",
      response: userOrders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Order Fetching Failed !",
    });
  }
};
