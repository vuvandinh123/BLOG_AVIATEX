/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import {
  DeleteDepartmentByAdmin,
  GetAllDepartmentByAdmin,
} from "../../../../service/department";
import { IoCloseOutline } from "react-icons/io5";
import ModalNewDepartment from "./ModalNewDepartment";
import { toast } from "sonner";

const Department = ({ data, setData }) => {
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await GetAllDepartmentByAdmin();
      setDepartments(res.data);
    })();
  },[refresh]);
  const handleDeleteCategory = async (id) => {
    if (!confirm("Bạn muốn xoá phòng ban này?")) {
      return;
    }
    try {
      const res = await DeleteDepartmentByAdmin(id);
      if (res.status === 200) {
        toast.success("Xóa phòng ban thành công");
        setRefresh((prev) => !prev);
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.error("Xóa thất bại", {
          description:
            "Vui lòng xóa hết các bài viết liên quan trước khi xóa phòng ban này",
        });
      } else {
        toast.error("Xóa phòng ban thất bại", {
          description: error.message,
        });
      }
    }
  };
  return (
    <div className="relative mb-4">
      <div
        htmlFor="title"
        className="leading-7 flex justify-between  mb-2 text-md text-gray-600"
      >
        Phòng ban
        <button
          onClick={() => setOpen(true)}
          type="button"
          className="px-2 text-green-500"
        >
          Thêm phòng ban
        </button>
      </div>
      <ul className="border rounded-md max-h-[300px] overflow-auto leading-8 p-3">
        {departments &&
          departments.map((item) => (
            <li key={item.id} className="flex justify-between">
              <label
                htmlFor={`category-${item.id}`}
                className="flex gap-2 cursor-pointer items-center"
              >
                <input
                  type="radio"
                  checked={data.department_id == item.id}
                  name="category_id"
                  value={item.id}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      department_id: e.target.value,
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
      <ModalNewDepartment
        isOpen={open}
        setRefresh={setRefresh}
        setIsOpen={setOpen}
      ></ModalNewDepartment>
    </div>
  );
};

export default Department;
