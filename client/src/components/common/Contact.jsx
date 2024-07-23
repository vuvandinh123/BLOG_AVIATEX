import { useState } from "react";
import { Subscribe } from "../../service/subscriber";
import { toast } from "sonner";

const Contact = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Subscribe({
        email: email,
      });
      if (res.status === 201) {
        toast.success("Đăng ký thành công");
        setEmail("");
      }
    } catch (error) {
      toast.error(`Email đã được đăng ký`)
    }
  };
  return (
    <div className="border-b py-10 ">
      <div className="max-w-6xl px-3 m-auto flex justify-center items-center">
        <form onSubmit={handleSubmit} className="lg:w-1/2 text-center">
          <h2 className="text-lg font-bold lg:text-3xl ">ĐĂNG KÝ NHẬN TIN</h2>
          <p className="my-2 text-gray-400">
            Để lại email của bạn để nhận thông tin mới nhất từ Avitatek
          </p>
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-5 py-3 border shadow-md pr-36 outline-blue-500 rounded-full w-full"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2  translate-y-[-50%]  px-5 py-2 rounded-full bg-blue-600 text-white"
            >
              ĐĂNG KÝ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
