import Account from "./components/Account";
import HomePage from "./components/HomePage";
import ContactPage from "./components/ContactPage";
import { useState } from "react";

const SettingAdmin = () => {
  const [open, setOpen] = useState("account");
  return (
    <div>
      <div className=" space-y-6 p-10 pb-16 md:block bg-white">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Cài đặt</h2>
          <p className="text-muted-foreground">
            Quản lý tài khoản và các thành phần trên website
          </p>
        </div>
        {/* Seperator */}
        <div className="shrink-0 bg-border h-[1px] w-full" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
            <button
              onClick={() => setOpen("account")}
              className={`inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent hover:underline justify-start ${
                open === "account" ? "underline text-blue-500" : ""
              }`}
            >
              Tài khoản
            </button>
            <button
              onClick={() => setOpen("homepage")}
              className={`inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent hover:underline justify-start ${
                open === "homepage" ? "underline text-blue-500" : ""
              }`}
            >
              Trang chủ
            </button>

            <button
              onClick={() => setOpen("contactpage")}
              className={`inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent hover:underline justify-start ${
                open === "contactpage" ? "underline text-blue-500" : ""
              }`}
            >
              Liên hệ
            </button>
          </nav>
          <div className="flex-1 ">
            {/* About Page Content */}
            {open === "account" && <Account></Account>}
            {open === "homepage" && <HomePage></HomePage>}
            {open === "contactpage" && <ContactPage></ContactPage>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingAdmin;
