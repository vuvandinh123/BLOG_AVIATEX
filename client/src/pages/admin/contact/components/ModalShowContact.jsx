/* eslint-disable react/prop-types */
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from "keep-react";
import { IoCloseOutline } from "react-icons/io5";
import { ChangeStatusContact } from "../../../../service/contact";

const ModalShowContact = ({ isOpen, setShowContact, data,setRefresh }) => {
  const handleClickChangeStatus = async () => {
    const res = await ChangeStatusContact(data.id, "active");
    if (res) {
      setShowContact((prev) => ({ ...prev, show: false }));
      setRefresh((prev) => !prev);
    }
  };
  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={() => {}}>
        <ModalBody>
          <ModalContent className="h-full lg:min-w-[800px] overflow-auto">
            <IoCloseOutline
              onClick={() =>
                setShowContact((prev) => ({ ...prev, show: false }))
              }
              className="absolute cursor-pointer hover:text-red-500 right-4 top-4"
              size={25}
            ></IoCloseOutline>
            <ModalHeader className="mb-6 space-y-3">
              <div className="space-y-1 uppercase">
                <ModalTitle>Thông tin liên hệ</ModalTitle>
              </div>
            </ModalHeader>
            <div className="space-y-3 ">
              <table>
                <tbody>
                  <tr>
                    <th className="w-52 max-w-full text-start">Họ và tên</th>
                    <td className="py-2">{data.name}</td>
                  </tr>
                  <tr>
                    <th className="w-52 max-w-full text-start">Vị trí</th>
                    <td className="py-2">{data.location}</td>
                  </tr>
                  <tr>
                    <th className="w-52 max-w-full text-start">
                      Số điện thoại
                    </th>
                    <td className="py-2">{data.phone}</td>
                  </tr>
                  <tr>
                    <th className="w-52 max-w-full text-start">
                      Lĩnh vực kinh doanh
                    </th>
                    <td className="py-2">{data.business}</td>
                  </tr>
                  <tr>
                    <th className="w-52 max-w-full text-start">
                      Ngày liên lạc
                    </th>
                    <td className="py-2">{data.created_at}</td>
                  </tr>
                  <tr>
                    <th className="w-52 max-w-full text-start">Trạng thái</th>
                    <td className="py-2">{data.status}</td>
                  </tr>
                  <tr>
                    <th className="w-52 max-w-full text-start">Nội dung</th>
                    <td className="py-2 max-w-2xl">
                      {data.body} 
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="flex justify-end mt-10">
                <button
                  onClick={handleClickChangeStatus}
                  className="text-white px-3 py-2 rounded-sm bg-green-500 uppercase"
                >
                  đÁNH DẤU ĐÃ trả lời
                </button>
                <button
                  onClick={() =>
                    setShowContact((prev) => ({ ...prev, show: false }))
                  }
                  className="text-white px-3 py-2 ml-2 rounded-sm bg-red-500 uppercase"
                >
                  đÓng
                </button>
              </div>
            </div>
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ModalShowContact;
