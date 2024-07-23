/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import Slider from "react-slick";
import { useDeviceType } from "../../../hook";
import img1 from "../../../assets/15.png";
import { GetAllWork } from "../../../service/work";
import mouse from "../../../assets/mouse.png";
import { Link } from "react-router-dom";
const Product = ({ data }) => {
  const device = useDeviceType();
  const [products, setProducts] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
    beforeChange: (current, next) => {
      setActiveSlide(next);
    },
  };
  useEffect(() => {
    (async () => {
      const res = await GetAllWork();
      setProducts(res.data);
    })();
  }, []);
  return (
    <div className="lg:py-64 pt-10 relative overflow-hidden">
      <div className="bg-gray-100  lg:h-[500px] flex  w-full">
        <div className="max-w-6xl lg:ml-[130px] flex flex-col gap-2 ">
          <div
            className="lg:w-[400px] max-w-full mb-5  lg:ml-4 shrink-0"
            data-aos="fade-right"
          >
            <div
              className={`pt-14 ${
                !activeSlide
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-[-100px]"
              } ${
                device === "mobile" ? "!translate-x-0 !opacity-100" : ""
              } transition-all duration-1000 px-3`}
            >
              <h4 className="text-4xl uppercase leading-[50px]">
                <span className="text-gray-700 font-bold">
                  {data?.title_product}
                </span>{" "}
                <br />
              </h4>
              <p className="text-gray-600 text_ecl-8  mt-5 w-2/3 lg:w-full ">
                {data?.description_product}
              </p>
              <div className="flex mt-7 dragMount flex-col justify-start w-max items-center">
                <img className="w-[20px]" src={mouse} alt="" />
                <div className="flex gap-2 text-sm items-center mt-2 text-gray-400">
                  <FaArrowLeftLong></FaArrowLeftLong>
                  <span>Trượt để khám phá</span>
                  <FaArrowRightLong></FaArrowRightLong>
                </div>
              </div>
            </div>
          </div>
          <div
            className={` lg:absolute w-full  lg:top-[20%] bottom-0  overflow-hidden transition-all duration-200 ${
              !activeSlide ? "lg:left-20" : "bg-white"
            } right-0`}
          >
            <div
              className="w-[600px] lg:w-[1500px] px-2 overflow-hidden"
              data-aos="fade-left"
            >
              <Slider {...settings}>
                {device !== "mobile" && (
                  <div className="px-5 border hidden lg:block invisible h-[600px]">
                    <div className="lg:bg-transparent bg-red-500">
                      <div className="p-10">
                        <div></div>
                      </div>
                    </div>
                  </div>
                )}
                {products &&
                  products.length > 0 &&
                  products.map((item) => (
                    <div
                      key={item.id}
                      className="lg:px-5 px-1 cursor-pointer overflow-hidden h-[500px]  lg:h-[600px]"
                    >
                      <div className="shadow-xl bg-white  w-full h-full before:content-[''] before:block before:w-full before:h-2 before:bg-blue-500 before:absolute z-10 group relative hover:before:h-full before:transition-all before:duration-500">
                        <div className=" relative flex flex-col z-10 h-full">
                          <div className="after:content-[''] p-10 after:w-1/2 group-hover:after:bg-white relative after:absolute after:h-[2px] after:right-0 after:bg-gray-500">
                            <img className="w-32 " src={img1} alt="" />
                          </div>
                          <div className="lg:p-10 ms-3 group-hover:text-white text-blue-600">
                            <h4 className="uppercase text_ecl-2 text-xl lg:text-4xl  font-bold">
                              {item.name}
                            </h4>
                            <p
                              dangerouslySetInnerHTML={{ __html: item.body }}
                              className="text_ecl-8 text-sm text-white  mt-3"
                            ></p>
                          </div>
                          <div className="text-white flex items-center gap-3 absolute bottom-4 lg:bottom-10 uppercase left-5 text-sm lg:left-10">
                            <Link to={"/hoat-dong"} className="flex items-center gap-2 hover:font-bold">
                              Xem thêm <FaArrowRight size={15}></FaArrowRight>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                <div className="px-5 border lg:block invisible h-[600px]">
                  <div className="lg:bg-transparent bg-red-500">
                    <div className="p-10">
                      <div></div>
                    </div>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
