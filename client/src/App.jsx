import { Route, Routes } from "react-router-dom";
import Layout from "./layouts";
import {
  About,
  Blog,
  BlogDetail,
  Contact,
  Home,
  NotFoundPage,
  Recruitment,
  RecruitmentDetail,
  Search,
  Work,
} from "./pages";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LayoutAdmin from "./layouts/LayoutAdmin";
import Dashboard from "./pages/admin/dashboard";
import {
  ContactAdmin,
  ListRecruitment,
  Login,
  Posts,
  Setting,
  Works,
} from "./pages/admin";
import { Toaster } from "sonner";
import CreatePost from "./pages/admin/post/create";
import EditPost from "./pages/admin/post/edit";
import CreateWork from "./pages/admin/works/create";
import EditWork from "./pages/admin/works/edit";
import CreateRecruitment from "./pages/admin/recruitment/create";
import EditRecruitment from "./pages/admin/recruitment/edit";
function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home></Home>} />
          <Route path="/ve-chung-toi" element={<About></About>} />
          <Route path="/hoat-dong" element={<Work></Work>} />
          <Route path="/tin-tuc" element={<Blog></Blog>} />
          <Route path="/tin-tuc/:id" element={<BlogDetail></BlogDetail>} />
          <Route path="/tuyen-dung" element={<Recruitment></Recruitment>} />
          <Route
            path="/tuyen-dung/:id"
            element={<RecruitmentDetail></RecruitmentDetail>}
          />
          <Route path="/lien-he" element={<Contact></Contact>} />
          <Route path="/tim-kiem" element={<Search></Search>} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<Dashboard />} />
          <Route path="bai-viet" element={<Posts />} />
          <Route path="bai-viet/them-moi" element={<CreatePost />} />
          <Route path="bai-viet/chinh-sua/:id" element={<EditPost />} />
          <Route path="hoat-dong" element={<Works />} />
          <Route path="hoat-dong/them-moi" element={<CreateWork />} />
          <Route path="hoat-dong/chinh-sua/:id" element={<EditWork />} />
          <Route path="tuyen-dung" element={<ListRecruitment />} />
          <Route path="tuyen-dung/them-moi" element={<CreateRecruitment />} />
          <Route
            path="tuyen-dung/chinh-sua/:id"
            element={<EditRecruitment />}
          />
          <Route path="ho-tro" element={<ContactAdmin />} />
          <Route path="cai-dat" element={<Setting />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster
        toastOptions={{
          classNames: {
            error: "text-red-400",
            success: "text-green-600",
            warning: "text-yellow-400",
            info: "text-blue-400",
          },
        }}
      />
    </>
  );
}

export default App;
