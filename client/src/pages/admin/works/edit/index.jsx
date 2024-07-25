import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { DeleteImage, UploadImage } from "../../../../service/upload";
import ImageUpload from "../../../../components/admin/upload/ImageUpload";
import { getWorkById, UpdateWorkByAdmin } from "../../../../service/work";

const EditWork = () => {
  const [data, setData] = useState({
    name: "",
    body: "",
  });
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState(null);
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const handleEditorChange = (content) => {
    setData((prev) => ({ ...prev, body: content }));
  };
  useEffect(() => {
    (async () => {
      const res = await getWorkById(id);
      setData({
        name: res.data.name,
        body: res.data.body,
      });
      setImage(res.data.thumbnail);
      setOldImage(res.data.thumbnail);
    })();
  }, [id]);
  const handleSubmitAddPost = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Vui lòng chọn hình ảnh đại diện");
      return;
    }
    if (data.name === "" || data.body === "") {
      toast.error("Các trường không được để trống");
      return;
    }
    try {
      let img = image;
      if (typeof img === "object") {
        const res = await UploadImage(image);
        img = res.data.fileName;
        if (typeof oldImage === "string") await DeleteImage(oldImage);
      }
      const newData = {
        ...data,
        thumbnail: img,
        body: editorRef.current.getContent(),
      };
      const res2 = await UpdateWorkByAdmin(id, newData);
      if (res2.status === 200) {
        toast.success("Sửa hoạt động thành công");
        navigate("/admin/hoat-dong");
      }
    } catch (error) {
      toast.error("Sửa hoạt động  that bai " + error.message);
    }
  };
  return (
    <form onSubmit={handleSubmitAddPost}>
      <div className="flex flex-wrap justify-between items-center">
        <h1 className="text-2xl uppercase mb-5 font-bold">Sửa hoạt động</h1>
        <div className="flex items-center gap-3">
          <Link
            to={"/admin/hoat-dong"}
            className="inline-block border uppercase px-5 py-2 rounded-md bg-gray-100 text-red-600 "
          >
            HỦY
          </Link>
          <button
            type="submit"
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
              Tên hoạt động
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
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
              value={data.body}
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
          <ImageUpload setImage={setImage} image={image}></ImageUpload>
        </div>
      </div>
    </form>
  );
};

export default EditWork;
