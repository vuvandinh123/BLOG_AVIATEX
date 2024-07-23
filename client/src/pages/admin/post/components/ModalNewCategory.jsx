/* eslint-disable react/prop-types */
import {
  Button,
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  toast,
} from "keep-react";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { CreateTopicByAdmin } from "../../../../service/topic";
const ModalNewCategory = ({ isOpen, setIsOpen, setRefresh }) => {
  const [name, setName] = useState("");
  const handleSubmitAddCategory = async (e) => {
    e.preventDefault();
    if (name === "") {
      toast.error("Vui lòng nhập tên danh mục");
      return;
    }
    try {
      const res = await CreateTopicByAdmin({ name });
      if (res.status === 200) {
        toast.success("Thêm danh mục thành công");
        setIsOpen(false);
        setRefresh((prev) => !prev);
      } else {
        toast.error("Thêm danh mục thất bại");
      }
    } catch (error) {
      toast.error(`Thêm danh mục thất bại ${error}`);
    }
  };
  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={() => {}}>
        <ModalBody>
          <ModalContent>
            <IoCloseOutline
              onClick={() => setIsOpen(false)}
              className="absolute cursor-pointer hover:text-red-500 right-4 top-4"
              size={25}
            ></IoCloseOutline>
            <ModalHeader className="mb-6 space-y-3">
              <div className="space-y-1 uppercase">
                <ModalTitle>Thêm mới danh mục</ModalTitle>
              </div>
            </ModalHeader>
            <div>
              <label htmlFor="category" className="text-gray-600 block mb-2">
                Tên danh mục
              </label>
              <input
                type="text"
                name="category"
                onChange={(e) => setName(e.target.value)}
                id="category"
                placeholder="Nhập tên danh mục muốn thêm"
                className="w-full border p-2 rounded-md outline-none"
              />
              <button
                type="button"
                onClick={handleSubmitAddCategory}
                className="px-2 rounded-md bg-green-500 text-white hover:bg-green-700 transition-all w-full py-1 mt-5"
              >
                Thêm
              </button>
            </div>
            <ModalFooter>
              <ModalClose>
                <Button size="sm" variant="outline" color="secondary">
                  Cancel
                </Button>
              </ModalClose>
              <ModalClose>
                <Button size="sm" color="primary">
                  Confirm
                </Button>
              </ModalClose>
            </ModalFooter>
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ModalNewCategory;
