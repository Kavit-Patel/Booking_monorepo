import { useEffect, useState } from "react";
import { BsCartCheckFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { AppDispatch, RootState } from "../store/store";
import Profile from "./Profile";
import { autoLogin } from "../store/user/userApi";

const Navbar = () => {
  const location = useLocation();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const [active, setActive] = useState<string>("");
  const [view, setView] = useState<boolean>(false);
  const [userProfileMenu, setUserProfileMenu] = useState<boolean>(false);
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
  useEffect(() => {
    if (location.pathname === "/") {
      setActive("");
    }
    if (location.pathname.includes("cart")) {
      setActive("Cart");
    }
  }, [location.pathname]);
  useEffect(() => {
    const handleProfileMenu = () => {
      setUserProfileMenu(false);
    };
    window.addEventListener("click", () => handleProfileMenu());
    return () => {
      window.removeEventListener("click", () => handleProfileMenu());
    };
  }, []);
  useEffect(() => {
    const fetchUser = async () => {
      if (!user.user) {
        await dispatch(autoLogin());
      }
    };
    fetchUser();
  }, [dispatch, user.user]);
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
            onClick={() => {
              setActive("Home");
              setView(false);
            }}
            className={`w-28 h-9 transition-all hover:font-semibold flex justify-center items-center cursor-pointer ${active === "Home" ? " text-sm rounded-md bg-[#FC8A06] font-semibold text-white" : ""}`}
          >
            Home
          </Link>
          <Link
            to="/menu"
            onClick={() => {
              setActive("Browse");
              setView(false);
            }}
            className={`w-28 h-9 transition-all hover:font-semibold  flex justify-center items-center cursor-pointer ${active === "Browse" ? " text-sm rounded-md bg-[#FC8A06] font-semibold text-white" : ""}`}
          >
            Browse Menu
          </Link>
          <Link
            to="#"
            onClick={() => {
              setActive("About");
              setView(false);
            }}
            className={`w-28 h-9 transition-all hover:font-semibold  flex justify-center items-center cursor-pointer ${active === "About" ? " text-sm rounded-md bg-[#FC8A06] font-semibold text-white" : ""}`}
          >
            About
          </Link>
          <Link
            to="/cart"
            onClick={() => {
              setActive("Cart");
              setView(false);
            }}
            className={`w-28 h-9 transition-all hover:font-semibold  flex justify-center items-center cursor-pointer ${active === "Cart" ? " text-sm rounded-md bg-[#FC8A06] font-semibold text-white" : ""}`}
          >
            <span className="text-sm mr-1">
              <BsCartCheckFill />
            </span>
            <span>Cart</span>
          </Link>
          {user.user ? (
            <div className="relative">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setUserProfileMenu((prev) => !prev);
                }}
              >
                <img
                  className="w-7 h-7 rounded-full"
                  src={user.user.image}
                  alt=""
                />
              </div>
              {userProfileMenu && (
                <div className="z-20 absolute top-10 right-0">
                  <Profile isAdmin={user.user.isAdmin} />
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setActive("login")}
              className={`w-28 h-9 transition-all hover:font-semibold  flex justify-center items-center cursor-pointer ${active === "login" ? " text-sm rounded-md bg-[#FC8A06] font-semibold text-white" : ""}`}
            >
              Login/Sign-up
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
