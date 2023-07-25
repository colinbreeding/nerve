"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { IconContext } from "react-icons";
import { AiFillAliwangwang, AiOutlineUser } from "react-icons/ai";
import { BiSun, BiMoon } from "react-icons/bi";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { Theme, ThemeContext } from "@/context/ThemeContext";
import { AuthModalContext } from "@/context/AuthModalContext";
import { signOut } from "next-auth/react";
import { TfiAngleDown } from "react-icons/tfi";
import { IoLogOutOutline } from "react-icons/io5";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useCurrentUser from "@/hooks/useCurrentUser";
import { FiBell, FiEdit } from "react-icons/fi";
import { PostModalContext } from "@/context/PostModalContext";
import NotificationFeed from "@/components/notification/NotificationFeed";

type ThemeOptions = {
  icon: React.JSX.Element;
  text: Theme;
};

const themeOptions: ThemeOptions[] = [
  {
    icon: <BiSun />,
    text: "Light",
  },
  {
    icon: <BiMoon />,
    text: "Dark",
  },
  {
    icon: <HiOutlineComputerDesktop />,
    text: "System",
  },
];

const Header: React.FC = () => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const { theme, setTheme } = useContext(ThemeContext);
  const { setIsPostModalOpen } = useContext(PostModalContext);
  const [currTheme, setCurrTheme] = useState<ThemeOptions | null>(null);
  const [isThemeSelected, setIsThemeSelected] = useState<boolean>(false);
  const { setIsAuthModalOpen } = useContext(AuthModalContext);
  const [isProfileSelected, setIsProfileSelected] = useState<boolean>(false);
  const [isNotificationSelected, setIsNotificationSelected] =
    useState<boolean>(false);

  useEffect(() => {
    switch (theme) {
      case "Light":
        setCurrTheme({
          icon: <BiSun />,
          text: "Light",
        });
        break;
      case "Dark":
        setCurrTheme({
          icon: <BiMoon />,
          text: "Dark",
        });
        break;
      default:
        setCurrTheme({
          icon: <HiOutlineComputerDesktop />,
          text: "System",
        });
        break;
    }
  }, [theme]);

  return (
    <div
      className={`${
        isNotificationSelected ? "px-0" : "px-4"
      } sticky top-0 w-full h-14 -bg-white/50 dark:-bg-grey/50 backdrop-blur-[8px] flex justify-center select-none z-40 border-b-[1px] border-neutral-200 dark:-border-darkGrey shadow-lg`}
    >
      <div className="w-full h-full max-w-[1000px] flex justify-between items-center relative">
        <div>
          <Link href="/">
            <div className="flex items-center gap-1 group">
              <IconContext.Provider
                value={{
                  className:
                    "-text-steelBlue w-7 h-7 group-hover:rotate-[-20deg] transition duration-300 ease-in-out mb-[1px]",
                }}
              >
                <AiFillAliwangwang />
              </IconContext.Provider>
              <h1 className="hidden sm:block text-[20px] font-rubik font-medium -text-smoothBlack dark:-text-white">
                Nerve
              </h1>
            </div>
          </Link>
        </div>
        <div className="relative flex items-center gap-3">
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => {
                setIsThemeSelected(!isThemeSelected);
                setIsProfileSelected(false);
                setIsNotificationSelected(false);
              }}
            >
              <IconContext.Provider
                value={{
                  className: `${
                    theme === currTheme?.text
                      ? "-text-steelBlue"
                      : "-text-darkGrey"
                  } hover:-text-lapisLazuliBlue w-5 h-5 transition duration-150 ease-in-out`,
                }}
              >
                {currTheme?.icon}
              </IconContext.Provider>
            </button>
          </div>
          {isThemeSelected && (
            <div
              className={`${
                currentUser ? "right-[124px]" : "right-[90px]"
              } absolute top-10 px-1 flex flex-col w-[150px] h-fit -bg-white dark:-bg-smoothBlack border -border-lightGrey/20 dark:-border-darkGrey rounded-md py-1 drop-shadow-md`}
            >
              {themeOptions?.map((o, i) => {
                return (
                  <div
                    key={i}
                    className="w-full h-fit flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-neutral-200 hover:dark:bg-neutral-800 rounded-md"
                    onClick={() => {
                      setTheme(o.text);
                      setIsThemeSelected(false);
                    }}
                  >
                    <button type="button">
                      <IconContext.Provider
                        value={{
                          className: `${
                            theme === o.text
                              ? "-text-steelBlue"
                              : "-text-darkGrey"
                          } hover:-text-lapisLazuliBlue w-5 h-5 transition duration-150 ease-in-out`,
                        }}
                      >
                        {o.icon}
                      </IconContext.Provider>
                    </button>
                    <p
                      className={`text-[16px] ${
                        theme === o.text ? "-text-steelBlue" : "-text-darkGrey"
                      }`}
                    >
                      {o.text}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
          {currentUser && (
            <div className="flex items-center gap-3">
              <div
                onClick={() => {
                  setIsNotificationSelected(!isNotificationSelected);
                  setIsThemeSelected(false);
                  setIsProfileSelected(false);
                }}
                className="relative"
              >
                {currentUser.hasNotification && (
                  <div className="-bg-pictonBlue w-2 h-2 rounded-full absolute left-[10px] shadow-sm -shadow-steelBlue" />
                )}
                <FiBell className="w-5 h-5 mb-[2px] -text-steelBlue hover:-text-lapisLazuliBlue transition duration-150 ease-in-out cursor-pointer" />
              </div>
              <FiEdit
                onClick={() => {
                  setIsPostModalOpen(true);
                  setIsNotificationSelected(false);
                  setIsProfileSelected(false);
                  setIsThemeSelected(false);
                }}
                className="w-5 h-5 mb-[2px] -text-steelBlue hover:-text-lapisLazuliBlue transition duration-150 ease-in-out cursor-pointer"
              />
            </div>
          )}
          {currentUser ? (
            <div>
              <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={() => {
                  setIsProfileSelected(!isProfileSelected);
                  setIsThemeSelected(false);
                  setIsNotificationSelected(false);
                }}
              >
                <Image
                  alt="avatar"
                  src={currentUser.image ?? `/images/avatar_default.png`}
                  width={30}
                  height={30}
                  quality={100}
                  className="rounded-full cursor-pointer max-w-[30px] max-h-[30px]"
                  priority
                />
                <TfiAngleDown
                  className={`${
                    isProfileSelected ? "rotate-180" : ""
                  } w-3 h-3 -text-darkGrey dark:text-neutral-600 transition duration-100 ease-in-out`}
                />
              </div>
              {isProfileSelected && (
                <div className="absolute top-10 -left-[74px] flex flex-col w-[220px] h-[158px] min-h-[158px] -bg-white dark:-bg-smoothBlack border -border-lightGrey/20 dark:-border-darkGrey rounded-md drop-shadow-md select-none overflow-ellipsis">
                  <div className="w-full h-full py-2 px-4">
                    <p className="text-neutral-800 dark:text-neutral-200">
                      {currentUser.name}
                    </p>
                    <p className="text-neutral-500 dark:text-neutral-400 text-[12px] overflow-ellipsis">
                      {currentUser.email}
                    </p>
                  </div>
                  <div className="h-[1px] bg-neutral-200 dark:bg-neutral-700" />
                  <div className="p-1">
                    <div
                      className="w-full h-fit flex items-center gap-2 p-2 cursor-pointer hover:bg-neutral-200 hover:dark:bg-neutral-800 -text-darkGrey hover:dark:text-neutral-200 rounded-md"
                      onClick={() => {
                        router.push(`/profile/${currentUser.id}`);
                        setIsProfileSelected(false);
                      }}
                    >
                      <button type="button">
                        <IconContext.Provider
                          value={{
                            className:
                              "w-5 h-5 transition duration-150 ease-in-out",
                          }}
                        >
                          <AiOutlineUser />
                        </IconContext.Provider>
                      </button>
                      <p className="text-[16px]">Profile</p>
                    </div>
                  </div>
                  <div className="h-[1px] bg-neutral-200 dark:bg-neutral-700" />
                  <div className="p-1">
                    <div
                      className="w-full h-fit flex items-center gap-2 p-2 cursor-pointer hover:bg-neutral-200 hover:dark:bg-neutral-800 -text-darkGrey hover:text-red-500 rounded-md"
                      onClick={() => {
                        setIsProfileSelected(false);
                        setIsThemeSelected(false);
                        setIsNotificationSelected(false);
                        void signOut();
                        router.push("/");
                      }}
                    >
                      <button type="button">
                        <IconContext.Provider
                          value={{
                            className:
                              "w-5 h-5 transition duration-150 ease-in-out",
                          }}
                        >
                          <IoLogOutOutline />
                        </IconContext.Provider>
                      </button>
                      <p className="text-[16px]">Sign Out</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsAuthModalOpen(true);
                }}
                className="text-[14px] font-medium text-white -bg-steelBlue hover:-bg-pictonBlue border -border-pictonBlue py-2 px-4 rounded-full transition duration-150 ease-in-out"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
        {isNotificationSelected && (
          <div className="absolute top-0 sm:top-12 right-0 sm:right-[90px] w-full sm:w-[350px] h-screen sm:h-[470px] flex flex-col select-none -bg-white dark:bg-neutral-900 md:border -border-lightGrey/20 dark:-border-darkGrey rounded-none sm:rounded-md drop-shadow-md ">
            <NotificationFeed
              userId={currentUser?.id}
              setIsNotificationSelected={() => setIsNotificationSelected(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
