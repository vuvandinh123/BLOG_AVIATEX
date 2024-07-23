import { useEffect, useState } from "react";
import Loading from "../../components/common/Loading";
import Banner from "./components/Banner";
import News from "./components/News";
import Product from "./components/Product";
import Investor from "./components/Investor";
import { useToTop } from "../../hook";
import { GetHomePage } from "../../service/setting";
import useTitle from "../../hook/useTitle";

const Home = () => {
  useToTop();
  useTitle("Trang chủ | AVIATEX");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
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
    }, 500);
  }, []);
  return (
    <div>
      <Loading open={loading} />
      <Banner data={data} />
      <Investor data={data}></Investor>
      <Product data={data}></Product>
      <News></News>
    </div>
  );
};

export default Home;
