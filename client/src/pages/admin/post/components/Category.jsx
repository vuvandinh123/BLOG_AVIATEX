/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  DeleteTopicByAdmin,
  GetAllTopicByAdmin,
} from "../../../../service/topic";
import ModalNewCategory from "./ModalNewCategory";
import { toast } from "keep-react";
import { IoCloseOutline } from "react-icons/io5";

const Category = ({ setData ,data}) => {
  const [topics, setTopics] = useState([]);
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    (async () => {
      const res = await GetAllTopicByAdmin();
      if (res.status === 200) setTopics(res.data);
    })();
  }, [refresh]);
  const deleteTopic = async (id) => {
    try {
      const res = await DeleteTopicByAdmin(id);
      if (res.status === 200) {
        toast.success("Xóa danh mục thành công");
        setRefresh((prev) => !prev);
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.error("Xóa danh mục thất bại", {
          description:
            "Vui lòng xóa hết các bài viết liên quan trước khi xóa danh mục này",
        });
      } else {
        toast.error("Xóa danh mục thất bại", {
          description: error.message,
        });
      }
    }
  };
  const handleDeleteCategory = async (id) => {
    if (!confirm("Bạn muốn xoá danh mục này?")) {
      return;
    }
    await deleteTopic(id);
  };
  return (
    <div className="relative mb-4">
      <div
        htmlFor="title"
        className="leading-7 flex justify-between  mb-2 text-md text-gray-600"
      >
        Danh mục
        <button
          onClick={() => setOpen(true)}
          type="button"
          className="px-2 text-green-500"
        >
          Thêm danh mục
        </button>
      </div>
      <ul className="border rounded-md max-h-[300px] overflow-auto leading-8 p-3">
        {topics &&
          topics.map((item) => (
            <li key={item.id} className="flex justify-between">
              <label
                htmlFor={`category-${item.id}`}
                className="flex gap-2 cursor-pointer items-center"
              >
                <input
                  type="radio"
                  checked={data.topic_id == item.id}
                  name="category_id"
                  value={item.id}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      topic_id: e.target.value,
                    }))
                  }
                  className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                  id={`category-${item.id}`}
                />
                {item.name}
              </label>
              <IoCloseOutline
                onClick={() => handleDeleteCategory(item.id)}
                className="cursor-pointer hover:text-red-500"
                size={20}
              ></IoCloseOutline>
            </li>
          ))}
      </ul>
      <ModalNewCategory
        isOpen={open}
        setRefresh={setRefresh}
        setIsOpen={setOpen}
      ></ModalNewCategory>
    </div>
  );
};

export default Category;
