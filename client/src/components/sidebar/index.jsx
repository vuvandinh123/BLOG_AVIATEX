import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import logo from "../../assets/logo.png"
const Siderbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleChangeMenu = (e) => {
    if (e.target.checked) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };
  return (
    <div>
      <div
        className={` fixed z-50 shadow-xl left-0 right-0 lg:right-auto lg:w-[100px]  flex lg:flex-col transition-all duration-200  items-center p-4 py-3 justify-between lg:h-[100vh] ${
          isOpen ? "bg-blue-500" : "bg-white"
        }`}
      >
        <div className="flex flex-row-reverse lg:flex-col items-center basis-1/2  justify-between">
          <div className=" shrink-0 translate-x-[50%] lg:translate-x-0">
            <Link className={`${isOpen && "hidden"}`} to={"/"}>
              <img
                className="w-[50px] lg:w-full h-full"
                src={logo}
                alt=""
              />
            </Link>
          </div>
          <div>
            <label
              className="btn-bar group cursor-pointer p-5 block"
              htmlFor="bar"
            >
              <input
                onChange={handleChangeMenu}
                type="checkbox"
                checked={isOpen}
                id="bar"
                className="hidden"
              />
              <div
                className={`screen1_menu_hamburger group-hover:before:bg-blue-600 group-hover:after:bg-blue-600 group-hover:bg-blue-600 ${
                  isOpen && "before:!bg-white after:!bg-white"
                }`}
              ></div>
            </label>
          </div>
        </div>

        <div className="flex lg:flex-col gap-2 basis-1/2 items-center justify-end">
          <Link to={"/tim-kiem"} onClick={() => setIsOpen(false)}>
            <IoSearch
              className={`${
                isOpen ? " text-white" : "text-gray-700"
              } cursor-pointer hover:text-black`}
              size={25}
            ></IoSearch>
          </Link>
          <div>
            <ul className="flex list-none pl-0 text-gray-600 gap-2 items-center">
              <li className={`${isOpen && "text-white"} lg:hidden`}>|</li>
              <li
                className={`text-blue-500 font-bold ${isOpen && "text-white"}`}
              >
                VN
              </li>
            </ul>
          </div>
        </div>
        {isOpen && <Menu isOpen={isOpen} setIsOpen={setIsOpen}></Menu>}
      </div>
    </div>
  );
};

export default Siderbar;
