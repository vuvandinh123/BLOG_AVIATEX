/* eslint-disable react/prop-types */

import { NavLink } from "react-router-dom";

const Menu = ({ isOpen, setIsOpen }) => {
  const handleCloseMenu = () => {
    setIsOpen(false);
  };
  return (
    <div
      className={`${
        isOpen ? "opacity-100 visible" : "opacity-0  invisible"
      } transition-all duration-200 z-50 bg-white flex lg:items-center  bg-blue-white fixed left-0 lg:left-[97px] right-0 lg:top-0 top-[65px] bottom-0`}
    >
      <ul
        data-aos="fade-right"
        className="lg:ms-32 mt-5 ms-3 text-md lg:text-3xl lg:leading-10 uppercase font-bold text-gray-400"
      >
        <li data-aos="fade-right" data-aos-delay="0">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              "py-2 hover:text-blue-600 !transition-all !duration-300 hover:pl-7 block" +
              (isActive ? " !text-blue-600" : "")
            }
            onClick={handleCloseMenu}
          >
            Trang chủ
          </NavLink>
        </li>
        <li data-aos="fade-right" data-aos-delay="100">
          <NavLink
            className={({ isActive }) =>
              "py-2 hover:text-blue-600 !transition-all !duration-300 hover:pl-7 block" +
              (isActive ? " !text-blue-600" : "")
            }
            onClick={handleCloseMenu}
            to={"/ve-chung-toi"}
          >
            Giới thiệu
          </NavLink>
        </li>
        <li data-aos="fade-right" data-aos-delay="200">
          <NavLink
            className={({ isActive }) =>
              "py-2 hover:text-blue-600 !transition-all !duration-300 hover:pl-7 block" +
              (isActive ? " !text-blue-600" : "")
            }
            onClick={handleCloseMenu}
            to={"/hoat-dong"}
          >
            Lĩnh vực hoạt động
          </NavLink>
        </li>
        <li data-aos="fade-right" data-aos-delay="300">
          <NavLink
            className={({ isActive }) =>
              "py-2 hover:text-blue-600 !transition-all !duration-300 hover:pl-7 block" +
              (isActive ? " !text-blue-600" : "")
            }
            onClick={handleCloseMenu}
            to={"/tin-tuc"}
          >
            Tin tức sự kiện
          </NavLink>
        </li>
        <li data-aos="fade-right" data-aos-delay="400">
          <NavLink
            className={({ isActive }) =>
              "py-2 hover:text-blue-600 !transition-all !duration-300 hover:pl-7 block" +
              (isActive ? " !text-blue-600" : "")
            }
            onClick={handleCloseMenu}
            to={"/tuyen-dung"}
          >
            Tuyển dụng
          </NavLink>
        </li>
        <li data-aos="fade-right" data-aos-delay="400">
          <NavLink
            className={({ isActive }) =>
              "py-2 hover:text-blue-600 !transition-all !duration-300 hover:pl-7 block" +
              (isActive ? " !text-blue-600" : "")
            }
            onClick={handleCloseMenu}
            to={"/lien-he"}
          >
            Liên hệ
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
