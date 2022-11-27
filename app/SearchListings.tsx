import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ListingCard from "./ListingCard";
import { FaRegSadTear } from "react-icons/fa";

function SearchListings({ initList, query }: any) {
  const [data, setData] = useState(initList);
  const [currPage, setCurrPage] = useState(1);
  const loadMoreData = async () => {
    const gqlQuery = {
      query: `{
          searchList(query:"${query}" page: ${
        currPage + 1
      }) {_id name images address ratings price},
         }`,
    };
    const res = await fetch("https://bookinn-node.onrender.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gqlQuery),
    });
    const resData = await res.json();
    setCurrPage(currPage + 1);
    setData([...data, ...resData.data.searchList]);
  };
  return (
    <div className="px-20">
      {data.length > 0 && (
        <InfiniteScroll
          dataLength={data.length - 4}
          next={loadMoreData}
          hasMore
          loader={<div className="w-full mt-8 mb-4 flex justify-center"></div>}
        >
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-5 gap-y-10">
            {data.map((el: any) => {
              return <ListingCard el={el} key={el._id} />;
            })}
          </div>
        </InfiniteScroll>
      )}
      {data.length === 0 && (
        <div className="w-full mt-40 text-center">
          <h1 className="text-black font-bold tracking-wider text-2xl">
            No results found
          </h1>
        </div>
      )}
    </div>
  );
}

export default SearchListings;
