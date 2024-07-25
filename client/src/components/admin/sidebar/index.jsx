/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { LogOut } from "../../../service/auth";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getDataUser, removeCookieAuth } from "../../../utils";
import { toast } from "sonner";
import { menuData } from "./menuData";
import logo from "../../../assets/logo.png";
const SidebarAmin = ({ openMenu ,setOpenMenu}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    name: "",
  });
  useEffect(() => {
    const user = getDataUser();
    if (user) setUser(user);
  }, []);
  const handleCLickLogout = async () => {
    try {
      const res = await LogOut();
      if (res.status === 200) {
        navigate("/login");
        toast.success(`Đăng xuất thành công`);
        removeCookieAuth();
      }
    } catch (error) {
      toast.error(`Đăng xuất thất bại ${error}`);
    }
  };
  return (
    <div>
      <div onClick={() => {
        setOpenMenu(!openMenu);
      }} className={`fixed ${!openMenu && "hidden"} lg:hidden top-0 left-0 right-0 bottom-0 w-full h-screen z-40 bg-black opacity-30`}></div>
      <aside
        className={`ml-[-100%] ${
          openMenu && "!ml-0"
        } fixed  top-0 pb-3 z-50 px-6 w-[70%] flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]`}
      >
        <div>
          <div className="mt-8  text-center">
            <div className="w-20 h-20  overflow-hidden mx-auto">
              <Link to={"/"}>
                <img src={logo} alt="" />
              </Link>
            </div>
            <h5 className="hidden mt-4 capitalize text-xl font-semibold text-gray-600 lg:block">
              {user.name}
            </h5>
            <p className="text-gray-500  text-[12px]">@{user.username}</p>
          </div>
          <ul className="space-y-2 list-none pl-0 tracking-wide mt-8">
            {menuData.map((item) => (
              <li key={item.id} onClick={() => setOpenMenu(!openMenu)}>
                <NavLink
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    "relative px-4 py-3 flex items-center space-x-4 rounded-xl " +
                    (isActive
                      ? " text-white bg-gradient-to-r from-sky-600 to-cyan-400"
                      : "")
                  }
                >
                  {item.icon}
                  <span className="ml-4">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
          <button
            onClick={handleCLickLogout}
            className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="group-hover:text-gray-700">Đăng xuất</span>
          </button>
        </div>
      </aside>
    </div>
  );
};

export default SidebarAmin;
