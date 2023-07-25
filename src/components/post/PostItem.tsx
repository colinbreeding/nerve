"use client";

import React, { useContext, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CommentSchema,
  CommentSchemaType,
} from "@/util/validation/CommentSchema";
import { PostType } from "@/util/types/PostType";
import Link from "next/link";
import Image from "next/image";
import useLike from "@/hooks/useLike";
import axios from "axios";
import toast from "react-hot-toast";
import useCurrentUser from "@/hooks/useCurrentUser";
import usePost from "@/hooks/usePost";
import { AuthModalContext } from "@/context/AuthModalContext";
import { Spinner } from "@/components/spinner/Spinner";
import TextareaAutosize from "react-textarea-autosize";

export const PostItem: React.FC<PostType> = (post) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CommentSchemaType>({
    resolver: zodResolver(CommentSchema),
  });
  const comment = watch("body");
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutatePost } = usePost(post.id);
  const { setIsAuthModalOpen } = useContext(AuthModalContext);
  const { data: likes, hasLiked, toggleLike } = useLike(post.id);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async ({ body }: CommentSchemaType) => {
    if (!currentUser) return setIsAuthModalOpen(true);
    try {
      setIsLoading(true);
      await axios.post("/api/comment", {
        commentBody: body,
        userId: currentUser?.id,
        postId: post.id,
      });
    } catch (error) {
      console.log(error);
      toast.error("Comment Upload Failed");
    } finally {
      setIsLoading(false);
      await mutatePost();
      await mutateCurrentUser();
      reset();
    }
  };

  if (!post || !post.comments) return null;
  return (
    <div className="w-full h-fit p-4 bg-white dark:-bg-grey/50 md:rounded-lg md:border border-neutral-200 dark:-border-darkGrey shadow-lg">
      <div>
        <div className="flex items-center gap-2">
          <Link href={`/profile/${post.userId}`}>
            <Image
              alt="avatar"
              src={post.user.image ?? "/images/avatar_default.png"}
              height={30}
              width={30}
              className="rounded-full cursor-pointer max-w-[30px] max-h-[30px]"
            />
          </Link>
          <Link
            href={`/profile/${post.userId}`}
            className="-text-smoothBlack dark:text-white text-[14px] font-medium hover:underline"
          >
            {post.user.name}
          </Link>
          {post.user.username && (
            <p className="text-[12px] text-neutral-400">
              @{post.user.username}
            </p>
          )}
          <p className="text-[12px] text-neutral-400"></p>
        </div>
        <div className="w-full pl-[38px] text-[14px]">
          <p className="-text-smoothBlack dark:text-white">{post.body}</p>
        </div>
        <div className="flex items-center gap-1 pl-[34px] mt-2">
          <div
            onClick={(e) => {
              e.stopPropagation();
              void toggleLike();
            }}
            className={`${
              hasLiked ? "text-red-500" : "text-neutral-400 hover:text-red-500"
            } flex items-center gap-1 p-1 rounded-sm cursor-pointer`}
          >
            {hasLiked ? (
              <AiFillHeart className="w-5 h-5 cursor-pointer transition duration-150 ease-in-out" />
            ) : (
              <AiOutlineHeart className="w-5 h-5 cursor-pointer transition duration-150 ease-in-out" />
            )}
            <p className="text-[12px]">{likes ? likes.length : 0}</p>
          </div>
          <div className="flex items-center gap-1 text-neutral-400 p-1 rounded-sm">
            <FiMessageSquare className="w-5 h-5 cursor-pointer transition duration-150 ease-in-out" />
            <p className="text-[12px]">
              {post && post.comments ? post.comments.length : 0}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full h-full relative">
            <TextareaAutosize
              minRows={2}
              id="body"
              maxLength={300}
              className={`${
                comment?.length === 300
                  ? "border border-red-500 focus:outline-red-500"
                  : "focus:-outline-steelBlue"
              } w-full rounded-lg py-2 px-4 bg-neutral-200 dark:-bg-darkGrey text-[16px] text-black dark:text-white placeholder-neutral-400 scrollbar-none`}
              placeholder="Write a comment"
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
              className={`w-fit text-xs bg-transparent ${
                comment?.length === 300
                  ? "text-red-500"
                  : "text-neutral-400 dark:text-neutral-500"
              }`}
            >
              {comment?.length ?? 0}/300
            </p>
            <button
              type="submit"
              disabled={comment?.length === 0}
              className="w-full max-w-[112px] sm:w-28 h-[40px] text-[14px] py-2 px-10 -bg-steelBlue border -border-pictonBlue hover:-bg-pictonBlue rounded-full text-white transition duration-150 ease-in-out disabled:hover:-bg-steelBlue disabled:opacity-60 flex justify-center items-center"
            >
              {isLoading ? (
                <p className="w-full h-full flex justify-center items-center">
                  <Spinner width="w-5" height="h-5" fill="fill-white" />
                </p>
              ) : (
                "Comment"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
