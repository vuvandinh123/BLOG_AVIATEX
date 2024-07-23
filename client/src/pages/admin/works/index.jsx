/* eslint-disable react-hooks/exhaustive-deps */
import { toast } from "keep-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChangeStatusPost,
  DeletePostByAdmin,
  GetAllPostByAdmin,
} from "../../../service/post";
import { useToTop } from "../../../hook";
import moment from "moment";
import { AppURL } from "../../../api/AppURL";
import { FiEdit } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { DeleteImage } from "../../../service/upload";
import { MdOutlineToggleOff, MdToggleOn } from "react-icons/md";
import { GetAllTopicByAdmin } from "../../../service/topic";
import { debounce } from "lodash";
import PaginationPost from "../../../components/admin/paginations/Pagination";
import { DeleteWorkByAdmin, GetAllWorkByAdmin } from "../../../service/work";
const Works = () => {
  useToTop();
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [filter, setFilter] = useState({
    search: "",
  });
  const [pagination, setPagination] = useState({
    total: 0,
    activePage: 1,
    limit: 10,
    totalPage: 1,
  });
  useEffect(() => {
    (async () => {
      const [res1] = await Promise.all([GetAllWorkByAdmin(filter)]);
      setPagination({
        ...pagination,
        total: res1.options?.total ?? 0,
        totalPage: res1.options?.pagination?.totalPage ?? 1,
        activePage: res1.options?.pagination?.page ?? 1,
        limit: res1.options?.pagination?.limit ?? 10,
      });
      setData(res1.data);
    })();
  }, [refresh, pagination.limit, pagination.activePage, filter.search]);
  const handleDeletePost = async (id) => {
    if (!confirm("Bạn chắc chắn muốn xoá bài viết ?")) {
      return;
    }
    try {
      const imageName = data.find((post) => post.id === id).thumbnail;
      const [res, res2] = await Promise.all([
        DeleteImage(imageName),
        DeleteWorkByAdmin(id),
      ]);
      if (res2.status === 200 && res.status === 200) {
        toast.success("Xóa bài viết thành công");
        setRefresh((prev) => !prev);
      } else {
        toast.error("Xóa bài viết thát bại");
      }
    } catch (error) {
      toast.error("Xóa bài viết thất bại " + error.message);
      console.log(error);
    }
  };
  const handleChangeSearch = debounce((e) => {
    setFilter({
      ...filter,
      search: e.target.value,
    });
    setPagination({ ...pagination, activePage: 1 });

  }, 500);

  return (
    <div>
      <div>
        <div className="flex flex-wrap -mx-3 mb-5">
          <div className="w-full max-w-full ">
            <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white ">
              <div className="relative flex flex-col min-w-0 break-words ">
                {/* card header */}
                <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                  <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                    <span className="mr-3 font-semibold text-dark">
                      QUẢN LÝ HOẠT ĐỘNG
                    </span>
                    <span className=" text-gray-500  font-medium text-secondary-dark text-[12px] mt-2 block">
                      Tất cả hoạt động
                    </span>
                  </h3>
                  <div className="relative flex flex-wrap items-center my-2">
                    <Link
                      to={"/admin/hoat-dong/them-moi"}
                      className="inline-block border px-3 py-2 rounded-lg bg-green-600 text-white"
                    >
                      {" "}
                      Thêm mới
                    </Link>
                  </div>
                </div>
                {/* end card header */}
                {/* card body  */}
                <div className="flex-auto block py-8 pt-6 px-9 shadow-md">
                  <div className="flex items-center justify-between mb-10 gap-2 ">
                    <div>Lọc :</div>
                    <div className="flex items-center gap-2">
                      <div>
                        <input
                          type="text"
                          placeholder="Tìm kiếm..."
                          onChange={handleChangeSearch}
                          className="px-5 h-[35px] border rounded-md  pr-36 outline-none w-full"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full my-0 align-middle text-dark border-neutral-200">
                      <thead className="align-bottom">
                        <tr className="font-semibold border-b  uppercase text-[0.95rem] text-secondary-dark">
                          <th className="pb-3 text-start min-w-[100px]">
                            HÌNH ẢNH
                          </th>
                          <th className="pb-3 text-start min-w-[175px]">
                            Tiêu đề
                          </th>
                          <th className="pb-3 text-center min-w-[100px]">
                            NGÀY TẠO
                          </th>
                          <th className="pb-3 text-end min-w-[50px]">
                            CHI TIẾT
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data &&
                          data.map((item) => {
                            return (
                              <tr
                                key={item.id}
                                className="border-b border-dashed "
                              >
                                <td className="w-[200px] pl-0">
                                  <img
                                    src={`${AppURL.ImageUrl}${item.thumbnail}`}
                                    className="w-[150px] h-[70px] object-cover inline-block shrink-0 "
                                    alt
                                  />
                                </td>
                                <td className="p-3 pl-0">
                                  <div className="flex flex-col justify-start">
                                    <Link to={`/admin/hoat-dong/chinh-sua/${item.id}`} className="mb-1 capitalize  transition-colors duration-200 ease-in-out text- text-secondary-inverse hover:text-primary">
                                      {item.name}
                                    </Link>
                                  </div>
                                </td>

                                <td className=" text-center">
                                  <span className="">
                                    {moment(item.created_at).format(
                                      " DD/MM/YYYY"
                                    )}
                                  </span>
                                </td>

                                <td className="p-3 pr-0 ">
                                  <div className="flex justify-end items-center gap-3">
                                    <Link
                                      className="hover:text-blue-500"
                                      to={`/admin/hoat-dong/chinh-sua/${item.id}`}
                                    >
                                      <FiEdit size={20}></FiEdit>
                                    </Link>
                                    <button
                                      onClick={() => handleDeletePost(item.id)}
                                      className="hover:text-red-500"
                                    >
                                      <GoTrash size={20}></GoTrash>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        {data.length === 0 && (
                          <tr className="">
                            <td
                              colSpan={5}
                              className="text-center text-gray-500 mt-4"
                            >
                              Không có bài viết
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <PaginationPost
                    setPagination={setPagination}
                    totalPages={pagination.totalPage}
                    activePage={pagination.activePage}
                    limit={pagination.limit}
                    totalProduct={pagination.total}
                  ></PaginationPost>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Works;
