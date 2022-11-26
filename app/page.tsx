"use client";
import Header from "./Header";
import { Slide, Fade } from "react-awesome-reveal";
import { useEffect, useState } from "react";
import AuthModal from "./AuthModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Listings from "./Listings";

function page() {
  const [isOpen, setIsOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [listData, setListData] = useState();
  const [navColor, setnavColor] = useState(false);

  useEffect(() => {
    const id = window.localStorage.getItem("_id");
    if (id) {
      setUserLoggedIn(true);
    }
  }, [isOpen]);

  const notify = (text: string, code: number) => {
    if (code === 1) {
      toast.success(text);
    } else {
      toast.error(text);
    }
  };

  useEffect(() => {
    (async () => {
      const gqlQuery = {
        query: `{
          getList(page: ${1}) {_id name images address ratings price},
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
      setListData(resData);
    })();
  }, []);

  const listenScrollEvent = () => {
    window.scrollY > 50 ? setnavColor(true) : setnavColor(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-slate-200 text-white font-comforta relative">
      <div
        className={`sticky top-0 z-50 duration-500 ease-in-out ${
          navColor ? "bg-black py-0 shadow-card" : "bg-transparent py-5"
        }`}
      >
        {listData && (
          <Slide direction="down">
            <Header
              setIsOpen={setIsOpen}
              userLoggedIn={userLoggedIn}
              setUserLoggedIn={setUserLoggedIn}
            />
          </Slide>
        )}
      </div>
      <AuthModal isOpen={isOpen} setIsOpen={setIsOpen} notify={notify} />
      {listData && (
        <Fade>
          <Listings initList={listData} />
        </Fade>
      )}
      {!listData && (
        <div className="w-full h-screen flex justify-center items-center">
          <div className="ldsripple">
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-center"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        closeOnClick={false}
        theme="dark"
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
    </div>
  );
}

export default page;
