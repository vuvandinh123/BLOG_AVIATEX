/* eslint-disable react-hooks/exhaustive-deps */
import { IoSearchOutline } from "react-icons/io5";
import { getSearch } from "../../service/post";
import { useEffect, useState } from "react";
import Product from "./components/Product";
import PaginationPost from "../../components/admin/paginations/Pagination";
import { getUrlSearchParam, setUrlSearchParam } from "../../utils";
import { useLocation } from "react-router-dom";
import useTitle from "../../hook/useTitle";

const Search = () => {
  useTitle("Tìm kiếm | AVIATEX");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    activePage: 1,
    limit: 6,
    totalPage: 1,
  });
  const location2 = useLocation();
  useEffect(() => {
    (async () => {
      const q = getUrlSearchParam("q");
      if (q) {
        await fetchApiSearch();
      }
    })();
  }, [pagination.activePage, pagination.limit, location2.search]);
  const fetchApiSearch = async () => {
    setLoading(true);
    const q = getUrlSearchParam("q");
    const res = await getSearch({
      search: q,
      page: pagination.activePage,
      limit: pagination.limit,
    });
    if (res.status === 200) {
      setData(res.data);
      setUrlSearchParam("q", search);
      setPagination({
        ...pagination,
        total: res.options?.total ?? 0,
        totalPage: res.options?.pagination?.totalPage ?? 1,
        activePage: res.options?.pagination?.page ?? 1,
        limit: res.options?.pagination?.limit ?? 10,
      });
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };
  const handleSubmitSearch = async (e) => {
    e.preventDefault();
    if (search === "") return;
    setPagination({
      ...pagination,
      activePage: 1,
    })
    await fetchApiSearch();
  };
  return (
    <div className=" fixed bg-white inset-0 mt-20 lg:mt-0 lg:left-[100px] px-3 z-40 overflow-auto">
      <div className="lg:w-[700px] mx-auto">
        <h1 className="mt-20 uppercase text-center ">KẾT QUẢ TÌM KIẾM</h1>
        <form onSubmit={handleSubmitSearch}>
          <div className="relative">
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              className="mt-5 w-full  outline-none focus:border-blue-500 border-b-2 px-3 py-2"
              placeholder="Tìm kiếm..."
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 hover:text-blue-500 cursor-pointer"
            >
              <IoSearchOutline size={25}></IoSearchOutline>
            </button>
          </div>
        </form>
        <p className="text-gray-500 text-sm mt-2">
          Có {pagination.total} kết quả tìm thấy
        </p>
      </div>
      <div className="lg:w-[1200px] max-w-full mx-auto mb-10">
        {loading && (
          <div className="flex justify-center items-center mt-20">
            <div className="loader"></div>
          </div>
        )}
        {!loading &&
          data &&
          data?.map((item) => <Product key={item.id} item={item}></Product>)}
        <div className={`${(!(data.length > 0) || loading) && "hidden"}`}>
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
  );
};

export default Search;
