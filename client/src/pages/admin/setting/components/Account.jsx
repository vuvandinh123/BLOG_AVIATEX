import { useEffect, useState } from "react";
import {
  GetAccount,
  UpdateUsernameAndNameUser,
} from "../../../../service/user";
import { toast } from "sonner";
import ModalChangePassowrd from "./ModalChangePassowrd";

const Account = () => {
  const [data, setData] = useState({});
  const [changePassword, setChangePassword] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const res = await GetAccount();
        setData(res.data);
      } catch (error) {
        toast.error("Lấy thông tin lỗi " + error.message);
      }
    })();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await UpdateUsernameAndNameUser({
        email: data.email,
        name: data.name,
      });
      if (res.status === 200) {
        toast.success("Cập nhật thành công");
      }
    } catch (error) {
      toast.error("Lỗi " + error.message);
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold tracking-tight">Quản lý tài khoản</h2>
      </div>

      <form action="" onSubmit={handleSubmit}>
        <div className="flex justify-end">
          <button className="bg-green-500 text-white uppercase text-sm px-2 mt-2 lg:mt-0 lg:px-3 py-2 rounded-md">
            Cập nhật
          </button>
        </div>
        <div className="grid grid-cols-12 gap-5 mt-5">
          <div className="col-span-12">
            <div>
              <label htmlFor="name" className="mb-2 block">
                Họ và tên
              </label>
              <input
                type="text"
                id="name"
                value={data?.name}
                name="name"
                onChange={(e) => setData({ ...data, name: e.target.value })}
                placeholder="Họ và tên"
                className="w-full border px-3 py-2 outline-none rounded-md"
              />
            </div>
            <div className="grid lg:grid-cols-2 gap-3 ">
              <div className="mt-3">
                <label htmlFor="name" className="mb-2 block">
                  Tên tài khoản
                </label>
                <input
                  type="text"
                  id="username"
                  disabled
                  value={data?.username}
                  name="username"
                  onChange={(e) =>
                    setData({ ...data, username: e.target.value })
                  }
                  placeholder="Tên tài khoản"
                  className="w-full border px-3 py-2 outline-none rounded-md"
                />
              </div>
              <div className="mt-3">
                <div className="flex justify-between">
                  <label htmlFor="name" className="mb-2 block">
                    Email
                  </label>
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={data?.email}
                  placeholder="Email"
                  className="w-full border px-3 py-2 outline-none rounded-md"
                />
              </div>
            </div>

            <div className="mt-3">
              <div className="flex justify-between">
                <label htmlFor="name" className="mb-2 block">
                  Mật khẩu
                </label>
                <button
                  type="button"
                  className="text-blue-500"
                  onClick={() => setChangePassword(true)}
                >
                  Thay đổi
                </button>
              </div>
              <input
                type="password"
                id="username"
                placeholder="******************"
                disabled
                className="w-full border px-3 py-2 outline-none rounded-md"
              />
            </div>
          </div>
        </div>
      </form>
      <ModalChangePassowrd
        isOpen={changePassword}
        setIsOpen={setChangePassword}
      ></ModalChangePassowrd>
    </div>
  );
};

export default Account;
