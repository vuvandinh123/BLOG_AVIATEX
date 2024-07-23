import SliderAbout from "./components/Slider";
import img1 from "../../assets/5.png";
import img2 from "../../assets/6.png";
import img3 from "../../assets/7.png";
import img4 from "../../assets/8.png";
import img5 from "../../assets/9.png";
import Slider from "react-slick";
import Content from "./components/Content";
import { useToTop } from "../../hook";
import { useEffect, useState } from "react";
import Loading from "../../components/common/Loading";
import useTitle from "../../hook/useTitle";
const About = () => {
  useToTop();
  useTitle("Giới thiệu | AVIATEX");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
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
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="mt-[70px] lg:mt-0">
      <Loading open={loading} />
      <SliderAbout></SliderAbout>
      <div className="px-5 my-10 max-w-screen-xl mx-auto">
        <div className=" text-2xl font-bold uppercase text-center">
          <h2>Giới thiệu Công ty TNHH Aviatek</h2>
        </div>
        <div className="mt-3 lg:text-center">
          <p className="text-gray-600 mt-3 leading-8">
            Aviatek được thành lập vào ngày 8 tháng 8 năm 2018, với tầm nhìn trở
            thành một trong những công ty hàng đầu trong lĩnh vực xuất nhập khẩu
            và phân phối hàng hóa tại Việt Nam. Từ những ngày đầu tiên, chúng
            tôi đã đặt mục tiêu mang đến những sản phẩm chất lượng từ các nguồn
            cung ứng uy tín nhất, đặc biệt trong lĩnh vực nông sản và các sản
            phẩm mẹ và bé cao cấp từ Hàn Quốc. Từ khi thành lập, Aviatek đã liên
            tục mở rộng và phát triển, không chỉ về quy mô mà còn về chất lượng
            dịch vụ. Chúng tôi đã thiết lập được mạng lưới phân phối rộng khắp
            tại Hà Nội và TP.HCM, đồng thời xây dựng được mối quan hệ đối tác
            vững chắc với các nhà cung cấp hàng đầu từ Hàn Quốc. Nhờ sự nỗ lực
            không ngừng của đội ngũ, Aviatek đã từng bước khẳng định vị thế trên
            thị trường và nhận được sự tin tưởng của khách hàng.
          </p>
        </div>
      </div>

      <Content></Content>
      <div className="px-3 brand  bg-blue-200 bg-opacity-30 flex justify-center items-start  overflow-hidden  py-10">
        <div className="w-full  gap-5">
          <h2 className="text-center uppercase  text-blue-500 text-xl font-bold">
            Thương hiệu hợp tác
          </h2>
          <div className="mt-10  lg:w-1/2 m-auto">
            <Slider {...settings} className="flex items-center">
              <div className=" w-full">
                <img className="w-[100px]" src={img1} alt="" />
              </div>
              <div>
                <img className="w-[50px]" src={img2} alt="" />
              </div>
              <div>
                <img className="w-[100px]" src={img3} alt="" />
              </div>
              <div>
                <img className="w-[100px]" src={img4} alt="" />
              </div>
              <div>
                <img className="w-[100px]" src={img5} alt="" />
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
