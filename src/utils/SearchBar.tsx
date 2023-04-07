import React from "react";

function SearchBar() {
  return (
    <form className="  flex flex-row items-center">
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className=" hidden md:block relative w-auto">
        <input
          type="text"
          id="simple-search"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-4 text-sm text-primary focus:border-primary focus:ring-primary     "
          placeholder="Search"
          required
        />
      </div>
      <button
        type="submit"
        className="ml-2 rounded-lg border border-primary bg-primary p-2.5 text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-4 focus:ring-primary "
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
        <span className="sr-only">Search</span>
      </button>
    </form>
  );
}

export default SearchBar;
