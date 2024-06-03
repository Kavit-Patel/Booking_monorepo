import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { fetchOrders } from "../store/order/orderApi";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const order = useSelector((state: RootState) => state.order);
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    const orderFetch = async () => {
      if (user.user) {
        await dispatch(fetchOrders(user.user._id));
      }
    };
    orderFetch();
  }, [dispatch, user.user]);
  return (
    <div className="w-full min-h-96 max-h-[32rem]  flex flex-col items-center p-4">
      {order.orders.length === 0 ? (
        <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
          <h2>You Don't Have Any orders </h2>
          <Link className="text-blue-600" to="/menu">
            Generate One
          </Link>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center gap-2 ">
          <h2 className="text-center">Orders</h2>
          {order.orders.map((el, i) => (
            <div
              key={el._id}
              className="w-[80%] bg-slate-300 flex justify-between items-center gap-3 p-4"
            >
              <span>{i + 1}</span>
              <span>{el._id}</span>
              <span>${el.total}</span>
              <span>{el.payment.payStatus}</span>
              <button
                disabled={el.payment.payStatus === "Pending" ? false : true}
                className={`px-3 py-2 bg-green-400 rounded-md ${el.payment.payStatus === "Pending" ? " transition-all hover:scale-105 hover:bg-green-500 active:scale-95" : ""}`}
              >
                {el.payment.payStatus === "Pending" ? "PayNow" : "Completed"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
