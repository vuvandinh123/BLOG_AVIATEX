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
            href={data?.map}
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
