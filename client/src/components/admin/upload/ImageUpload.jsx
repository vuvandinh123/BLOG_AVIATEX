/* eslint-disable react/prop-types */
import { AppURL } from "../../../api/AppURL";

const ImageUpload = ({ setImage, image }) => {
  return (
    <div className="relative mb-4 mt-6">
      <div>
        <div className="grid grid-cols-1 space-y-2">
          <label className="text-sm font-bold text-gray-500 tracking-wide">
            Ảnh đại diện
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex cursor-pointer flex-col rounded-lg border-4 border-dashed w-full h-60  group text-center">
              {image && typeof image === "object" ? (
                <img
                  className="w-full h-full "
                  src={URL.createObjectURL(image)}
                  alt="image"
                />
              ) : typeof image === "string" ? (
                <img
                  className="w-full h-full "
                  src={AppURL.ImageUrl + image}
                  alt="image"
                />
              ) : (
                <div className="h-full w-full text-center flex flex-col  justify-center items-center  ">
                  <div className="flex flex-auto max-h-48 w-2/5 mx-auto mt-5">
                    <img
                      className="has-mask h-36 object-center"
                      src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                      alt="freepik image"
                    />
                  </div>
                  <p className="pointer-none text-gray-500 ">
                    <span className="text-sm">Kéo ảnh vào đây</span> <br /> hoặc{" "}
                    <a href id className="text-blue-600 hover:underline">
                      Chọn ảnh
                    </a>{" "}
                    từ máy tính
                  </p>
                </div>
              )}

              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                name="file"
                id="file"
                accept="image/png, image/gif, image/jpeg, image/jpg, image/webp"
                className="hidden"
              />
            </label>
          </div>
        </div>
        <p className="text-sm mt-3 text-gray-400">
          <span>Hỗ trợ File type: png, webp, jpg, jpeg</span>
        </p>
        <div />
      </div>
    </div>
  );
};

export default ImageUpload;
