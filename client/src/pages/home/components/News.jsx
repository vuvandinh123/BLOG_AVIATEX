import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { GetAllPostByUser } from "../../../service/post";
import { AppURL } from "../../../api/AppURL";
import moment from "moment";

const News = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await GetAllPostByUser({
        status:"publish",
        limit: 3,
      });
      setData(res.data);
    })();
  }, []);
  return (
    <div className=" max-w-6xl m-auto px-3">
      <h2 className="text-2xl lg:text-4xl mt-10 text-gray-700 uppercase">
        Tin tức sự kiện
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-5">
        {data.map((item) => (
          <div key={item} data-aos="zoom-in-up" className="group">
            <div className="overflow-hidden">
              <Link to={"/tin-tuc/" + item.id}>
                <img
                  className="w-full group-hover:scale-125 transition-all duration-1000  h-[240px] object-cover"
                  src={AppURL.ImageUrl + item.thumbnail}
                  alt=""
                />
              </Link>
            </div>
            <div>
              <h3 className="uppercase mt-5 ">
                <Link
                  to={"/tin-tuc/" + item.id}
                  className="group-hover:text-red-600 text_ecl-2 text-gray-700"
                >
                  {item.title}
                </Link>
              </h3>
              <p className="mt-3 text-gray-400 text-ecl_2">
                {moment(item.created_at).format("DD-MM-YYYY")}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Link
        to={"/tin-tuc"}
        className="uppercase mt-10 text-gray-400 group  flex w-max items-center gap-3"
      >
        <span className="group-hover:text-red-600 transition-all">
          Xem tất cả
        </span>
        <span className="group-hover:text-red-600 group-hover:scale-110 transition-all duration-300 group-hover:translate-x-5">
          <FaArrowRightLong size={25}></FaArrowRightLong>
        </span>
      </Link>
    </div>
  );
};

export default News;
