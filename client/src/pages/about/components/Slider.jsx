import Slider from "react-slick";
import slider1 from "../../../assets/2.png";
import slider2 from "../../../assets/3.png";
import slider3 from "../../../assets/4.png";
const SliderAbout = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };
  return (
    <div>
      <Slider {...settings}>
        <div>
          <img className="w-full" src={slider1} alt="" />
        </div>
        <div>
          <img className="w-full" src={slider2} alt="" />
        </div>
        <div>
          <img className="w-full" src={slider3} alt="" />
        </div>
      </Slider>
    </div>
  );
};

export default SliderAbout;
