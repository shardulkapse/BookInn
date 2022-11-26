"use client";
import Image from "next/image";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ListingCard from "./ListingCard";

function Listings({ initList }: any) {
  const [data, setData] = useState(initList.data.getList);
  const [currPage, setCurrPage] = useState(1);

  const loadMoreData = async () => {
    const gqlQuery = {
      query: `{
          getList(page: ${
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
    setData([...data, ...resData.data.getList]);
  };

  console.log(data[3]);

  return (
    <div className="px-20">
      <InfiniteScroll
        dataLength={data.length - 4}
        next={loadMoreData}
        hasMore
        loader={
          <h4 className="text-center my-5 text-lime-500 font-bold">
            Loading More...
          </h4>
        }
      >
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-5 gap-y-10">
          {data.map((el: any) => {
            return <ListingCard el={el} key={el._id} />;
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default Listings;
