import { useEffect, useState } from "react";
import { useToTop } from "../../hook";
import About from "./components/About";
import Form from "./components/Form";
import Loading from "../../components/common/Loading";
import { GetHomePage } from "../../service/setting";
import useTitle from "../../hook/useTitle";
const Contact = () => {
  useToTop();
  useTitle("Liên hệ | AVIATEX");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await GetHomePage();
      if (res.status === 200) {
        setData(res.data);
      }
    })();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <div className="relative max-w-screen-xl mx-auto">
      <Loading open={loading} />
      <div className="my-6">
        <div className="grid sm:grid-cols-2 items-center gap-16 p-8 mx-auto  bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md text-[#333] font-[sans-serif]">
          <About data={data}></About>
          <Form></Form>
        </div>
      </div>
      <div className="h-[300px] max-w-full bg-gray-300">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4296461545673!2d106.75102227457495!3d10.778368459158832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317525db84987b1f%3A0x629cc674906db4a1!2zMTM3IFRyxrDGoW5nIFbEg24gQmFuZywgUGjGsOG7nW5nIFRo4bqhbmggTeG7uSBM4bujaSwgUXXhuq1uIDIsIEjhu5MgQ2jDrSBNaW5oIDcwMDAwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1721150273536!5m2!1svi!2s"
          className="w-full h-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default Contact;
