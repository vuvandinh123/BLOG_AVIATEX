import { useEffect, useState } from "react";
import { FaFacebookMessenger, FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { SiZalo } from "react-icons/si";
import { GetHomePage } from "../../service/setting";

const ContactFixed = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    (async () => {
      const res = await GetHomePage();
      if (res.status === 200) {
        setData(res.data);
      }
    })();
  }, []);
  return (
    <div className="fixed bottom-5 lg:bottom-20 right-0  w-[50px]">
      <ul className="list-none flex flex-col gap-2 pl-0">
        <li>
          <a
            href={data?.message}
            className="bg-gray-200 border-2 border-white relative h-[50px] w-[50px] rounded-full flex items-center justify-center"
            target="_blank"
          >
            <span className="block absolute animate-ping rounded-full z-0 bg-gray-100 inset-2"></span>

            <FaFacebookMessenger
              className="text-pink-600 relative z-10"
              size={30}
            ></FaFacebookMessenger>
          </a>
        </li>
        <li>
          <a
            href={`https://zalo.me/` + data?.zalo}
            className="bg-blue-500 relative h-[50px] w-[50px] border-2 border-white rounded-full flex items-center justify-center"
            target="_blank"
          >
            <span className="block absolute animate-ping rounded-full z-0 bg-blue-500 inset-2"></span>

            <SiZalo size={30} className="text-white relative z-10"></SiZalo>
          </a>
        </li>
        <li>
          <a
            href={`tel:${data?.phone}`}
            className="bg-yellow-500 relative h-[50px] w-[50px] border-2 border-white rounded-full flex items-center justify-center"
            target="_blank"
          >
            <span className="block absolute animate-ping rounded-full z-0 bg-yellow-500 inset-2"></span>
            <FaPhone size={30} className="text-white relative z-10"></FaPhone>
          </a>
        </li>
        <li>
          <a
            href="https://www.google.com/maps/place/137+Tr%C6%B0%C6%A1ng+V%C4%83n+Bang,+Ph%C6%B0%E1%BB%9Dng+Th%E1%BA%A1nh+M%E1%BB%B9+L%E1%BB%A3i,+Qu%E1%BA%ADn+2,+H%E1%BB%93+Ch%C3%AD+Minh+70000,+Vi%E1%BB%87t+Nam/@10.7783685,106.7510223,17z/data=!3m1!4b1!4m6!3m5!1s0x317525db84987b1f:0x629cc674906db4a1!8m2!3d10.7783632!4d106.7535972!16s%2Fg%2F11j8gz_t8d?hl=vi&entry=ttu"
            target="_blank"
            className="bg-red-500 relative  h-[50px] w-[50px] border-2 border-white rounded-full flex items-center justify-center"
          >
            <span className="block absolute animate-ping rounded-full z-0 bg-red-500 inset-2"></span>
            <FaLocationDot
              size={25}
              className="text-white relative z-10 "
            ></FaLocationDot>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ContactFixed;
