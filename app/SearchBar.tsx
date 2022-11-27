import { useEffect, useState } from "react";
import { RiSearch2Fill } from "react-icons/ri";

function SearchBar({ handleSearch, handleNullQuery }: any) {
  const [query, setQuery] = useState<any>();
  useEffect(() => {
    if (!query) {
      handleNullQuery();
    }
  }, [query]);
  return (
    <div className="w-full flex justify-center mt-5 mb-10">
      <div className="h-12 rounded-full w-1/2 flex justify-center items-center shadow-card">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-full pl-4 flex-1 rounded-l-full bg-slate-800 outline-none text-white focus:bg-slate-900 hover:bg-slate-900 duration-500 ease-in-out"
          placeholder="Search by name or location"
        />
        <button
          type="button"
          disabled={!query}
          onClick={() => {
            handleSearch(query);
          }}
          className="px-5 w-20 h-full rounded-r-full bg-lime-500 hover:bg-lime-400 duration-500 ease-in-out outline-none disabled:cursor-not-allowed disabled:bg-lime-500"
        >
          <RiSearch2Fill className="text-white mx-auto" />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
