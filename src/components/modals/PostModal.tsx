import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import usePosts from "@/hooks/usePosts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useCurrentUser from "@/hooks/useCurrentUser";
import { PostSchema, PostSchemaType } from "@/util/validation/PostSchema";
import { AiOutlineClose } from "react-icons/ai";
import { Spinner } from "@/components/spinner/Spinner";
import TextareaAutosize from "react-textarea-autosize";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const PostModal: React.FC<Props> = ({ visible, onClose }) => {
  const { data: currentUser } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = usePosts();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<PostSchemaType>({
    resolver: zodResolver(PostSchema),
  });
  const post = watch("body");

  const onSubmit = async ({ body }: PostSchemaType) => {
    try {
      setIsLoading(true);
      await axios.post("/api/posts", {
        body,
        id: currentUser?.id,
      });
    } catch (error) {
      console.log(error);
      toast.error("Post Upload Failed");
    } finally {
      setIsLoading(false);
      await mutate();
      reset();
      onClose();
    }
  };

  return (
    <div
      className={`${
        visible ? "fixed" : "hidden"
      } w-screen h-screen bg-black/50 top-0 left-0 overflow-hidden flex justify-center items-center px-0 sm:px-4 z-50`}
    >
      <div className="w-full sm:max-w-[400px] h-full sm:h-fit -bg-white dark:-bg-smoothBlack flex flex-col justify-center items-center rounded-none sm:rounded-lg shadow-authCard md:border border-neutral-200 dark:border-neutral-700">
        <div className="w-full h-full py-8 px-6 flex flex-col gap-4 relative">
          <div>
            <p
              className="absolute top-6 right-6 text-[14px] text-neutral-500 hover:bg-neutral-200 hover:dark:bg-neutral-700 p-1 rounded-md cursor-pointer transition duration-150 ease-in-out"
              onClick={onClose}
            >
              <AiOutlineClose className="w-5 h-5" />
            </p>
            <h1 className="text-[20px] -text-smoothBlack dark:text-white font-rubik font-semibold mb-2">
              Create a post
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextareaAutosize
                minRows={4}
                id="body"
                maxLength={300}
                className={`${
                  errors.body
                    ? "border border-red-500 focus:outline-red-500"
                    : "focus:-outline-steelBlue"
                } w-full rounded-lg mt-4 p-2 bg-neutral-200 dark:-bg-darkGrey text-[16px] text-white placeholder-neutral-400 scrollbar-none`}
                placeholder="Whats on your mind?"
                {...register("body")}
              />
              <p
                className={`w-full flex justify-end text-xs bg-transparent mt-1 ${
                  post?.length === 300
                    ? "text-red-500"
                    : "text-neutral-400 dark:text-neutral-500"
                }`}
              >
                {post?.length ?? 0}/300
              </p>
              <button
                type="submit"
                disabled={post?.length === 0}
                className="w-full h-[40px] text-[16px] mt-2 py-2 -bg-steelBlue hover:-bg-pictonBlue rounded-full text-white transition duration-150 ease-in-out disabled:hover:-bg-steelBlue disabled:opacity-60"
              >
                {isLoading ? (
                  <p className="w-full h-full flex justify-center items-center">
                    <Spinner width="w-5" height="h-5" fill="fill-white" />
                  </p>
                ) : (
                  "Post"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
