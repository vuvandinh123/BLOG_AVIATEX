/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { GetAllDepartment } from "../../../service/department";

const Department = ({ handleChange }) => {
  const [department, setDepartment] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await GetAllDepartment();
      setDepartment(res.data);
    })();
  }, []);
  return (
    <div>
      <p className="text-gray-500 ms-3">Bộ phận ứng tuyển</p>
      <select
        className="outline-none bg-white px-3 py-3 mt-2 w-full lg:w-2/3"
        name=""
        id=""
        onChange={handleChange}
      >
        <option value="all">Tất cả bộ phận và dự án</option>
        {department.map((item, index) => (
          <option key={index} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Department;
