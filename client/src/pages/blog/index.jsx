import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToTop } from "../../hook";
import Loading from "../../components/common/Loading";
import { GetAllPostByUser } from "../../service/post";
import { AppURL } from "../../api/AppURL";
import moment from "moment";
import { GetAllTopic } from "../../service/topic";
import { getUrlSearchParam, setUrlSearchParam } from "../../utils";
import PaginationPost from "../../components/admin/paginations/Pagination";
import useTitle from "../../hook/useTitle";

const Blogs = () => {
  useTitle("Tin tức | AVIATEX");

  useToTop();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [topic, setTopic] = useState([]);
  const [topic_id, setTopic_id] = useState("all");
  const [pagination, setPagination] = useState({
    total: 0,
    activePage: 1,
    limit: 5,
    totalPage: 1,
  });
  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await GetAllPostByUser({
        topic_id,
        status: "publish",
        page: pagination.activePage,
        limit: pagination.limit,
      });
      const res2 = await GetAllTopic();
      setPagination({
        ...pagination,
        total: res.options?.total ?? 0,
        totalPage: res.options?.pagination?.totalPage ?? 1,
        activePage: res.options?.pagination?.page ?? 1,
        limit: res.options?.pagination?.limit ?? 5,
      });
      window.scrollTo(0, 0, { behavior: "smooth" });
      setData(res.data);
      setTopic(res2.data);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    })();
  }, [topic_id, pagination.limit, pagination.activePage]);
  useEffect(() => {
    if (getUrlSearchParam("topic")) {
      setTopic_id(getUrlSearchParam("topic"));
    } else {
      setUrlSearchParam("topic", "all");
    }
  }, []);
  return (
    <div className="max-w-screen-xl mx-auto px-3 mt-20 lg:mt-14">
      <div>
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1 text-sm text-gray-600">
            <li>
              <Link
                to="/"
                href="#"
                className="block transition hover:text-gray-700"
              >
                <span className="sr-only"> Home </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </Link>
            </li>
            <li className="rtl:rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li>
              <a href="#" className="block transition hover:text-gray-700">
                {" "}
                Tin tức
              </a>
            </li>
          </ol>
        </nav>
      </div>
      <h1 className="text-3xl lg:text-5xl py-5  lg:text-start text-center">
        TIN TỨC SỰ KIỆN
      </h1>
      <div className="overflow-x-auto">
        <ul className="flex list-none items-center w-max gap-5 border-b ">
          <li
            onClick={() => {
              setTopic_id("all");
              setUrlSearchParam("topic", "all");
            }}
            className={` after:content-[''] text-center cursor-pointer hover:text-red-600 hover:after:bg-red-600 after:transition-all  uppercase after:duration-300 after:block after:w-0 hover:after:w-full after:h-[2px] pb-3 after:bg-gray-200 after:absolute relative after:bottom-0 ${
              topic_id == "all" &&
              "after:w-full after:bg-red-600 text-red-500 font-bold"
            }`}
          >
            Tất cả
          </li>
          {topic.map((item) => (
            <li
              onClick={() => {
                setTopic_id(item.id);
                setUrlSearchParam("topic", item.id);
                setPagination({ ...pagination, activePage: 1 });
              }}
              className={` after:content-[''] text-center cursor-pointer hover:text-red-600 hover:after:bg-red-600 after:transition-all  uppercase after:duration-300 after:block after:w-0 hover:after:w-full after:h-[2px] pb-3 after:bg-gray-200 after:absolute relative after:bottom-0 ${
                topic_id == item.id &&
                "after:w-full after:bg-red-600 text-red-500 font-bold"
              }`}
              key={item.id}
            >
              {item.name}
            </li>
          ))}
          <li></li>
        </ul>
      </div>
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {!loading &&
            data &&
            data.length > 0 &&
            data.map((item, index) => {
              if (index === 0) {
                return (
                  <div key={item.id} className="lg:col-span-2 relative group">
                    <div className="relative">
                      <Link
                        to={"/tin-tuc/" + item.id}
                        className="overflow-hidden block "
                      >
                        <img
                          className="group-hover:scale-110 transition-all lg:h-[390px] w-full object-cover duration-500"
                          src={AppURL.ImageUrl + item.thumbnail}
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="absolute flex flex-col gap-2 left-0 bottom-0 lg:w-1/2 lg:h-[200px] px-5 py-5 bg-white bg-opacity-70">
                      <p className="text-red-600  text-md uppercase">
                        {item.topic_name}
                      </p>
                      <h3 className="lg:text-2xl text_ecl-2 text-xl text-gray-800 group-hover:text-red-600 transition-all font-bold">
                        {item.title}
                      </h3>
                      <p className="text-gray-500">
                        {moment(item.created_at).format("DD-MM-YYYY")}
                      </p>
                    </div>
                  </div>
                );
              }
              return (
                <div key={item.id} className="group">
                  <div className="overflow-hidden">
                    <Link to={"/tin-tuc/" + item.id}>
                      <img
                        className="w-full group-hover:scale-125 transition-all duration-1000  h-[240px] object-cover"
                        src={AppURL.ImageUrl + item.thumbnail}
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="p-3">
                    <p className="text-red-600 text-md uppercase mt-2">
                      {item.topic_name}
                    </p>
                    <h3 className="uppercase mt-3 ">
                      <Link
                        to={"/"}
                        className="group-hover:text-red-600 text_ecl-2 text-gray-700"
                      >
                        {item.title}
                      </Link>
                    </h3>
                    <p className="mt-3 text-gray-400">
                      {moment(item.created_at).format("DD-MM-YYYY")}
                    </p>
                  </div>
                </div>
              );
            })}
          {loading && (
            <div className="col-span-1 lg:col-span-3 flex justify-center md:col-span-2">
              <div className="loader"></div>
            </div>
          )}
          {data.length === 0 && (
            <p className="text-center col-span-1 lg:col-span-3 md:col-span-2 text-gray-500">
              Không có tin tức
            </p>
          )}
        </div>
      </div>
      <div className={`${loading && "hidden"}`}>
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

export default Blogs;
