import img1 from "../../../assets/10.png";
import img2 from "../../../assets/11.png";
const Content = () => {
  return (
    <div className="bg-blue-200 bg-opacity-50 ">
      <div  className="grid lg:grid-cols-4 items-center max-w-screen-xl mx-auto p-10">
        <div className="col-span-2">
          <h3 className="before:bg-blue-300 text-blue-500 before:block items-center before:w-10 gap-3 before:h-10 flex before:shrink-0 text-2xl font-bold">
            Tầm nhìn, sứ mệnh
          </h3>
          <p className="mt-4 leading-8 text-gray-600">
            <b>Tầm nhìn:</b> Aviatek mong muốn trở thành công ty dẫn đầu trong
            lĩnh vực xuất nhập khẩu và phân phối hàng hóa, đặc biệt trong các
            ngành hàng nông sản và sản phẩm mẹ và bé cao cấp tại Việt Nam.
            <br />
            <b>Sứ mệnh:</b> Chúng tôi cam kết cung cấp các sản phẩm chất lượng
            cao, đáp ứng nhu cầu và mong đợi của khách hàng. Aviatek luôn nỗ lực
            xây dựng một môi trường kinh doanh bền vững, tạo ra giá trị lâu dài
            cho cả khách hàng và đối tác.
          </p>
        </div>
        <div data-aos="fade-left" className="col-span-2">
          <img src={img1} alt="" />
        </div>
      </div>
      <div data-aos="fade-down" className="grid lg:grid-cols-4 items-center max-w-screen-xl mx-auto p-10">
        <div data-aos="fade-right" className="col-span-2">
          <img src={img2} alt="" />
        </div>
        <div className="col-span-2">
          <h3 className="before:bg-blue-300 text-blue-500 before:block items-center before:w-10 gap-3 before:h-10 flex before:shrink-0 text-2xl font-bold">
            Giá trị cốt lõi
          </h3>
          <p className="mt-4 leading-8 text-gray-600">
            <br /> <b>Giá trị cốt lõi:</b> Aviatek hoạt động dựa trên ba giá trị
            cốt lõi: Chất lượng, Đáng tin cậy và Sáng tạo. Chúng tôi luôn đặt
            chất lượng sản phẩm và dịch vụ lên hàng đầu, cam kết mang đến những
            giá trị tốt nhất cho khách hàng. Sự đáng tin cậy của chúng tôi được
            xây dựng qua mỗi giao dịch, mỗi sản phẩm và mỗi mối quan hệ. Sáng
            tạo là yếu tố giúp chúng tôi không ngừng cải tiến và phát triển,
            mang đến những giải pháp hiệu quả và đột phá.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Content;
