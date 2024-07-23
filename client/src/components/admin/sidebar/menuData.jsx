export const menuData = [
  {
    id: 1,
    name: "Thông tin",
    path: "/admin",
    icon: (
      <svg className="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
        <path
          d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z"
          className="fill-current text-cyan-400 dark:fill-slate-600"
        />
        <path
          d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"
          className="fill-current text-cyan-200 group-hover:text-cyan-300"
        />
        <path
          d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z"
          className="fill-current group-hover:text-sky-300"
        />
      </svg>
    ),
  },
  {
    id: 2,
    name: "Bài viết",
    path: "/admin/bai-viet",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          className="fill-current text-gray-300 group-hover:text-cyan-300"
          fillRule="evenodd"
          d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
          clipRule="evenodd"
        />
        <path
          className="fill-current text-gray-600 group-hover:text-cyan-600"
          d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
        />
      </svg>
    ),
  },
  {
    id: 3,
    name: "Tuyển dụng",
    path: "/admin/tuyen-dung",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          className="fill-current text-gray-600 group-hover:text-cyan-600"
          fillRule="evenodd"
          d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
          clipRule="evenodd"
        />
        <path
          className="fill-current text-gray-300 group-hover:text-cyan-300"
          d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"
        />
      </svg>
    ),
  },
  {
    id: 6,
    name: "Hoạt động",
    path: "/admin/hoat-dong",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          className="fill-current text-gray-600 group-hover:text-cyan-600"
          fillRule="evenodd"
          d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
          clipRule="evenodd"
        />
        <path
          className="fill-current text-gray-300 group-hover:text-cyan-300"
          d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"
        />
      </svg>
    ),
  },
  {
    id: 4,
    name: "Hỗ trợ",
    path: "/admin/ho-tro",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          className="fill-current text-gray-300 group-hover:text-cyan-300"
          fillRule="evenodd"
          d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
          clipRule="evenodd"
        />
        <path
          className="fill-current text-gray-600 group-hover:text-cyan-600"
          d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
        />
      </svg>
    ),
  },
  {
    id: 5,
    name: "Cài đặt",
    path: "/admin/cai-dat",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          className="fill-current text-gray-300 group-hover:text-cyan-300"
          d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"
        />
        <path
          className="fill-current text-gray-600 group-hover:text-cyan-600"
          fillRule="evenodd"
          d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];
