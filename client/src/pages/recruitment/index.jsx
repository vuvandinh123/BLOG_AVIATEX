/* eslint-disable react-hooks/exhaustive-deps */
import img from "../../assets/16.jpg";
import { BsCalendar2DateFill } from "react-icons/bs";
import { IoIosTimer } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useToTop } from "../../hook";
import { useEffect, useState } from "react";
import Loading from "../../components/common/Loading";
import Department from "./components/Department";
import { AppURL } from "../../api/AppURL";
import { GetAllRecruitment } from "../../service/recruitment";
import moment from "moment";
import PaginationPost from "../../components/admin/paginations/Pagination";
import useTitle from "../../hook/useTitle";

const Recruitment = () => {
  useToTop();
  useTitle("Tuyển dụng | AVIATEX");

  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    activePage: 1,
    limit: 6,
    totalPage: 1,
  });
  const [params, setParams] = useState({
    department_id: "all",
    search: "",
  });
  const [loading, setLoading] = useState(true);
  const fetchAPi = async (params) => {
    setLoading(true);
    const res = await GetAllRecruitment({ status: "publish", ...params, page: pagination.activePage, limit: pagination.limit });
    setData(res.data);
    setPagination({
      ...pagination,
      total: res.options?.total ?? 0,
      totalPage: res.options?.pagination?.totalPage ?? 1,
      activePage: res.options?.pagination?.page ?? 1,
      limit: res.options?.pagination?.limit ?? 10,
    });
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  useEffect(() => {
    fetchAPi(params);
  }, [pagination.activePage, pagination.limit]);
  const handleChangeDepartment = (e) => {
    setParams({ ...params, department_id: e.target.value });
  };
  const handleChangeSearch = (e) => {
    setParams({ ...params, search: e.target.value });

  };
  const handleClickFilter = () => {
    setPagination({ ...pagination, activePage: 1 });
    fetchAPi(params);
  };
  return (
    <div>
      <Loading open={loading} />
      <div className="relative ">
        <div className="relative h-screen">
          <img className="w-full object-cover h-full" src={img} alt="" />
          <div className="absolute  lg:block bottom-0  bg-gradient-to-t from-black to-transparent w-full h-full"></div>
        </div>
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h4 className="lg:text-6xl text-xl text-center leading-[100px] text-white uppercase font-bold">
            Cơ hội việc làm tại{" "}
            <span className="text-red-600 text-7xl ">Avitatek</span>
          </h4>
        </div>
        <a className="scrolldown text-xl js-scrollCt" data=".newsHomeWrap" href>
          <span>
            Cuộn
            <br />
            xuống
          </span>
          <img
            className="ar"
            src="https://vingroup.net/assets/images/scrolldown-icon.png"
          />
        </a>
      </div>
      <div className="max-w-screen-xl px-3  mx-auto mt-10">
        <h1 className="text-center text-2xl lg:text-4xl uppercase font-bold">
          VỊ TRÍ TUYỂN DỤNG
        </h1>
        <div>
          <div className="border-2 shadow-md gap-4  rounded-lg grid mt-10 grid-cols-1 lg:grid-cols-2 p-3">
            <div className="lg:border-r lg:border-b-0 border-b">
              <p className="text-gray-500 ms-3 ">Vị trí ứng tuyển</p>
              <input
                type="text"
                value={params.search}
                onChange={handleChangeSearch}
                placeholder="Nhập vị trí muốn ứng tuyển"
                className="outline-none text-md px-3 py-2 w-full"
              />
            </div>
            <div className="relative">
              <Department handleChange={handleChangeDepartment}></Department>
              <button
                onClick={handleClickFilter}
                className="bg-blue-500 mt-5 lg:mt-0 w-full lg:w-max rounded-md px-10 hover:bg-blue-600 transition-all py-4 text-white lg:absolute right-3 top-1/2 lg:translate-y-[-50%]"
              >
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* card list */}
      <div className="max-w-screen-xl lg:mx-auto lg:grid-cols-3 mt-10 grid grid-cols-1 mx-3 gap-5">
        {data &&
          data.length > 0 &&
          data.map((item) => (
            <div
              key={item}
              className="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow"
            >
              <Link to={"/tuyen-dung/" + item.id}>
                <img
                  src={AppURL.ImageUrl + item.thumbnail}
                  className="aspect-video w-full object-cover"
                  alt
                />
              </Link>
              <div className="p-4">
                <h3 className="text-xl font-medium text-gray-900">
                  <Link to={"/tuyen-dung/" + item.id}>{item.title}</Link>
                </h3>
                <div className="flex mt-3 justify-between">
                  <div>
                    <p className="text-gray-600 flex items-center gap-2">
                      <span>
                        <BsCalendar2DateFill className="text-blue-700"></BsCalendar2DateFill>
                      </span>{" "}
                      {moment(item.created_at).format("DD-MM-YYYY")}
                    </p>
                  </div>
                  <div className="flex gap-2 text-blue-500 items-center">
                    <IoIosTimer className=""></IoIosTimer>
                    Fulltime
                  </div>
                </div>
                <Link to={"/tuyen-dung/" + item.id} className="mt-4 flex gap-2">
                  <p className="flex items-center gap-2 text-blue-500">
                    Xem chi tiết <FaArrowRightLong></FaArrowRightLong>
                  </p>
                </Link>
              </div>
            </div>
          ))}
      </div>
      <div className="max-w-screen-xl mx-auto mt-10">
        <PaginationPost
          setPagination={setPagination}
          totalPages={pagination.totalPage}
          activePage={pagination.activePage}
          limit={pagination.limit}
          totalProduct={pagination.total}
        ></PaginationPost>
      </div>
    </div>
  );
};

export default Recruitment;
