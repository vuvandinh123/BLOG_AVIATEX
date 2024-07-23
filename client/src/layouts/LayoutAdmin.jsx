import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useToTop } from "../hook";
import { checkRole, removeCookieAuth } from "../utils";
import SidebarAmin from "../components/admin/sidebar";
import Loading from "../components/common/Loading";
import useTitle from "../hook/useTitle";
const LayoutAdmin = () => {
  useToTop();
  useTitle("Quản trị viên | AVIATEX");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const isLogin = checkRole("SUPERADMIN");
    if (!isLogin) {
      navigate("/login");
    }
  }, [navigate]);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <div>
      <Loading open={loading} />
      <div>
        {/* component */}
        <SidebarAmin></SidebarAmin>
        <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
          <div className="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">
            <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
              <h5
                hidden
                className="text-2xl text-gray-600 font-medium lg:block"
              >
                QUẢN LÝ <span className="text-red-600">AVIATEK</span>
              </h5>
              <button className="w-12 h-16 -mr-2 border-r lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 my-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <div className="flex space-x-4">
                <Link 
                  to={"/admin/ho-tro"}
                  aria-label="chat"
                  className="w-10 h-10  flex items-center  rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 m-auto text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                </Link>
                
              </div>
            </div>
          </div>
          <div className="px-6 pt-6 2xl:container bg-gray-100 min-h-screen">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
