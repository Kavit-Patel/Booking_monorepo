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

const App = () => {
  const user = useSelector((state: RootState) => state.user);
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart/:id" element={<Cart />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={user.user ? <Home /> : <Login />} />
        <Route path="/register" element={user.user ? <Home /> : <Register />} />
        <Route
          path="/addItem"
          element={user.user?.isAdmin ? <AddItem /> : <Home />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
