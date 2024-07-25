import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { UploadImage } from "../../../../service/upload";
import ImageUpload from "../../../../components/admin/upload/ImageUpload";
import Department from "../components/Department";
import { CreateRecruitmentByAdmin } from "../../../../service/recruitment";

const CreateRecruitment = () => {
  const [data, setData] = useState({
    title: "",
    department_id: "",
  });
  const [image, setImage] = useState(null);
  const [typeSave, setTypeSave] = useState("publish");
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const handleEditorChange = (content) => {
    setData((prev) => ({ ...prev, body: content }));
  };
  const handleSubmitAddPost = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Vui lòng chọn hình ảnh đại diện");
      return;
    }
    if (data.title === "" || data.department_id === "") {
      toast.error("Các trường không được để trống");
      return;
    }
    try {
      const res = await UploadImage(image);
      if (res.status === 201) {
        const newData = {
          ...data,
          thumbnail: res.data.fileName,
          body: editorRef.current.getContent(),
          status: typeSave,
        };
        const res2 = await CreateRecruitmentByAdmin(newData);
        if (res2.status === 200) {
          toast.success("Thêm bài viết thành công");
          navigate("/admin/tuyen-dung");
        }
      }
    } catch (error) {
      toast.error("Them bai viet that bai " + error.message);
    }
  };
  return (
    <form onSubmit={handleSubmitAddPost}>
      <div className="flex flex-wrap justify-between items-center">
        <h1 className="text-2xl uppercase mb-5 font-bold">
          Thêm tin tuyển dụng
        </h1>
        <div className="flex items-center gap-3">
          <Link
            to={"/admin/tuyen-dung"}
            className="inline-block border uppercase px-5 py-2 rounded-md bg-gray-100 text-red-600 "
          >
            HỦY
          </Link>
          <button
            type="submit"
            onClick={() => setTypeSave("draft")}
            className="px-3 py-2 bg-red-500 rounded-md uppercase text-white"
          >
            Lưu nháp
          </button>
          <button
            type="submit"
            onClick={() => setTypeSave("publish")}
            className="px-3 py-2 bg-green-500 rounded-md uppercase text-white"
          >
            Lưu và hiển thị
          </button>
        </div>
      </div>
      <div className="grid lg:grid-cols-4 gap-3 mt-5">
        <div className="col-span-1 lg:col-span-3">
          <div className="relative mb-4">
            <label
              htmlFor="title"
              className="leading-7 block mb-2 text-md text-gray-600"
            >
              Tiêu đề
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              placeholder="Nhập tiêu đề bài viết tại đây"
              className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div>
            <label
              htmlFor="title"
              className="leading-7 block mb-2 text-md text-gray-600"
            >
              Nội dung
            </label>
            <Editor
              apiKey="pkujmrtdapk72uundfzjrz4n8oyk7317vzss52lu4wpm94pj"
              onEditorChange={handleEditorChange}
              name={"details"}
              init={{
                plugins:
                  "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount fullscreen preview",
                toolbar:
                  "undo redo | blocks fontfamily fontsize | align lineheight | bold italic underline strikethrough | link image media table |  numlist bullist indent outdent | emoticons charmap | removeformat preview fullscreen",
                setup: (editor) => {
                  editorRef.current = editor;
                  editor.on("change", (e) =>
                    handleEditorChange(editor.getContent(), editor)
                  );
                },
              }}
            />
          </div>
        </div>
        <div>
          <Department setData={setData} data={data}></Department>
          <ImageUpload setImage={setImage} image={image}></ImageUpload>
        </div>
      </div>
    </form>
  );
};

export default CreateRecruitment;
