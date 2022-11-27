import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

function Header({ hideBtn, setIsOpen, userLoggedIn, setUserLoggedIn }: any) {
  return (
    <div className="px-5 lg:px-20 py-5 w-full flex justify-between items-center sticky top-0 z-50">
      <Link href="/">
        <h2 className="text-2xl lg:text-4xl outline-none text-gray-500">
          book<span className="text-lime-500 font-bold">I</span>nn
        </h2>
      </Link>
      {!hideBtn && !userLoggedIn && (
        <span
          onClick={() => setIsOpen(true)}
          className="px-3 py-2 text-sm lg:px-6 lg:py-3 bg-slate-800 rounded-full tracking-wider hover:text-lime-500 duration-500 ease-in-out hover:bg-slate-900 cursor-pointer"
        >
          Login / Sign in
        </span>
      )}
      {!hideBtn && userLoggedIn && (
        <Menu as="div" className="relative inline-block text-left">
          {({ open }) => (
            <>
              <div>
                <Menu.Button
                  className={`flex w-full border border-white items-center space-x-2 justify-center rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-slate-900 hover:border-lime-500 duration-500 ease-in-out ${
                    open
                      ? "bg-slate-900 text-lime-500 border-lime-500"
                      : "bg-gray-800"
                  }`}
                >
                  <span>Hello, </span>
                  <span className="text-lime-500 truncate">
                    {window.localStorage.getItem("name")}{" "}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-6 h-6 ml-3 ${open && "rotate-180"}`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right  divide-y divide-gray-100 rounded-md bg-slate-800 shadow-lg  text-white focus:outline-none">
                  <div className="">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/user"
                          className={`${
                            active ? "bg-slate-900 text-lime-500" : "text-white"
                          } group bg-slate-800 duration-500 ease-in-out flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 mr-3"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          My profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => {
                            setUserLoggedIn(false);
                            window.localStorage.clear();
                          }}
                          className={`${
                            active ? "bg-slate-900 text-lime-500" : "text-white"
                          } group bg-slate-800 duration-500 ease-in-out flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 mr-3"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                            />
                          </svg>
                          Log out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      )}
    </div>
  );
}

export default Header;
