/* eslint-disable react/prop-types */
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalTitle,
  toast,
} from "keep-react";
import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { ChangePasswordByAdmin } from "../../../../service/auth";

const ModalChangePassowrd = ({ isOpen, setIsOpen }) => {
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handleSubmitChangePassword = async (e) => {
    e.preventDefault();
    if (
      data.oldPassword === "" ||
      data.newPassword === "" ||
      data.confirmPassword === ""
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Xác nhận mật khẩu không khớp");
      return;
    }
    try {
      const res = await ChangePasswordByAdmin({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      if (res.status === 200) {
        toast.success("Thay đổi mật khẩu thanh cong");
        setIsOpen(false);
      } else {
        toast.error("Thay đổi mật này thể bắi");
      }
    } catch (error) {
      toast.error(`Mật khẩu không đúng`);
    }
  };
  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={() => {}}>
        <ModalBody>
          <ModalContent className=" lg:min-w-[800px] overflow-auto">
            <IoCloseOutline
              onClick={() => setIsOpen(false)}
              className="absolute cursor-pointer hover:text-red-500 right-4 top-4"
              size={25}
            ></IoCloseOutline>
            <ModalHeader className="mb-6 space-y-3">
              <div className="space-y-1 uppercase">
                <ModalTitle>Sửa mật khẩu</ModalTitle>
              </div>
            </ModalHeader>
            <form onSubmit={handleSubmitChangePassword}>
              <div className="mb-2">
                <label htmlFor="category" className="text-gray-600 block mb-2">
                  Mật khẩu cũ
                </label>
                <input
                  type="password"
                  value={data.oldPassword}
                  onChange={(e) =>
                    setData({ ...data, oldPassword: e.target.value })
                  }
                  name="password_old"
                  id="password_old"
                  placeholder="Mật khẩu cũ"
                  className="w-full border p-2 rounded-md outline-none"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="category" className="text-gray-600 block mb-2">
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  name="password_new"
                  value={data.newPassword}
                  onChange={(e) =>
                    setData({ ...data, newPassword: e.target.value })
                  }
                  id="password_old"
                  placeholder="Mật khẩu mới"
                  className="w-full border p-2 rounded-md outline-none"
                />
              </div>
              <div>
                <label htmlFor="category" className="text-gray-600 block mb-2">
                  Xác nhận mật khẩu mới
                </label>
                <input
                  type="password"
                  value={data.confirmPassword}
                  onChange={(e) =>
                    setData({ ...data, confirmPassword: e.target.value })
                  }
                  name="password_new_confirm"
                  id="password_old"
                  placeholder="Xác nhận Mật khẩu mới"
                  className="w-full border p-2 rounded-md outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-2 rounded-md bg-green-500 text-white hover:bg-green-700 transition-all w-full py-2 mt-5"
              >
                Cập nhật
              </button>
            </form>
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ModalChangePassowrd;
