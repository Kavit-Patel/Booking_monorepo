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
  const handlePayment = async (payId: string, amount: number) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Acme Corp", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: payId, //This is a sample Order ID. Pass the id obtained in the response of Step 1
      callback_url: `${import.meta.env.VITE_API}/api/pay` || "",
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "Khush Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    try {
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.log(error);
    }
  };
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
                onClick={() =>
                  handlePayment(
                    el.payment.payId.paymentIntent,
                    el.payment.payId.amount * 100
                  )
                }
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
