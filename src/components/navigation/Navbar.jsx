import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { FaUser, FaBars } from "react-icons/fa";
import { FaCartShopping, FaXmark } from "react-icons/fa6";
import { motion } from "framer-motion";


import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
 
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const {logout,user} = useContext(AuthContext);
  const navigate = useNavigate();



  const isLinkActive = (path) => {
    return pathname === path;
  };

  const handleUserClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = (e) => {
    logout();
    setShowDropdown(false);
    e.preventDefault();
  };

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      setVisible(currentScrollPos <= 50 || currentScrollPos < prevScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <motion.div
      className={`w-full fixed top-0 z-[100] ${
        visible ? "bg-white" : "hidden"
      }`}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="hidden lg:flex px-48 py-10 w-full justify-between items-center">
        <Link
          to="/"
          className="flex align-middle items-center gap-2 text-gray-700 transition-transform transform hover:scale-110 hover:opacity-80"
        >
          <h2 className="font-bold text-2xl"><span className="text-blue-700">SH</span>ub</h2>
        </Link>
        <div className="flex items-center lg:gap-10 gap-4">
          <Link
            to="/"
            className={`${
              isLinkActive("/") ? "text-black font-bold" : "text-gray-500"
            } hover:text-blue-500 transition-colors duration-300 hover:scale-110 hover:opacity-80`}
          >
            Home
          </Link>
          <Link
            to="/guide/list"
            className={`${
              isLinkActive("/guide/list")
                ? "text-black font-bold"
                : "text-gray-500"
            } hover:text-blue-500 transition-colors duration-300 hover:scale-110 hover:opacity-80`}
          >
            Guide
          </Link>
          <Link
            to="/user/meetings"
            className={`${
              isLinkActive("/user/meetings")
                ? "text-black font-bold"
                : "text-gray-500"
            } hover:text-blue-500 transition-colors duration-300 hover:scale-110 hover:opacity-80`}
          >
            Meetings
          </Link>
          <Link
            to="/user/account"
            className={`${
              isLinkActive("/user/account")
                ? "text-black font-bold"
                : "text-gray-500"
            } hover:text-blue-500 transition-colors duration-300 hover:scale-110 hover:opacity-80`}
          >
            Account
          </Link>
          
        </div>

        <div className="relative flex lg:gap-4">
          <div
            className={`w-fit h-fit border-[1.5px] ${user&&user.profile?'':'p-2'} rounded-full border-gray-500 hover:scale-110 transition-transform transform cursor-pointer`}
            onClick={handleUserClick}
          >
           {
            user&& 
              user.profile?
                <img src={user.profile} className="w-10 h-10 object-cover rounded-full"/>
               :<FaUser className="text-2xl text-gray-500" />
           }
          </div>
          {showDropdown && (
            <div className={`absolute top-12 ${user?'right-24':'right-0'} bg-white border border-gray-400 p-2 w-36 rounded shadow-md flex flex-col items-center`}>
              {
                !user &&
                <Link
                to="/signup"
                className="block py-1 px-4 hover:bg-gray-50 hover:font-semibold text-gray-800 border-b border-gray-300 w-full text-center"
              >
                Sign Up
              </Link>
              }
              {
                !user &&
                <Link
                to="/signin"
                className="block py-1 px-4 hover:font-semibold text-gray-800 border-b hover:bg-gray-50 border-gray-300 w-full text-center"
              >
                Sign In
              </Link>
              }
              {
                user && 
                <button
                onClick={handleLogout}
                className="block py-1 px-4 hover:font-semibold hover:bg-gray-50 text-gray-800 border-gray-300 w-full text-center"
              >
                Logout
              </button>
              }
            </div>
          )}
          {
          user && <h2 className="mt-1.5 text-lg font-semibold text-gray-500">{(user.username).replace(/\b\w/g, (char) => char.toUpperCase())}</h2>
          }
        </div>
        
      </div>

      <div className="lg:hidden px-10 py-10 flex justify-between items-center">
        <Link
          to="/"
          className="flex align-middle items-center gap-2 transition-transform transform hover:scale-110 hover:opacity-80"
        >
          <h2 className="font-bold text-2xl">Shub</h2>
        </Link>

        <div className="flex items-center justify-between gap-3">
          
          <div className="relative">
            <div
              className="w-fit h-fit border-[1.5px] p-2 rounded-full border-gray-500 hover:scale-110 transition-transform transform cursor-pointer"
              onClick={handleUserClick}
            >
              <FaUser className="text-2xl text-gray-500" />
            </div>
            {showDropdown && (
              <div className="absolute top-12 right-0 bg-white border border-gray-300 p-2 w-32 rounded shadow-md">
                <Link
                  to="/signup"
                  className="block py-1 px-4 hover:font-semibold text-gray-800 hover:text-amber-500 hover:scale-105 transition-colors duration-300 rounded border-b border-gray-300"
                >
                  SignUp
                </Link>
                <Link
                  to="/signin"
                  className="block py-1 px-4 hover:font-semibold text-gray-800 hover:text-amber-500 hover:scale-105 transition-colors duration-300 rounded border-b border-gray-300"
                >
                  SignIn
                </Link>
                <button
                  onClick={handleLogout}
                  className="block py-1 px-4 hover:font-semibold text-gray-800 hover:text-red-500 hover:scale-105 transition-colors duration-300 rounded border-b border-gray-300"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
          <FaBars
            className="text-3xl cursor-pointer"
            onClick={handleDrawerToggle}
          />
        </div>
      </div>

      

      {/* Drawer for Mobile */}
      {isDrawerOpen && (
        <motion.div
          className="lg:hidden fixed inset-0 bg-black/80 bg-opacity-30 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="bg-white h-full w-72 p-4 fixed top-0 left-0"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-end">
              <FaXmark
                className="text-3xl cursor-pointer"
                onClick={handleDrawerToggle}
              />
            </div>
            <motion.div
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <Link
                to="/"
                className={`${
                  isLinkActive("/") ? "text-black font-bold" : "text-gray-500"
                } hover:text-blue-500 transition-colors duration-300`}
              >
                Home
              </Link>
              <Link
                to="/guide/list"
                className={`${
                  isLinkActive("/guide/list")
                    ? "text-black font-bold"
                    : "text-gray-500"
                } hover:text-blue-500 transition-colors duration-300`}
              >
                Guide
              </Link>
              <Link
                to="/user/meetings"
                className={`${
                  isLinkActive("/user/meetings")
                    ? "text-black font-bold"
                    : "text-gray-500"
                } hover:text-blue-500 transition-colors duration-300`}
              >
                Meetings
              </Link>
              <Link
                to="/user/account"
                className={`${
                  isLinkActive("/user/account")
                    ? "text-black font-bold"
                    : "text-gray-500"
                } hover:text-blue-500 transition-colors duration-300`}
              >
                Account
              </Link>
              
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Navbar;
