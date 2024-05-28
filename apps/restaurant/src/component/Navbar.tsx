import { useEffect, useState } from "react";
import { BsCartCheckFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState<string>("");
  const [view, setView] = useState<boolean>(false);
  useEffect(() => {
    const windowResize = () => {
      if (window.innerWidth > 767) {
        setView(false);
      }
    };
    windowResize();
    window.addEventListener("resize", windowResize);
    return () => {
      window.removeEventListener("resize", windowResize);
    };
  }, []);
  return (
    <div className="w-full bg-[#e9e8e3] px-4 h-9 flex items-center">
      <div className="w-full h-full flex justify-between items-center">
        <div className="w-[30%]">
          <img className="h-6" src="/images/logo.png" alt="" />
        </div>
        <div
          onClick={() => setView((prev) => !prev)}
          className={`${view ? "" : ""} md:hidden`}
        >
          <GiHamburgerMenu />
        </div>
        <div
          className={`md:flex list-none text-xs ${view ? "flex flex-col justify-center items-center gap-2 absolute top-9 left-0 w-full h-[calc(100vh-40px)] bg-[#E5E5E5]" : "hidden  w-[70%]  h-full justify-end items-center "} `}
        >
          <Link
            to="/"
            onClick={() => setActive("Home")}
            className={`w-28 h-9 transition-all hover:font-semibold flex justify-center items-center cursor-pointer ${active === "Home" ? " text-sm rounded-md bg-[#FC8A06] font-semibold text-white" : ""}`}
          >
            Home
          </Link>
          <Link
            to="/menu"
            onClick={() => setActive("Browse")}
            className={`w-28 h-9 transition-all hover:font-semibold  flex justify-center items-center cursor-pointer ${active === "Browse" ? " text-sm rounded-md bg-[#FC8A06] font-semibold text-white" : ""}`}
          >
            Browse Menu
          </Link>
          <Link
            to="#"
            onClick={() => setActive("About")}
            className={`w-28 h-9 transition-all hover:font-semibold  flex justify-center items-center cursor-pointer ${active === "About" ? " text-sm rounded-md bg-[#FC8A06] font-semibold text-white" : ""}`}
          >
            About
          </Link>
          <Link
            to="#"
            onClick={() => setActive("Cart")}
            className={`w-28 h-9 transition-all hover:font-semibold  flex justify-center items-center cursor-pointer ${active === "Cart" ? " text-sm rounded-md bg-[#FC8A06] font-semibold text-white" : ""}`}
          >
            <span className="text-sm mr-1">
              <BsCartCheckFill />
            </span>
            <span>Cart</span>
          </Link>
          <Link
            to="#"
            onClick={() => setActive("login")}
            className={`w-28 h-9 transition-all hover:font-semibold  flex justify-center items-center cursor-pointer ${active === "login" ? " text-sm rounded-md bg-[#FC8A06] font-semibold text-white" : ""}`}
          >
            Login/Sign-up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
