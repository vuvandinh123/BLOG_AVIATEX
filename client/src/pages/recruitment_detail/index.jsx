import React, { useEffect, useState } from "react";
import { getBlogById } from "../../service/post";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useToTop } from "../../hook";
import moment from "moment";
import { CiClock2 } from "react-icons/ci";
import { AppURL } from "../../api/AppURL";
import Loading from "../../components/common/Loading";
import { getRecruitmentById } from "../../service/recruitment";
const RequirementDetail = () => {
  useToTop();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getRecruitmentById(id);
      if(Object.keys(res.data).length === 0) navigate("/404");
      setData(res.data);
      window.document.title = `Tin tuyển dụng | ${res.data?.title}`;

      setTimeout(() => {
        setLoading(false);
      }, 500);
    })();
  }, []);
  return (
    <div className="max-w-6xl mt-20 px-3 lg:mt-5 m-auto">
      <Loading open={loading} />
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
              <Link
                to={"/tuyen-dung"}
                href="#"
                className="block transition hover:text-gray-700"
              >
                {" "}
                Tuyển dụng
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
                {data.title}
              </a>
            </li>
          </ol>
        </nav>
      </div>
      <h1 className="text-4xl mt-5 font-bold uppercase text-blue-500">
        {data.title}
      </h1>
      <p className="text-gray-500 flex mb-2 gap-2 items-center mt-3">
        <CiClock2></CiClock2>
        {moment(data.created_at).format("DD-MM-YYYY")}
      </p>
      <div>
        <img className="w-full" src={AppURL.ImageUrl + data.thumbnail} alt="" />
      </div>
      <div
        className="lg:mt-10 mt-3 text-gray-500 leading-7"
        dangerouslySetInnerHTML={{ __html: data.body }}
      ></div>
    </div>
  );
};

export default RequirementDetail;
