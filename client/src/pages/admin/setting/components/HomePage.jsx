import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";
import { DeleteImage, UploadImage } from "../../../../service/upload";
import { GetHomePage, UpdateHomePage } from "../../../../service/setting";
import { toast } from "sonner";
import { AppURL } from "../../../../api/AppURL";

const HomePage = () => {
  const editorRef = useRef(null);
  const [images, setImages] = useState({
    banner_home: "",
    image_about: "",
  });
  const [oldImages, setOldImages] = useState({
    banner_home: null,
    image_about: null,
  });
  const [data, setData] = useState({
    title_home: "",
    banner_home: "",
    image_about: "",
    youtube_about: "",
    description_about: "",
    title_product: "",
    description_product: "",
  });
  useEffect(() => {
    (async () => {
      const res = await GetHomePage();
      if (res.status === 200) {
        setData(res.data);
        setImages({
          banner_home: res.data.banner_home,
          image_about: res.data.image_about,
        });
        setOldImages({
          banner_home: res.data.banner_home,
          image_about: res.data.image_about,
        });
      }
    })();
  }, []);
  const handleEditorChange = (content) => {
    setData((prev) => ({ ...prev, description_about: content }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(images);
    if (
      data.title_home === "" ||
      data.banner_home === "" ||
      data.image_about === "" ||
      data.youtube_about === "" ||
      data.description_about === "" ||
      data.title_product === "" ||
      data.description_product === ""
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    let img1 = images.banner_home;
    if (typeof images.banner_home === "object") {
      await DeleteImage(oldImages.banner_home);
      try {
        const res = await UploadImage(images.banner_home);
        img1 = res.data.fileName;
      } catch (error) {
        console.log(error);
      }
    }
    let img2 = images.image_about;
    if (typeof images.image_about === "object") {
      const res = await UploadImage(images.image_about);
      await DeleteImage(oldImages.image_about);
      img2 = res.data.fileName;
    }
    const newData = {
      ...data,
      banner_home: img1,
      image_about: img2,
    };
    const res = await UpdateHomePage(newData);
    if (res.status === 201) {
      toast.success("Cập nhật thành công");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5 flex lg:flex-row flex-col justify-between items-center">
        <h1 className="font-bold text-xl">Chỉnh sửa trang chủ</h1>
        <button className="bg-green-500 text-white uppercase px-3 py-2 rounded-md">
          Cập nhật
        </button>
      </div>
      <div className="mt-3">
        <div className=" flex gap-3 mb-2">
          <p className="">Banner</p>
          <label
            htmlFor="banner"
            className="cursor-pointer text-blue-500 underline"
          >
            Thay đổi
          </label>
          <input
            type="file"
            onChange={(e) =>
              setImages((prev) => ({ ...prev, banner_home: e.target.files[0] }))
            }
            id="banner"
            className="hidden"
          />
        </div>
        <div className="mb-2">
          <label className="mb-2 block">Tiêu đề</label>
          <input
            type="text"
            name="title_home"
            value={data.title_home}
            placeholder="Tiêu đề"
            onChange={(e) => setData({ ...data, title_home: e.target.value })}
            className="w-full border p-2 rounded-md outline-none"
          />
        </div>
        <div>
          {images.banner_home && typeof images.banner_home === "object" ? (
            <img src={URL.createObjectURL(images.banner_home)} alt="" />
          ) : typeof images.banner_home === "string" && images.banner_home ? (
            <img src={AppURL.ImageUrl + data.banner_home} alt="" />
          ) : (
            "NO BANNER"
          )}
        </div>
      </div>
      <div className="mt-5">
        <div className=" flex gap-3 mb-2">
          <p className="font-bold">VỀ CHÚNG TÔI</p>
        </div>
        <div className="mb-2">
          <label className="mb-2 block">Link video ( youtube )</label>
        </div>
        <div>
          <input
            type="text"
            name="youtube_about"
            value={data.youtube_about}
            onChange={(e) =>
              setData({ ...data, youtube_about: e.target.value })
            }
            placeholder="https://youtu.be/6G3O79zDyy0"
            className="w-full border p-2 rounded-md outline-none mb-2"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <label className="col-span-1  block shrink-0">
            {images.image_about && typeof images.image_about === "object" ? (
              <img
                src={URL.createObjectURL(images.image_about)}
                className="lg:h-[315px] w-full shrink-0"
                alt=""
              />
            ) : (
              <img
                src={AppURL.ImageUrl + data.image_about}
                alt=""
                className="lg:h-[315px] w-full shrink-0"
              />
            )}

            <input
              type="file"
              onChange={(e) =>
                setImages((prev) => ({
                  ...prev,
                  image_about: e.target.files[0],
                }))
              }
              className="hidden"
            />
          </label>
          <div className="col-span-1">
            <iframe
              width={560}
              className="max-w-full"
              height={315}
              src={data.youtube_about}
              title="YouTube video player"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className="lg:col-span-2 col-span-1">
            <Editor
              apiKey="pkujmrtdapk72uundfzjrz4n8oyk7317vzss52lu4wpm94pj"
              onEditorChange={handleEditorChange}
              name={"details"}
              value={data.description_about}
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
      </div>
      <div className="mt-5">
        <div className=" flex gap-3 mb-2">
          <p className="font-bold">VỀ SẢN PHẨM</p>
        </div>
        <div className="mb-2">
          <label className="mb-2 block">Tiêu đề</label>
        </div>
        <div>
          <input
            type="text"
            onChange={(e) =>
              setData({ ...data, title_product: e.target.value })
            }
            value={data.title_product}
            placeholder="Tiêu đề"
            className="w-full border p-2 rounded-md outline-none mb-2"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <textarea
              onChange={(e) =>
                setData({ ...data, description_product: e.target.value })
              }
              name=""
              value={data.description_product}
              className="w-full min-h-[200px] border outline-none rounded-md p-5"
              placeholder="Mô tả ngắn"
              id=""
            ></textarea>
          </div>
        </div>
      </div>
    </form>
  );
};

export default HomePage;
