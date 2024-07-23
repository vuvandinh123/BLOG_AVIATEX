import { useEffect, useState } from "react";
import { useToTop } from "../../hook";
import Loading from "../../components/common/Loading";
import { GetAllWork } from "../../service/work";
import { AppURL } from "../../api/AppURL";
import useTitle from "../../hook/useTitle";
const Work = () => {
  useToTop();
  useTitle("Hoạt động | AVIATEX");
  const [check, setCheck] = useState(0);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await GetAllWork({ limit: 3 });
      setData(res.data);
    })();
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  return (
    <div>
      <Loading open={loading} />
      <div className="relative lg:h-screen">
        <img
          className="w-full object-cover h-full "
          src={AppURL.ImageUrl + data[check]?.thumbnail}
          alt=""
        />
        <div className="absolute hidden  lg:block bottom-0  bg-gradient-to-t from-black to-transparent w-full h-full"></div>
        <a
          className="scrolldown hidden lg:block text-xl js-scrollCt"
          data=".newsHomeWrap"
          href
        >
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
      <div className="hidden lg:block">
        <ul className="flex list-none pl-0 justify-center items-center">
          {data.map((item, index) => (
            <li
              key={index}
              onClick={() => setCheck(index)}
              className={`${
                check === index && "bg-blue-600 text-white"
              } basis-1/3 text-center font-bold uppercase text-gray-800 text-sm lg:text-xl cursor-pointer hover:text-white hover:bg-blue-600 transition-all duration-200   px-3 py-4`}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="lg:hidden">
        <select
          className="bg-blue-600 px-5 py-4 rounded-none outline-none text-white w-full text-center"
          onChange={(e) => setCheck(e.target.value)}
        >
          {data.map((item, index) => {
            return (
              <option value={index} key={index}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className=" bg-blue-50 py-10 pt-5 ">
        <div className="max-w-6xl px-3 m-auto">
          <div className="mb-10">
            <h1 className="text-2xl  mb-3  uppercase after:content-[''] after:block after:w-20 after:h-1 after:bg-blue-500">
              {data[check]?.name}
            </h1>
            <div className="">
              <div>
                <div
                  dangerouslySetInnerHTML={{ __html: data[check]?.body }}
                  className="text-gray-600 leading-7"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
