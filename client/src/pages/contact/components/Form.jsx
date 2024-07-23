import React, { useState } from "react";
import { toast } from "sonner";
import { CreateContactByAdmin } from "../../../service/contact";

const Form = () => {
  const [action, setAction] = useState(false);
  const [data, setData] = useState({
    name: "",
    phone: "",
    business: "",
    location: "Miền Nam",
    body: "",
  });
  const handleSubmitContact = async (e) => {
    e.preventDefault();
    if (data.name === "" || data.phone === "" || data.body === "") {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    setAction(true);
    const res = await CreateContactByAdmin(data);
    if (res.status === 200) {
      setData({
        name: "",
        phone: "",
        business: "",
        location: "Miền Nam",
        body: "",
      });
      setAction(false);
      toast.success("Gửi thành công");
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmitContact}
        className="ml-auo space-y-4"
      >
        <div>
          <h2 className="text-center text-xl font-bold">
            KẾT NỐI NGAY VỚI <span className="text-red-600">AVIATEK</span>{" "}
          </h2>
          <p className="mb-3 text-gray-500 text-center text-sm">
            Chúng tôi luôn sẵn sàng hợp tác và hỗ trợ bạn{" "}
          </p>
        </div>
        <div className="relative mb-4">
          <label htmlFor="name" className="leading-7 text-sm text-gray-600">
            Họ và tên <span className="text-red-500 ms-1 text-[12px]">(*)</span>
          </label>
          <input
            type="name"
            id="name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            name="name"
            placeholder="Họ và tên"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="relative mb-4">
          <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
            Số điện thoại
            <span className="text-red-500 ms-1 text-[12px]">(*)</span>
          </label>
          <input
            type="phone"
            value={data.phone}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
            id="phone"
            name="phone"
            placeholder="Số điện thoại"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="relative mb-4">
          <label
            htmlFor="kinhdoanh"
            className="leading-7 text-sm text-gray-600"
          >
            Lĩnh vực kinh doanh
          </label>
          <input
            type="text"
            id="kinhdoanh"
            value={data.business}
            onChange={(e) => setData({ ...data, business: e.target.value })}
            name="kinhdoanh"
            placeholder=" Lĩnh vực kinh doanh"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="relative mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">
            Vị trí của bạn
          </label>
          <select
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-3 px-3 leading-8 transition-colors duration-200 ease-in-out"
            name=""
            onChange={(e) => setData({ ...data, location: e.target.value })}
            id=""
          >
            <option value="Miền Nam">Miền Nam</option>
            <option value="Miền Bắc">Miền Bắc</option>
          </select>
        </div>
        <div className="relative mb-4">
          <label
            htmlFor="address"
            className="leading-7 mb-2 block text-sm text-gray-600"
          >
            Nội dung cần hỗ trợ
            <span className="text-red-500 ms-1 text-[12px]">(*)</span>
          </label>
          <textarea
            placeholder="Message"
            value={data.body}
            onChange={(e) => setData({ ...data, body: e.target.value })}
            rows={6}
            name="message"
            className="w-full rounded-md px-4 border text-sm pt-2.5 outline-[#007bff]"
            defaultValue={""}
          />
        </div>
        <button
          type="submit"
          disabled={action}
          className="text-white cursor-pointer bg-[#007bff] hover:bg-blue-600 font-semibold rounded-md text-sm px-4 py-2.5 w-full"
        >
          Gửi thông tin
        </button>
      </form>
    </div>
  );
};

export default Form;
