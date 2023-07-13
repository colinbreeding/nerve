"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { formatDistanceToNowStrict } from "date-fns";
import Link from "next/link";
import useUsers from "@/hooks/useUsers";
import { CommentType } from "@/util/types/CommentType";

export const Comment: React.FC<CommentType> = (comment) => {
  const { data: user } = useUsers(comment.userId);
  const createdAt = useMemo(() => {
    if (!comment.createdAt) return null;
    return formatDistanceToNowStrict(new Date(comment.createdAt));
  }, [comment.createdAt]);
  return (
    <div className="w-full h-fit my-4 p-4 bg-white dark:-bg-grey/50 rounded-lg border border-neutral-200 dark:-border-darkGrey shadow-lg cursor-pointer">
      <div className="flex items-center gap-2">
        <Link
          href={`/profile/${comment.userId}`}
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            alt="avatar"
            src={(user && user.image) ?? "/images/avatar_default.png"}
            height={30}
            width={30}
            className="rounded-full cursor-pointer"
          />
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
          <div>
            <Link
              href={`/profile/${comment.userId}`}
              onClick={(e) => e.stopPropagation()}
              className="-text-smoothBlack dark:text-white text-[14px] font-medium hover:underline"
            >
              {user && user.name}
            </Link>
          </div>
          <div className="flex gap-2 items-center">
            {user && user.username && (
              <p className="text-[12px] text-neutral-400">
                @{user && user.username}
              </p>
            )}
            <p className="text-[10px] text-neutral-400">{createdAt} ago</p>
          </div>
        </div>
      </div>
      <div className="w-full pl-[38px] text-[14px] mt-2 sm:mt-0">
        <p className="-text-smoothBlack dark:text-white">{comment.body}</p>
      </div>
    </div>
  );
};
