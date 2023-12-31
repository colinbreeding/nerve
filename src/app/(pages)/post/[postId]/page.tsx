"use client";

import { useParams } from "next/navigation";
import { Spinner } from "@/components/spinner/Spinner";
import React from "react";
import { PostItem } from "@/components/post/PostItem";
import FollowWidget from "@/components/widgets/FollowWidget";
import usePost from "@/hooks/usePost";
import { Comment } from "@/components/comment/Comment";
import { CommentType } from "@/util/types/CommentType";
import useCurrentUser from "@/hooks/useCurrentUser";
import LoginWidget from "@/components/widgets/LoginWidget";

const PostView = () => {
  const { postId } = useParams();
  const { data: post, isLoading } = usePost(postId);
  const { data: currentUser } = useCurrentUser();

  if (isLoading)
    return (
      <div className="absolute top-1/3 left-1/2 translate-x-[-50%]">
        <Spinner />
      </div>
    );

  return (
    <div className="w-full h-full flex justify-center md:px-4 md:pb-4">
      <div className="w-full max-w-[1000px] md:mt-4 flex justify-between gap-4">
        <div className="flex flex-col w-full">
          <div className="w-full space-y-2">
            <PostItem {...post} />
          </div>
          <div>
            {post.comments.map((p: CommentType, i: number) => {
              return <Comment key={i} {...p} />;
            })}
          </div>
        </div>
        <div className="w-full hidden md:flex justify-end max-w-[360px]">
          <div className="w-full flex flex-col gap-4">
            {currentUser ? <FollowWidget /> : <LoginWidget />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostView;
