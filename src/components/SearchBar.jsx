import React from 'react'

function SearchBar() {
  return (
    <div className="bg-[#ffffff] pl-2 flex items-center justify-center rounded-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>

      <input
        type="text"
        className="py-2 pl-2 ml-2 w-[100%] outline-none text-xs rounded-r-md"
        placeholder="Search Note"
      />
    </div>
  );
}

export default SearchBar