import React, { useEffect } from "react";

import CoffeeLogo from "../assets/images/figilante-removebg.png";
import Search from "../assets/logo/search.svg";
import Chat from "../assets/logo/chat.svg";
import { profileAction } from "../redux/action/profile";
import { Link, useNavigate } from "react-router-dom";
import { logout as LogoutAction } from "../redux/reducers/auth";
import { useDispatch, useSelector } from "react-redux";

const NavAdmin = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const Logout = () => {
    dispatch(LogoutAction());
    return navigate("/login");
  };

  useEffect(() => {
    dispatch(profileAction());
  }, [dispatch, token]);

  return (
    <nav className="navbar py-[15px] px-[10%] bg-[#e9d8a6]">
      <div className="flex-1 lg:flex-none">
        <div className="dropdown mr-[20px]">
          <div tabIndex={0} className="flex-none lg:hidden">
            <button className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
          <div
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <div className="flex flex-col w-full border-opacity-50 my-3 lg:hidden">
              <div className="grid mb-[5px] card place-items-center">
                <Link to="/">
                  <p
                    className={`text-[18px] font-semibold hover:text-black ${
                      props.home ? "text-black" : "text-[#6c757d]"
                    }`}
                  >
                    Home
                  </p>
                </Link>
              </div>
              <div className="grid mb-[5px] card place-items-center">
                <Link to="/product-admin">
                  <p
                    className={`text-[18px] font-semibold hover:text-black ${
                      props.product ? "text-black" : "text-[#6c757d]"
                    }`}
                  >
                    Product
                  </p>
                </Link>
              </div>
              <div className="grid mb-[5px] card place-items-center">
                <Link to="/orders">
                  <p
                    className={`text-[18px] font-semibold hover:text-black ${
                      props.orders ? "text-black" : "text-[#6c757d]"
                    }`}
                  >
                    Orders
                  </p>
                </Link>
              </div>
              <div className="grid mb-[5px] card place-items-center">
                <Link to="/dashboard">
                  <p
                    className={`text-[18px] font-semibold hover:text-black ${
                      props.dashboard ? "text-black" : "text-[#6c757d]"
                    }`}
                  >
                    Dashboard
                  </p>
                </Link>
              </div>
              <div className="block md:hidden">
                <div className="grid mb-[5px] card place-items-center">
                  <Link
                    to="/login"
                    className="btn btn-warning w-full capitalize btn-sm rounded-full"
                  >
                    Profile
                  </Link>
                </div>
                <div className="grid mb-[5px] card place-items-center">
                  <Link
                    to="/chat"
                    className="btn bg-warning-content w-full capitalize btn-sm rounded-full"
                  >
                    Chat
                  </Link>
                </div>
                <div className="grid mb-[5px] card place-items-center">
                  <Link
                    to="/sign-up"
                    className="btn btn-error w-full capitalize btn-sm rounded-full"
                  >
                    Logout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img src={CoffeeLogo} alt="logo-app" className="w-[150px]" />
      </div>
      <div className="hidden lg:flex flex-1 gap-x-[15px] ml-[10%]">
        <Link
          to="/"
          className={`${
            props.home ? "text-black font-semibold" : "text-[#6A4029]"
          }`}
        >
          Home
        </Link>

        <Link
          to="/product-admin"
          className={`${
            props.product ? "text-black font-semibold" : "text-[#6A4029]"
          }`}
        >
          Product
        </Link>

        <Link
          to="/orders"
          className={`${
            props.orders ? "text-black font-semibold" : "text-[#6A4029]"
          }`}
        >
          Orders
        </Link>

        <Link
          to="/dashboard"
          className={`${
            props.dashboard ? "text-black font-semibold" : "text-[#6A4029]"
          }`}
        >
          Dashboard
        </Link>
      </div>
      <div className="hidden md:flex flex items-center gap-x-[20px]">
        <div className="relative group">
          <img
            src={Search}
            alt=""
            className="group-hover:absolute group-hover:w-[17px]
             w-[20px] top-[25%] left-[5px]"
          />
          <input
            className="hidden group-hover:block outline-none border-[2px] rounded-[10px] border-black placeholder:text-black pl-[25px] py-1 w-[130px]"
            type="text"
            placeholder="Search"
          />
        </div>
        <Link to="/chat" className="cursor-pointer">
          <img src={Chat} alt="" className="w-[25px]" />
        </Link>
        <div className="dropdown dropdown-end border-[2px] border-black w-[45px] rounded-[50%]">
          <label tabIndex={0}>
            {user?.picture ? (
              <img
                src={user.picture}
                alt="Avatar"
                className="w-[40px] h-[40px] rounded-full cursor-pointer object-cover"
              />
            ) : (
              <img
                src={require("../assets/images/avatar.png")}
                alt="Avatar"
                className="w-[40px] h-[40px] rounded-full cursor-pointer object-cover"
              />
            )}
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <div onClick={Logout}>Logout</div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavAdmin;
