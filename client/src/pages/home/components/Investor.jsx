/* eslint-disable react/prop-types */
import { AppURL } from "../../../api/AppURL";
const Investor = ({ data }) => {
  return (
    <div className="max-w-6xl px-3 m-auto overflow-hidden">
      <h2 className="text-2xl mt-5 lg:text-4xl  text-gray-600 mb-5 lg:mb-10">
        VỀ CHÚNG TÔI
      </h2>
      <h5 className="after:content-[''] pb-2 after:block after:absolute relative after:bottom-[-1px] border-b-2 after:bg-red-600 after:h-[2px] after:w-[130px] mt-2">
        GIỚI THIỆU TẬP ĐOÀN
      </h5>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div data-aos="fade-right" className="col-span-1">
          <div>
            <img
              className="mt-5"
              src={AppURL.ImageUrl + data.image_about}
              alt=""
            />
          </div>
        </div>
        <div data-aos="fade-left" className="col-span-1">
          <div className="mt-5">
            <iframe
              width={560}
              className="max-w-full"
              height={315}
              src={data.youtube_about}
              title="YouTube video player"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </div>
      <div  dangerouslySetInnerHTML={{ __html: data.description_about }} className="text-gray-500 mt-5 leading-7">
      </div>
    </div>
  );
};

export default Investor;
