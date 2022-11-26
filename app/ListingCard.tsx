import React from "react";
import { AiFillStar } from "react-icons/ai";

function ListingCard({ el }: any) {
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
      <div className="w-full flex justify-between items-center">
        <p className="font-bold text-black mt-2 tracking-wider">
          ${Number(el?.price).toFixed(0)}
          <span className="font-normal text-xs"> night</span>
        </p>
        <div className="flex justify-center items-center space-x-1 pr-3">
          <AiFillStar className="text-black" />
          <span className="text-black">{el?.ratings / 10 || 9}</span>
        </div>
      </div>
    </div>
  );
}

export default ListingCard;
