import React, { useContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import NerveLogo from "../../../public/images/nervy-192x192.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema, SignInSchemaType } from "@/util/validation/AuthSchema";
import { AuthModalContext } from "@/context/AuthModalContext";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function SignInModal({ visible, onClose }: Props) {
  const router = useRouter();
  const { setIsSignUp, setIsAuthModalOpen } = useContext(AuthModalContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = (data: SignInSchemaType) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        setIsAuthModalOpen(false);
        toast.success("Signed In");
        router.push("/");
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

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
            <Image
              src={NerveLogo}
              alt="nerve-logo"
              priority
              width={40}
              height={40}
            />
            <p className="-text-smoothBlack dark:text-neutral-200 font-semibold text-[20px] mt-2">
              Sign In
            </p>
            <p className="text-neutral-500 dark:text-neutral-400 text-[14px]">
              Choose your preferred sign up method below
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => signIn("google")}
              className="flex items-center justify-center gap-1 w-full h-10 font-medium rounded-md bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 hover:dark:bg-neutral-600 -text-smoothBlack dark:text-white text-[14px] transition duration-150 ease-in-out"
            >
              <FcGoogle className="w-5 h-5 mb-[1px] mr-[3px]" />
              Sign In With Google
            </button>
          </div>
          <div className="relative flex items-center justify-center my-2">
            <p className="text-[12px] text-neutral-500 dark:text-neutral-400 bg-white dark:-bg-smoothBlack absolute p-1">
              Or Continue With
            </p>
            <div className="w-full h-[1px] bg-neutral-500 dark:bg-neutral-400" />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col">
              <input
                type="email"
                placeholder="Email"
                className="rounded-md h-10 p-2 -text-smoothBlack dark:text-white bg-neutral-300 dark:bg-neutral-700 border-none focus:-outline-steelBlue text-[14px]"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-[12px] text-red-500 mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <input
                type="password"
                placeholder="Password"
                className="rounded-md h-10 p-2 -text-smoothBlack dark:text-white bg-neutral-300 dark:bg-neutral-700 border-none focus:-outline-steelBlue text-[14px]"
                {...register("password")}
              />
              {errors.password && (
                <span className="text-[12px] text-red-500 mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="h-10 rounded-md -bg-steelBlue hover:-bg-pictonBlue text-white text-[14px] transition duration-150 ease-in-out"
            >
              {isLoading ? "Signing In" : "Sign In"}
            </button>
            <p className="text-[12px] text-neutral-500 dark:text-neutral-400 mt-4">
              Don&apos;t have an account?{" "}
              <span
                onClick={() => setIsSignUp(true)}
                className="font-semibold hover:underline cursor-pointer -text-smoothBlack dark:text-white"
              >
                Sign Up
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
