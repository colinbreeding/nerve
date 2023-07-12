"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare } from "react-icons/fi";
import { formatDistanceToNowStrict } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PostType } from "@/util/types/PostType";
import useLike from "@/hooks/useLike";

export const Post: React.FC<PostType> = (post) => {
  const router = useRouter();
  const createdAt = useMemo(() => {
    if (!post.createdAt) return null;
    return formatDistanceToNowStrict(new Date(post.createdAt));
  }, [post.createdAt]);
  const { data: likes, hasLiked, toggleLike } = useLike(post.id);

  return (
    <div
      onClick={() => router.push(`/post/${post.id}`)}
      className="w-full h-fit p-4 bg-white dark:-bg-grey/50 rounded-lg border border-neutral-200 dark:-border-darkGrey shadow-lg cursor-pointer"
    >
      <div className="flex items-center gap-2">
        <Link
          href={`/profile/${post.userId}`}
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            alt="avatar"
            src={post.user.image ?? "/images/avatar_default.png"}
            height={30}
            width={30}
            className="rounded-full cursor-pointer max-w-[30px] max-h-[30px]"
          />
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
          <div>
            <Link
              href={`/profile/${post.userId}`}
              onClick={(e) => e.stopPropagation()}
              className="-text-smoothBlack dark:text-white text-[14px] font-medium hover:underline"
            >
              {post.user.name}
            </Link>
          </div>
          <div className="flex gap-2 items-center">
            {post.user.username && (
              <p className="text-[12px] text-neutral-400">
                @{post.user.username}
              </p>
            )}
            <p className="text-[10px] text-neutral-400">{createdAt} ago</p>
          </div>
        </div>
      </div>
      <div className="w-full pl-[38px] text-[14px] mt-2 sm:mt-0">
        <p className="-text-smoothBlack dark:text-white">{post.body}</p>
      </div>
      <div className="flex items-center gap-1 pl-[34px] mt-2">
        <div
          onClick={async (e) => {
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
        <div className="flex items-center gap-1 text-neutral-400 hover:text-neutral-200 p-1 rounded-sm cursor-pointer">
          <FiMessageSquare className="w-5 h-5 cursor-pointer transition duration-150 ease-in-out" />
          <p className="text-[12px]">
            {post && post.comments ? post.comments.length : 0}
          </p>
        </div>
      </div>
    </div>
  );
};
