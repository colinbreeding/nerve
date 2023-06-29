import React from "react";
import { AiOutlineClose } from "react-icons/ai";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function AuthModal({ visible, onClose }: Props) {
  return (
    <div
      className={`${
        visible ? "fixed" : "hidden"
      } w-screen h-screen bg-black/50 top-0 left-0 overflow-hidden flex justify-center items-center px-4 z-50`}
    >
      <div className="w-full max-w-[400px] h-fit -bg-white dark:-bg-smoothBlack flex flex-col justify-center items-center rounded-lg shadow-authCard border border-neutral-200 dark:border-neutral-700">
        <div className="w-full h-full p-8 flex flex-col gap-4 relative">
          <p
            className="absolute top-6 right-6 text-[14px] text-neutral-500 hover:bg-neutral-200 hover:dark:bg-neutral-700 p-1 rounded-md cursor-pointer transition duration-150 ease-in-out"
            onClick={onClose}
          >
            <AiOutlineClose className="w-5 h-5" />
          </p>
          <div className="mt-8">
            <h1 className="text-[28px] -text-smoothBlack dark:-text-white font-rubik font-semibold leading-8">
              Welcome To{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-br -from-steelBlue -to-deepSkyBlue">
                Nerve!
              </span>
            </h1>
            <p className="text-neutral-500 text-sm mt-2">
              Choose from your preferred sign in provider
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
