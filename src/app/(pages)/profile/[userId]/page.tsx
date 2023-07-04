"use client";

import React, { useEffect, useState } from "react";
import { Post } from "@/components/post/Post";
import usePosts from "@/hooks/usePosts";
import { useParams } from "next/navigation";
import { Spinner } from "@/components/spinner/Spinner";
import { PostType } from "@/util/types/PostType";
import useUsers from "@/hooks/useUsers";
import ProfileWidget from "@/components/widgets/ProfileWidget";

export default function Profile() {
  const { userId } = useParams();
  const [posts, setPosts] = useState<PostType[] | null>(null);
  const { data, isLoading } = usePosts(userId);
  const { data: user } = useUsers(userId);

  useEffect(() => {
    setPosts(data);
  }, [data]);

  if (isLoading)
    return (
      <div className="absolute top-1/3 left-1/2 translate-x-[-50%]">
        <Spinner />
      </div>
    );

  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-full max-w-[1000px] flex flex-col-reverse md:flex-row justify-between mt-4 gap-4">
        <div className="w-full">
          {posts && posts.length > 0 ? (
            posts.map((p, i) => {
              return (
                <div key={i} className="mb-4">
                  <Post {...p} />
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center mt-24">
              <p className="text-base text-neutral-500">No Posts To Display.</p>
            </div>
          )}
        </div>
        <div className="w-full flex justify-end max-w-full md:max-w-[360px]">
          {user && <ProfileWidget />}
        </div>
      </div>
    </div>
  );
}
