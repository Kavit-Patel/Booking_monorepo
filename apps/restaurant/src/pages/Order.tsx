import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { Link } from "react-router-dom";
import Loader from "../component/Loader";
import { generatePaymentIntent } from "../store/payment/paymentApi";
import { useEffect } from "react";

const Order = () => {
  const dispatch = useDispatch<AppDispatch>();
  const order = useSelector((state: RootState) => state.order);
  const user = useSelector((state: RootState) => state.user);
  const payment = useSelector((state: RootState) => state.payment);
  const handlePayment = async () => {
    if (user.user && order.currentOrder) {
      await dispatch(
        generatePaymentIntent({
          userId: user.user._id,
          orderId: order.currentOrder._id,
          amount: order.currentOrder.total,
        })
      );
    }
  };
  useEffect(() => {
    if (payment.paymentIntent) {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
        amount: payment.paymentIntent.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Acme Corp", //your business name
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: payment.paymentIntent.paymentIntent, //This is a sample Order ID. Pass the id obtained in the response of Step 1
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
    }
  });
  return (
    <div className="w-full h-full  p-4 flex justify-center items-center">
      <div className="w-full md:w-[60%] h-full flex flex-col gap-2 py-12 px-4">
        <h2 className="text-lg md:text-xl font-semibold">Summary</h2>
        {order.currentOrder ? (
          order.orderGeneratedStatus === "pending" ? (
            <div className="w-full flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <div className="w-full h-full flex flex-col gap-3 p-3  border border-black">
              {order.currentOrder.products.map((product) => (
                <div
                  key={product._id}
                  className="w-full h-[50%] flex items-center gap-1 md:gap-3 rounded-md bg-[#f7f6f3] px-1 md:px-2 py-2"
                >
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
        <button
          onClick={() => handlePayment()}
          className="w-[50%] md:w-[40%] self-center mt-10 px-4 py-2 rounded-md hover:text-white bg-green-400 transition-all active:scale-95 hover:scale-105 hover:bg-green-700"
        >
          PayNow
        </button>
      </div>
    </div>
  );
};

export default Order;
