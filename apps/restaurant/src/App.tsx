import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./component/Navbar";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import AddItem from "./component/AddItem";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import MyOrders from "./pages/MyOrders";

const App = () => {
  const user = useSelector((state: RootState) => state.user);
  const order = useSelector((state: RootState) => state.order);
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer />
      <Routes>
        {/* PUBLIC Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart/:id" element={<Cart />} />
        <Route path="/cart" element={<Cart />} />

        {/* PRIVATE Routes */}
        <Route path="/login" element={user.user ? <Home /> : <Login />} />
        <Route path="/register" element={user.user ? <Home /> : <Register />} />
        <Route
          path="/addItem"
          element={user.user?.isAdmin ? <AddItem /> : <Home />}
        />
        <Route
          path="/order"
          element={
            user.user ? (
              order.currentOrder ? (
                <Order />
              ) : (
                <MyOrders />
              )
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/myOrders"
          element={user.user ? <MyOrders /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
