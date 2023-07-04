"use client";

import { Post } from "@/components/post/Post";
import usePosts from "@/hooks/usePosts";
import { useEffect, useState } from "react";
import { PostType } from "@/util/types/PostType";
import { Spinner } from "@/components/spinner/Spinner";

export default function Home() {
  const [posts, setPosts] = useState<PostType[] | null>(null);
  const { data, isLoading } = usePosts();

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
    <div className="w-full h-full flex justify-center px-4 pb-4">
      <div className="w-full max-w-[1000px] mt-4 flex justify-between gap-4">
        <div className="w-full space-y-2">
          {posts && posts.length > 0 ? (
            posts.map((p, i) => {
              return (
                <div key={i} className="mb-4">
                  <Post {...p} />
                </div>
              );
            })
          ) : (
            <div className="flex justify-center">
              <p className="text-md text-neutral-500 mt-24">
                No posts to display.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
