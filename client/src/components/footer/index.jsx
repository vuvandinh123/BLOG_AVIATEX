import React, { useEffect, useState } from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaFacebookMessenger, FaYoutube } from "react-icons/fa6";
import { SiZalo } from "react-icons/si";
import { Link } from "react-router-dom";
import { GetHomePage } from "../../service/setting";

const Footer = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    (async () => {
      const res = await GetHomePage();
      if (res.status === 200) {
        setData(res.data);
      }
    })();
  }, []);
  return (
    <div className="bg-gray-100 pt-10 ">
      <div className="max-w-6xl m-auto px-3">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          <div className="col-span-2">
            <div className="text-center lg:text-start">
              <p className="text-gray-800 font-bold">Công ty AVIATEK</p>
              <p className="text-gray-500 mt-2"> © Bản quyền Aviatek 2024</p>
            </div>
            <div className="mt-5">
              <p>Kết nối với chúng tôi</p>
              <div>
                <ul className="flex list-none gap-3 items-center">
                  <li>
                    <a target="_blank" className="px-3 py-2 mt-3 inline-block" href={data?.message}>
                      <FaFacebookMessenger size={20}> </FaFacebookMessenger>
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href={data?.facebook} className="px-3 py-2 mt-3 inline-block" to={""}>
                      <FaFacebookSquare size={20}> </FaFacebookSquare>
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href={data?.youtube} className="px-3 py-2 mt-3 inline-block" to={""}>
                      <FaYoutube size={20}> </FaYoutube>
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href={`https://zalo.me/${data?.zalo}`} className="px-3  py-2 mt-3 inline-block" to={""}>
                      <SiZalo className="" size={30}>
                        {" "}
                      </SiZalo>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-span-1 mt-3">
            <ul className="leading-9 list-none pl-0 mb-5">
              <li>
                <Link
                  to={"/"}
                  className="text-gray-800 font-bold hover:text-red-600 transition-all"
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  to={"/ve-chung-toi"}
                  className="text-gray-800 font-bold hover:text-red-600 transition-all"
                >
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link
                  to={"/hoat-dong"}
                  className="text-gray-800 font-bold hover:text-red-600 transition-all"
                >
                  Lĩnh vực hoạt động
                </Link>
              </li>
              <li>
                <Link
                  to={"/tin-tuc"}
                  className="text-gray-800 font-bold hover:text-red-600 transition-all"
                >
                  Tin tức sự kiện
                </Link>
              </li>
              <li>
                <Link
                  to={"/tuyen-dung"}
                  className="text-gray-800 font-bold hover:text-red-600 transition-all"
                >
                  Tuyển dụng
                </Link>
              </li>
              <li>
                <Link
                  to={"/lien-he"}
                  className="text-gray-800 font-bold hover:text-red-600 transition-all"
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-1 mt-3">
            <ul className="leading-7 list-none">
              <li>
                <Link
                  to={"/hoat-dong"}
                  className="text-gray-800 hover:text-red-600 transition-all"
                >
                  Xuất nhập khẩu
                </Link>
              </li>
              <li>
                <Link
                  to={"/hoat-dong"}
                  className="text-gray-800 hover:text-red-600 transition-all"
                >
                  Phân thối
                </Link>
              </li>
              <li>
                <Link
                  to={"/hoat-dong"}
                  className="text-gray-800 hover:text-red-600 transition-all"
                >
                  Truyền thông quảng cáo
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr />
        <p className="text-center lg:text-start py-5  text-gray-500">
          Chính sách riêng tư
        </p>
      </div>
    </div>
  );
};

export default Footer;
