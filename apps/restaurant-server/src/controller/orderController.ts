import { NextFunction, Request, Response, response } from "express";
import errorHandler from "../utility/errorHandler";
import { orderModel } from "../model/orderModel";

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
    const { products, address, tax, shipping, subtotal, total } = req.body;
    const isValidProducts = (arr: any) => {
      return (
        typeof arr.product === "string" &&
        typeof arr.quantity === "number" &&
        typeof arr.price === "number"
      );
    };
    if (
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
    return res
      .status(201)
      .json({
        success: true,
        message: "Order Generated SuccessFully !",
        response: newOrder,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Order Generation Failed !",
    });
  }
};
