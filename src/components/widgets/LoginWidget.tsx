import React, { useContext } from "react";
import { AuthModalContext } from "@/context/AuthModalContext";

export default function LoginWidget() {
  const { setIsAuthModalOpen, setIsSignUp } = useContext(AuthModalContext);
  return (
    <div className="w-full max-w-[400px] h-fit -bg-white dark:-bg-grey/50 sticky top-[72px] flex flex-col justify-center items-center rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700">
      <div className="w-full h-full py-8 px-6 flex flex-col gap-4 relative">
        <div>
          <h1 className="text-[24px] -text-smoothBlack dark:text-white font-rubik font-semibold mb-1">
            Welcome To{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br -from-steelBlue -to-deepSkyBlue">
              Nerve!
            </span>
          </h1>
          <p className="text-sm leading-4 text-neutral-500 dark:text-neutral-200 font-light mb-6 border-b border-neutral-600 pb-6">
            Already have an account, sign in below. Otherwise, start by creating
            an account!
          </p>
          <button
            type="button"
            onClick={() => setIsAuthModalOpen(true)}
            className="w-full text-[14px] py-2 -bg-steelBlue hover:-bg-pictonBlue rounded-full mt-2 text-white transition duration-150 ease-in-out"
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setIsAuthModalOpen(true);
              setIsSignUp(true);
            }}
            className="w-full text-[14px] mb-1 py-2 bg-white dark:-bg-grey/50 hover:bg-neutral-200 hover:dark:-bg-darkGrey border border-neutral-600 rounded-full mt-2 -text-smoothBlack dark:text-white transition duration-150 ease-in-out"
          >
            Create a Account
          </button>
        </div>
      </div>
    </div>
  );
}
