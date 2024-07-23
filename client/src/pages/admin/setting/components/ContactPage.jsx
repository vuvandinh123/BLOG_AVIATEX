import { useEffect, useState } from "react";
import { GetHomePage, UpdateHomePage } from "../../../../service/setting";
import { toast } from "sonner";

const ContactPage = () => {
  const [data, setData] = useState({
    email: "",
    phone: "",
    facebook: "",
    instagram: "",
    zalo: "",
    message: "",
  });
  useEffect(() => {
    (async () => {
      const res = await GetHomePage();
      if (res.status === 200) {
        setData(res.data);
        console.log(res.data);
      }
    })();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = {
      ...data,
    };
    const res = await UpdateHomePage(newData);
    if (res.status === 201) {
      toast.success("Cập nhật thành công");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5 flex justify-between items-center">
        <h2 className="text-lg font-bold tracking-tight">Liên hệ</h2>
        <button className="bg-green-500 text-white uppercase px-3 py-2 rounded-md">
          Cập nhật
        </button>
      </div>
      <div className="mb-2">
        <label className="mb-2 block" htmlFor="">
          Email
        </label>
        <input
          type="email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
          value={data.email}
          name="email"
          placeholder="Email"
          className="w-full px-3 py-2 rounded-md border outline-none"
        />
      </div>
      <div className="mb-2">
        <label className="mb-2 block" htmlFor="">
          Số điện thoại
        </label>
        <input
          type="phone"
          value={data.phone}
          onChange={(e) => setData({ ...data, phone: e.target.value })}
          placeholder="Số điện thoại"
          name="phone"
          className="w-full px-3 py-2 rounded-md border outline-none"
        />
      </div>
      <div className="mb-2">
        <label className="mb-2 block" htmlFor="">
          Message
        </label>
        <input
          type="text"
          name="message"
          value={data.message}
          onChange={(e) => setData({ ...data, message: e.target.value })}
          placeholder="link message"
          className="w-full px-3 py-2 rounded-md border outline-none"
        />
      </div>
      <div className="mb-2">
        <label className="mb-2 block" htmlFor="">
          ZALO
        </label>
        <input
          type="text"
          name="zalo"
          onChange={(e) => setData({ ...data, zalo: e.target.value })}
          value={data.zalo}
          placeholder="link zalo"
          className="w-full px-3 py-2 rounded-md border outline-none"
        />
      </div>
      <h2 className="font-bold my-2 mt-10 text-md">Mạng xã hội</h2>
      <div className="mb-2">
        <label className="mb-2 block" htmlFor="">
          Facebook
        </label>
        <input
          type="text"
          name="facebook"
          onChange={(e) => setData({ ...data, facebook: e.target.value })}
          value={data.facebook}
          placeholder="link facebook"
          className="w-full px-3 py-2 rounded-md border outline-none"
        />
      </div>
      <div className="mb-2">
        <label className="mb-2 block" htmlFor="">
          Instagram
        </label>
        <input
          type="text"
          name="instargram"
          onChange={(e) => setData({ ...data, instagram: e.target.value })}
          value={data.instagram}
          placeholder="link instargram"
          className="w-full px-3 py-2 rounded-md border outline-none"
        />
      </div>
    </form>
  );
};

export default ContactPage;
