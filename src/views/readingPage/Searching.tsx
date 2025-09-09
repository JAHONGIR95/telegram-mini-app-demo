import { useState } from "react";

const SearchingView = () => {
  const [search, setSearch] = useState("");

  console.log(search);

  return (
    <>
      <div className="search_wrapper mb-4">
        <img src="icons/search.svg" alt="search" loading="lazy" />
        <input
          type="text"
          placeholder="Слово или страницу"
          className="search_input"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex-1 flex items-center justify-center overflow-y-auto h-screen">
        <p className="text-gray-500 h-full–">No data</p>
      </div>
    </>
  );
};

export default SearchingView;
