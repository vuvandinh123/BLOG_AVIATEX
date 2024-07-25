import { useEffect, useState } from "react";
import { LoginAdmin } from "../../../service/auth";
import { toast } from "keep-react";
import { useNavigate } from "react-router-dom";
import { checkRole, setCookieAuth } from "../../../utils";
import Loading from "../../../components/common/Loading";

const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  useEffect(() => {
    const isLogin = checkRole("SUPERADMIN");
    if (isLogin) navigate("/admin");
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.username === "" || data.password === "") {
      toast.error("Vui lòng nhập đủ thông tin!");
    }
    try {
      const res = await LoginAdmin(data);
      if (res.status === 200) {
        setCookieAuth({
          userId: res.data.user.id,
          accessToken: res.data.token.accessToken,
          refreshToken: res.data.token.refreshToken,
        });
        toast.success("Đăng nhập thành công");
        navigate("/admin");
      } else {
        toast.error("Đăng nhập thất bại tài khoản hoặc mật khẩu không đúng");
      }
    } catch (error) {
      toast.error("Đăng nhập thất bại tài khoản hoặc mật khẩu không đúng");
    }
  };
  return (
    <div>
      <div>
        <Loading open={loading} />
        {/* component */}
        <div
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1624916888581-48904076264b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80)",
          }}
          className=" blur-[10px] z-10 fixed inset-0 bg-no-repeat bg-cover"
        ></div>
        <div className="relative flex h-screen justify-center items-center">
          <div className="absolute bg-black opacity-60 inset-0 z-0" />
          <form
            onSubmit={handleSubmit}
            className="py-10 p-10 w-full lg:w-max h-screen lg:h-max   z-20 bg-white rounded-xl"
          >
            <h1 className="text-center font-bold text-3xl mb-5">ĐĂNG NHẬP</h1>
            <div className="mb-6">
              <label
                className="mr-4 text-gray-700 font-bold block mb-2"
                htmlFor="name"
              >
                Tên đăng nhập
              </label>
              <input
                type="text"
                value={data.username}
                name="username"
                onChange={(e) => setData({ ...data, username: e.target.value })}
                className="border bg-gray-100 lg:min-w-96 py-2 px-4 w-full outline-none focus:ring-2 focus:ring-blue-400 rounded"
                placeholder="Email hoặc tên đăng nhập"
              />
            </div>
            <div className="">
              <label
                className="mr-4 block text-gray-700 font-bold  mb-2"
                htmlFor="name"
              >
                Mật khẩu
              </label>
              <input
                type="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                className="border bg-gray-100 py-2 px-4 w-full outline-none focus:ring-2 focus:ring-blue-400 rounded"
                placeholder="Nhập mật khẩu"
              />
            </div>
            <span className="text-sm text-gray-700 inline-block mt-4 hover:text-blue-600 hover:underline hover:cursor-pointer transition duration-200">
              Quên mật khẩu
            </span>
            <button className="w-full mt-6 uppercase text-indigo-50 font-bold bg-blue-600 py-3 rounded-md hover:bg-blue-500 transition duration-300">
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
