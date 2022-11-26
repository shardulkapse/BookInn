"use client";
import Image from "next/image";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

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
    const res = await fetch("http://localhost:8080/graphql", {
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

  console.log(data[0]);

  return (
    <div className="px-20">
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore
        loader={<h4></h4>}
      >
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-5 gap-y-6">
          {data.map((el: any) => {
            return (
              <div
                key={el._id}
                className="p-2 max-w-md lg:max-w-4xl text-sm cursor-pointer"
              >
                <img
                  src={el.images}
                  alt=""
                  className="w-full h-80 object-cover rounded-2xl"
                />
                <p className="text-black mt-3">{el?.name}</p>
                <p className="text-black font-bold mt-2">{el?.address}</p>
                <p className="font-bold text-black mt-2">
                  ${Number(el?.price).toFixed(0)}
                  <span className="font-normal text-xs"> night</span>
                </p>
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default Listings;
