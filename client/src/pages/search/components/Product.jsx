/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { AppURL } from "../../../api/AppURL";

const Product = ({ item }) => {
  return (
    <div key={item.id} className="mt-5 w-full">
      <div>
        <div className="flex  items-center justify-center">
          <div className="relative flex w-full flex-col lg:flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="relative m-0 lg:w-2/6 overflow-hidden shrink-0 rounded-xl lg:rounded-r-none bg-white bg-clip-border text-gray-700">
              <Link to={"/tin-tuc/" + item.id}>
                <img
                  src={AppURL.ImageUrl + item.thumbnail}
                  alt="image"
                  className="h-full w-full object-cover"
                />
              </Link>
            </div>
            <div className="p-6">
              <h6 className="mb-4 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal text-blue-500 antialiased">
                <Link to={"/tin-tuc?topic=" + item.topic_id}>
                  {item.topic_name}
                </Link>
              </h6>
              <h4 className="mb-2 text_ecl-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased hover:text-blue-500">
                <Link to={"/tin-tuc/" + item.id}>{item.title}</Link>
              </h4>
              <p
                dangerouslySetInnerHTML={{ __html: item.body }}
                className="mb-8 text_ecl-2 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased"
              ></p>
              <a className="inline-block" href="#">
                <Link
                  to={"/tin-tuc/" + item.id}
                  className="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-500 transition-all hover:bg-blue-500/10 active:bg-blue-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  Xem thêm
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </Link>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
