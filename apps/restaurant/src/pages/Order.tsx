import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Link } from "react-router-dom";
import Loader from "../component/Loader";

const Order = () => {
  // const dispatch = useDispatch<AppDispatch>();
  const order = useSelector((state: RootState) => state.order);
  console.log(order.currentOrder);
  return (
    <div className="w-full h-full  p-4 flex items-center">
      <div className="flex-1 h-full flex flex-col gap-2 py-12 px-4">
        <h2 className="text-lg md:text-xl font-semibold">Summary</h2>
        {order.currentOrder ? (
          order.orderGeneratedStatus === "pending" ? (
            <div className="w-full flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <div className="w-full h-full flex flex-col gap-3 p-3  border border-black">
              {order.currentOrder.products.map((product) => (
                <div className="w-full h-[50%] flex items-center gap-1 md:gap-3 rounded-md bg-[#f7f6f3] px-1 md:px-2 py-2">
                  <img
                    className="w-6 h-6 rounded-full"
                    src={product.product.image}
                    alt="img"
                  />
                  <h2 className="w-[55%]">{product.product.title}</h2>
                  <h2 className="">{product.quantity}</h2>
                  <h2 className=" ml-auto">${product.price}</h2>
                </div>
              ))}
              <div className="w-full p-2">
                <h2 className="font-semibold">Address:</h2>
                <p>{order.currentOrder.address.name}</p>
                <span>{order.currentOrder.address.city}</span>
                {";"}
                <span>{order.currentOrder.address.society}</span>
                {";"}
                <span>{order.currentOrder.address.pincode}</span>
                {";"}
                <span>{order.currentOrder.address.mobile}</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between px-2">
                  <p className="font-semibold">Subtotal</p>
                  <p>${order.currentOrder.subtotal}</p>
                </div>
                <div className="flex justify-between px-2">
                  <p>Tax</p>
                  <p>${order.currentOrder.tax}</p>
                </div>
                <div className="flex justify-between px-2">
                  <p>Shipping</p>
                  <p>${order.currentOrder.shipping}</p>
                </div>
                <div className="flex justify-between px-2 font-bold mt-4">
                  <p>Total</p>
                  <p>${order.currentOrder.total}</p>
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="w-full h-full flex flex-col gap-3 justify-center items-center">
            <h2>Current Order is not generated.</h2>
            <Link to="/cart" className="text-blue-600 cursor-pointer">
              Generate Order Here !
            </Link>
          </div>
        )}
      </div>
      <div className="flex-1 text-center">Payment</div>
    </div>
  );
};

export default Order;
