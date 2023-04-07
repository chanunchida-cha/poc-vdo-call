import React from "react";

type Props = {};

const SearchBarMobile = (props: Props) => {
  return (
    <div className=" px-4 md:hidden  ">
      <form>
        <label
          htmlFor="default-search"
          className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          
          <input
            type="search"
            id="default-search"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-4 text-sm text-gray-900 focus:border-gray-200 focus:ring-gray-500 "
            placeholder="Search...."
            required
          />
          <button
            type="submit"
            className="absolute right-2.5 bottom-2.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 "
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBarMobile;
