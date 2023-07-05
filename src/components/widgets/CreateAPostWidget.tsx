import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostSchema } from "@/util/validation/PostSchema";
import { PostType } from "@/util/types/PostType";
import axios from "axios";
import toast from "react-hot-toast";
import useCurrentUser from "@/hooks/useCurrentUser";
import usePosts from "@/hooks/usePosts";

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
  } = useForm<PostType>({
    resolver: zodResolver(PostSchema),
  });
  const postBody = watch("body");

  const onSubmit = async ({ body }: PostType) => {
    try {
      setIsLoading(true);
      await axios.post("/api/posts", {
        body,
        id: currentUser?.id,
      });
      toast.success("Post Created");
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
    <div className="w-full max-w-full h-fit -bg-white dark:-bg-grey flex flex-col justify-center items-center rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 mb-4">
      <div className="w-full h-full p-5 flex flex-col gap-4 relative">
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full h-full relative">
              <textarea
                rows={4}
                id="body"
                maxLength={300}
                className={`${
                  postBody?.length === 300
                    ? "border border-red-500 focus:outline-red-500"
                    : "focus:-outline-steelBlue"
                } w-full rounded-md p-2 bg-neutral-100 dark:-bg-darkGrey text-[14px] text-black dark:text-white placeholder-neutral-400`}
                placeholder="Whats on your mind?"
                {...register("body")}
              />
              {errors.body && (
                <span className="text-[12px] text-red-500 mt-1">
                  {errors.body.message}
                </span>
              )}
              <p
                className={`w-fit absolute bottom-4 right-4 text-xs bg-neutral-100 dark:-bg-darkGrey ${
                  postBody?.length === 300
                    ? "text-red-500"
                    : "text-neutral-400 dark:text-neutral-500"
                }`}
              >
                {postBody?.length ?? 0}/300
              </p>
            </div>
            <div className="w-full flex justify-end">
              <button
                type="submit"
                disabled={postBody?.length === 0}
                className="w-full sm:w-32 text-[14px] py-2 px-10 -bg-steelBlue border -border-pictonBlue hover:-bg-pictonBlue rounded-md mt-2 text-white transition duration-150 ease-in-out disabled:hover:-bg-steelBlue disabled:opacity-60 flex justify-center items-center"
              >
                {isLoading ? "Posting..." : "Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
