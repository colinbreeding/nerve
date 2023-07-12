import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostSchema, PostSchemaType } from "@/util/validation/PostSchema";
import axios from "axios";
import toast from "react-hot-toast";
import useCurrentUser from "@/hooks/useCurrentUser";
import usePosts from "@/hooks/usePosts";
import { Spinner } from "@/components/spinner/Spinner";
import TextareaAutosize from "react-textarea-autosize";

export default function CreateAPostWidget() {
  const { data: currentUser } = useCurrentUser();
  const { mutate } = usePosts();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<PostSchemaType>({
    resolver: zodResolver(PostSchema),
  });
  const postBody = watch("body");

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
    }
  };

  return (
    <div className="w-full max-w-full h-fit -bg-white dark:-bg-grey/50 flex flex-col justify-center items-center rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 mb-4">
      <div className="w-full h-full p-5 flex flex-col gap-4 relative">
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full h-full relative">
              <TextareaAutosize
                minRows={2}
                id="body"
                maxLength={300}
                className={`${
                  postBody?.length === 300
                    ? "border border-red-500 focus:outline-red-500"
                    : "focus:-outline-steelBlue"
                } w-full rounded-md p-2 bg-neutral-200 dark:-bg-darkGrey text-[14px] text-black dark:text-white placeholder-neutral-400 scrollbar-none`}
                placeholder="Whats on your mind?"
                {...register("body")}
              />
              {errors.body && (
                <span className="text-[12px] text-red-500 mt-1">
                  {errors.body.message}
                </span>
              )}
            </div>
            <div className="w-full flex items-center justify-end mt-2 gap-2">
              <p
                className={`w-fit h-fit text-xs bg-transparent ${
                  postBody?.length === 300
                    ? "text-red-500"
                    : "text-neutral-400 dark:text-neutral-500"
                }`}
              >
                {postBody?.length ?? 0}/300
              </p>
              <button
                type="submit"
                disabled={postBody?.length === 0}
                className="w-full sm:w-32 h-[40px] text-[14px] py-2 px-10 -bg-steelBlue border -border-pictonBlue hover:-bg-pictonBlue rounded-md text-white transition duration-150 ease-in-out disabled:hover:-bg-steelBlue disabled:opacity-60 flex justify-center items-center"
              >
                {isLoading ? (
                  <p className="w-full h-full flex justify-center items-center">
                    <Spinner width="w-5" height="h-5" fill="fill-white" />
                  </p>
                ) : (
                  "Post"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
