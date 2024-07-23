import { LuLayoutDashboard } from "react-icons/lu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaChevronUp, FaRegUser } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import { BiHomeCircle } from "react-icons/bi";
import { RiTeamLine } from "react-icons/ri";
import { BsFillStarFill, BsFillCalendarCheckFill } from "react-icons/bs";
import { MdRequestPage } from "react-icons/md";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
    const { user, logout } = useContext(AuthContext);
  const { pathname } = useLocation();
  const isLinkActive = (path) => {
    return pathname.startsWith(path);
  };
  const [isMenuOpen, setMenuOpen] = useState(true);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

 
  return (
    <>
      <div className="md:border-r left-0 md:w-[17.5rem] md:h-[84vh] overflow-y-auto p-3 lg:flex flex-col gap-y-2">
        <h2 className="text-xl font-bold my-2"><span className="text-blue-700">SH</span><span className="text-gray-700">ub</span></h2>
        <Link to="/">
          <div
            className={`text-gray-500 hover:bg-gray-100 w-full px-4 transition-colors duration-300 hover:opacity-80 flex items-center gap-x-4 py-[10px] rounded-md cursor-pointer`}
          >
            <BiHomeCircle size={24} />
            <span className="text-base">Home</span>
          </div>
        </Link>

        <div onClick={toggleMenu}>
          <div
            className={`${
              isMenuOpen ? "text-gray-500 bg-gray-50" : "text-gray-500"
            } hover:bg-gray-100 w-full px-4 transition-colors duration-300 hover:opacity-80 flex items-center gap-x-4 py-[10px] rounded-md cursor-pointer`}
          >
            <RiTeamLine size={24} />
            <span className="text-base">Guide</span>
            {isMenuOpen ? (
              <FaChevronUp
                className="ml-auto text-lg transition duration-300"
                size={12}
              />
            ) : (
              <FaChevronUp
                size={12}
                className="ml-auto text-lg transform rotate-180 transition duration-300"
              />
            )}
          </div>
        </div>

        {isMenuOpen && (
          <>
            <div className="ml-8 transition duration-300 transform">
              <MenuLink
                isMenuOpen={isLinkActive("/guide/list")}
                to="/guide/list"
                icon={<RiTeamLine size={20} />}
                text="Guide List"
              />
              {/* <MenuLink
                to="/guide/favorites"
                isMenuOpen={isLinkActive("/guide/favorites")}
                icon={<BsFillStarFill size={20} />}
                text="Favorites"
              /> */}
              <MenuLink
                to="/guide/requests"
                isMenuOpen={isLinkActive("/guide/requests")}
                icon={<MdRequestPage size={20} />}
                text="Requests"
              />
            </div>
          </>
        )}

        <Link to="/user/meetings">
          <div
            className={`${
              isLinkActive("/guide/meetings")
                ? "text-blue-500 bg-blue-50"
                : "text-gray-500"
            } hover:bg-gray-100 w-full px-4 transition-colors duration-300 hover:opacity-80 flex items-center gap-x-4 py-[10px] rounded-md cursor-pointer`}
          >
            <BsFillCalendarCheckFill size={24} />
            <span className="text-base">Meetings</span>
          </div>
        </Link>
      </div>

      <div className="md:border-r left-0 md:w-[17.5rem] md:h-[16vh] p-3 lg:flex flex-col gap-y-2">
        <Link to="/user/account">
          <div
            className={`${
              isLinkActive("/user/account")
                ? "text-blue-500 bg-blue-50"
                : "text-gray-500"
            } hover:bg-gray-100 w-full px-4 transition-colors duration-300 hover:opacity-80 flex items-center gap-x-4 py-[10px] rounded-md cursor-pointer`}
          >
            <FaRegUser size={24} />
            <span className="text-base">Account</span>
          </div>
        </Link>
        <div
          onClick={() => {
            logout();
            window.location.reload();
          }}
        >
          <div
            className={`hover:bg-gray-100 w-full px-4 transition-colors duration-300 hover:opacity-80 flex items-center gap-x-4 py-[10px] rounded-md cursor-pointer`}
          >
            <IoLogOutOutline className="text-red-400" size={24} />
            <span className="text-base text-red-400">Logout</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;


const MenuLink = ({ to, icon, text, isMenuOpen }) => (
    <Link
      to={to}
      className={`${
        isMenuOpen ? "text-blue-500" : "text-gray-500"
      } hover:bg-gray-100 w-full px-4 transition-colors duration-300 hover:opacity-80 flex items-center gap-x-4 py-[10px] rounded-md cursor-pointer`}
    >
      {icon}
      <span className="text-base">{text}</span>
    </Link>
  );
