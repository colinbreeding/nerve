"use client";

import React, { useEffect, useRef, useState } from "react";
import { Post } from "@/components/post/Post";
import usePosts from "@/hooks/usePosts";
import { useParams } from "next/navigation";
import { Spinner } from "@/components/spinner/Spinner";
import useUsers from "@/hooks/useUsers";
import ProfileWidget from "@/components/widgets/ProfileWidget";
import { useIntersection } from "@mantine/hooks";

export default function Profile() {
  const { userId } = useParams();
  const { posts, isLoading, size, setSize } = usePosts(userId);
  const { data: user } = useUsers(userId);
  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  useEffect(() => {
    if (entry?.isIntersecting) {
      setIsLoadingMore(true);
      setSize(size + 1).then(() => setIsLoadingMore(false)); // Load more posts when the last post comes into view
    }
  }, [entry]);

  if (isLoading)
    return (
      <div className="absolute top-1/3 left-1/2 translate-x-[-50%]">
        <Spinner />
      </div>
    );

  return (
    <div className="w-full flex justify-center md:px-4">
      <div className="w-full max-w-[1000px] flex flex-col-reverse md:flex-row justify-between md:mt-4 gap-1 md:gap-4">
        <div className="w-full">
          {posts && posts.length > 0 ? (
            posts.map((p, i) => {
              if (i === posts.length - 1) {
                return (
                  <div ref={ref} key={i} className="mb-1 md:mb-4">
                    <Post {...p} />
                  </div>
                );
              } else {
                return (
                  <div key={i} className="mb-1 md:mb-4">
                    <Post {...p} />
                  </div>
                );
              }
            })
          ) : (
            <div className="flex flex-col items-center mt-24">
              <p className="text-base text-neutral-500">No Posts To Display.</p>
            </div>
          )}
          {isLoadingMore && (
            <div className="w-full h-10 flex justify-center items-center">
              <Spinner />
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
