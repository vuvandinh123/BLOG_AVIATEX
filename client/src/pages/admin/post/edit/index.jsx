import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Category from "../components/Category";
import { toast } from "sonner";
import { DeleteImage, UploadImage } from "../../../../service/upload";
import ImageUpload from "../components/ImageUpload";
import { getPostById, UpdatePostByAdmin } from "../../../../service/post";

const EditPost = () => {
  const [data, setData] = useState({
    title: "",
    topic_id: "",
    body: "",
  });
  const [image, setImage] = useState(null);
  const [typeSave, setTypeSave] = useState("publish");

  const [oldImage, setOldImage] = useState(null);
  const { id } = useParams();
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const handleEditorChange = (content, editor) => {
    setData({ ...data, body: content });
  };
  useEffect(() => {
    (async () => {
      const res = await getPostById(id);
      setData({
        title: res.data.title,
        topic_id: res.data.topic_id,
        body: res.data.body,
      });
      setOldImage(res.data.thumbnail);
      setImage(res.data.thumbnail);
      setTypeSave(res.data.status);
    })();
  }, [id]);
  const handleSubmitSavePost = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Vui lòng chọn hình ảnh đại diện");
      return;
    }
    if (data.title === "" || data.topic_id === "") {
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
        status: typeSave,
      };
      const res2 = await UpdatePostByAdmin(id, newData);
      if (res2.status === 200) {
        toast.success("Sửa bài viết thành công");
        navigate("/admin/bai-viet");
      }
    } catch (error) {
      toast.error("Sửa bài viết thất bại! " + error.message);
    }
  };
  return (
    <form onSubmit={handleSubmitSavePost}>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl uppercase mb-5 font-bold">Thêm bài viết</h1>
        <div className="flex items-center gap-3">
          <Link
            to={"/admin/bai-viet"}
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
      <div className="grid grid-cols-4 gap-3 mt-5">
        <div className="col-span-3">
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
          <Category setData={setData} data={data}></Category>
          <ImageUpload setImage={setImage} image={image}></ImageUpload>
        </div>
      </div>
    </form>
  );
};

export default EditPost;
