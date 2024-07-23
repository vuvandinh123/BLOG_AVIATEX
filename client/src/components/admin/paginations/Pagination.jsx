/* eslint-disable react/prop-types */
import {
  Pagination,
  PaginationGoTo,
  PaginationItem,
  PaginationList,
  PaginationNavigator,
} from "keep-react";
import { CaretLeft, CaretRight, DotsThree } from "phosphor-react";

const PaginationPost = ({
  activePage = 1,
  totalPages = 1,
  totalProduct = 0,
  limit = 10,
  setPagination,
}) => {
  const startPage = Math.max(activePage - 2, 1);
  const endPage = Math.min(activePage + 2, totalPages);
  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // Xác định 3 vị trí cuối cùng
  const lastPages = [];
  for (let i = totalPages - 2; i <= totalPages; i++) {
    if (i > endPage) {
      lastPages.push(i);
    }
  }
  return (
    <div className="mt-10 px-3">
      <Pagination
        className="flex items-center justify-between gap-3"
        shape="circle"
      >
        <div className="flex items-center gap-2">
          <PaginationNavigator
            onClick={() => {
              setPagination((prev) => ({
                ...prev,
                activePage:
                  Number(activePage) > 1 ? Number(activePage) - 1 : totalPages,
              }));
            }}
            className="shrink-0 w-10 h-10"
            shape="circle"
          >
            <CaretLeft size={18} />
          </PaginationNavigator>
          <PaginationList className="gap-3 list-none pl-0">
            {pages.map((item) => (
              <PaginationItem
                key={item}
                onClick={() =>
                  setPagination((prev) => ({ ...prev, activePage: item }))
                }
                className={`shrink-0 w-10 h-10 border ${
                  Number(activePage) === item && "bg-blue-500 text-white"
                }`}
              >
                {item}
              </PaginationItem>
            ))}

            {endPage < totalPages - 2 && (
              <PaginationItem className="shrink-0 w-10 h-10 border">
                <DotsThree size={20} />
              </PaginationItem>
            )}

            {lastPages.map((item) => (
              <PaginationItem
                onClick={() =>
                  setPagination((prev) => ({ ...prev, activePage: item }))
                }
                key={item}
                className="shrink-0 w-10 h-10 border"
              >
                {item}
              </PaginationItem>
            ))}
          </PaginationList>
          <PaginationNavigator
            onClick={() => {
              setPagination((prev) => ({
                ...prev,
                activePage:
                  Number(activePage) < totalPages
                    ? Number(activePage) + 1
                    : totalPages,
              }));
            }}
            className="shrink-0 w-10 h-10"
            shape="circle"
          >
            <CaretRight size={18} />
          </PaginationNavigator>
        </div>

        <PaginationGoTo className="font-normal hidden lg:block text-gray-500">
          <span>
            Trang {activePage} của {totalPages} - Hiển thị{" "}
          </span>
          <input
            type="number"
            min={1}
            onBlur={(e) => {
              if (e.target.value < 1 || e.target.value === "") {
                setPagination((prev) => ({ ...prev, limit: 10 }));
                e.target.value = 10;
                return;
              }
              setPagination((prev) => ({ ...prev, limit: e.target.value }));
            }}
            className="h-9 w-[60px] rounded-md border border-metal-100 text-center text-metal-600 focus:outline-none dark:border-metal-800 dark:text-metal-300"
            defaultValue={limit}
          />
          <span>Của {totalProduct} Bài viết</span>
        </PaginationGoTo>
      </Pagination>
    </div>
  );
};

export default PaginationPost;
