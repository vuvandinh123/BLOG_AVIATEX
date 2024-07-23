import { Outlet } from "react-router-dom";
import Siderbar from "../components/sidebar";
import Footer from "../components/footer";
import Contact from "../components/common/Contact";
import ContactFixed from "../components/common/ContactFixed";

const Layout = () => {
  return (
    <div className="flex font-sans">
      <Siderbar></Siderbar>
      <div className="w-full overflow-hidden lg:ml-[100px]">
        <Outlet></Outlet>
        <Contact></Contact>
        <Footer></Footer>
      </div>
      <ContactFixed></ContactFixed>
    </div>
  );
};

export default Layout;
