"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { IconContext } from "react-icons";
import { AiFillAliwangwang } from "react-icons/ai";
import { BiSun, BiMoon } from "react-icons/bi";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { Theme, ThemeContext } from "@/context/ThemeContext";
import { AuthModalContext } from "@/context/AuthModalContext";
import { signOut } from "next-auth/react";
import { TfiAngleDown } from "react-icons/tfi";
import { IoLogOutOutline } from "react-icons/io5";
import Image from "next/image";
import { SafeUser } from "@/util/types/SafeUser";

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

interface HeaderProps {
  currentUser?: SafeUser | null;
}

const Header: React.FC<HeaderProps> = ({ currentUser }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [currTheme, setCurrTheme] = useState<ThemeOptions | null>(null);
  const [isThemeSelected, setIsThemeSelected] = useState<boolean>(false);
  const { setIsAuthModalOpen } = useContext(AuthModalContext);
  const [isProfileSelected, setIsProfileSelected] = useState(false);

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
    <div className="sticky top-0 w-full h-14 -bg-white/50 dark:-bg-grey/50 backdrop-blur-[8px] flex justify-center px-4 z-40 border-b-[1px] border-neutral-200 dark:-border-darkGrey shadow-lg">
      <div className="w-full h-full max-w-[1000px] flex justify-between items-center">
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
              <h1 className="text-[20px] font-rubik font-medium -text-smoothBlack dark:-text-white">
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
            <div className="absolute top-10 right-[64px] flex flex-col w-[150px] h-fit -bg-white dark:-bg-smoothBlack border -border-lightGrey/20 dark:-border-darkGrey rounded-md py-1 drop-shadow-md">
              {themeOptions?.map((o, i) => {
                return (
                  <div
                    key={i}
                    className="w-full h-fit flex items-center gap-2 px-2 py-1 cursor-pointer hover:-bg-darkGrey/5 hover:dark:-bg-darkGrey/10 "
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
          {currentUser ? (
            <div>
              <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={() => {
                  setIsProfileSelected(!isProfileSelected);
                  setIsThemeSelected(false);
                }}
              >
                <Image
                  alt="avatar"
                  src={currentUser.image ?? `/images/avatar_default.png`}
                  width={30}
                  height={30}
                  quality={100}
                  className="rounded-full cursor-pointer"
                  priority
                />
                <TfiAngleDown
                  className={`${
                    isProfileSelected ? "rotate-180" : ""
                  } w-3 h-3 -text-darkGrey dark:text-neutral-600 transition duration-100 ease-in-out`}
                />
              </div>
              {isProfileSelected && (
                <div className="absolute top-10 -left-[68px] flex flex-col w-[150px] h-fit -bg-white dark:-bg-smoothBlack border -border-lightGrey/20 dark:-border-darkGrey rounded-md py-1 drop-shadow-md">
                  <div
                    className="w-full h-fit flex items-center gap-2 px-2 py-1 cursor-pointer hover:-bg-darkGrey/5 hover:dark:-bg-darkGrey/10 -text-darkGrey hover:-text-deepRed"
                    onClick={() => {
                      setIsProfileSelected(false);
                      void signOut();
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
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsAuthModalOpen(true);
                }}
                className="text-[14px] font-medium text-white -bg-steelBlue hover:-bg-pictonBlue border -border-pictonBlue py-2 px-4 rounded-md transition duration-150 ease-in-out"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
