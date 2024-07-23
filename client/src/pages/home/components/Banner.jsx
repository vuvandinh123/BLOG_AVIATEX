/* eslint-disable react/prop-types */
import { AppURL } from "../../../api/AppURL";

const Banner = ({ data }) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="1000"
      className="w-full h-screen"
    >
      <img
        className="w-full h-full object-cover"
        src={AppURL.ImageUrl + data?.banner_home}
        alt=""
      />
      <h3 className="text-white absolute z-0 lg:top-1/3 top-1/4 left-10 right-10 lg:left-[17%] text-4xl lg:text-6xl lg:leading-[70px] uppercase font-bold w-[60%]  ">
        {data?.title_home}
      </h3>
      <a className="scrolldown js-scrollCt" data=".newsHomeWrap" href>
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
  );
};

export default Banner;
