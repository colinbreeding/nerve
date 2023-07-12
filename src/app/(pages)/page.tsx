"use client";

import { Post } from "@/components/post/Post";
import usePosts from "@/hooks/usePosts";
import { useEffect, useRef, useState } from "react";
import { Spinner } from "@/components/spinner/Spinner";
import useCurrentUser from "@/hooks/useCurrentUser";
import LoginWidget from "@/components/widgets/LoginWidget";
import FollowWidget from "@/components/widgets/FollowWidget";
import CreateAPostWidget from "@/components/widgets/CreateAPostWidget";
import { useIntersection } from "@mantine/hooks";

export default function Home() {
  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });
  const { data: currentUser } = useCurrentUser();
  const { posts, isLoading, size, setSize } = usePosts();
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
    <div className="w-full h-full flex justify-center px-4 pb-4">
      <div className="w-full max-w-[1000px] mt-4 flex justify-between gap-4">
        <div className="w-full">
          {currentUser && <CreateAPostWidget />}
          {posts && posts.length > 0 ? (
            posts.map((p, i) => {
              if (i === posts.length - 1) {
                return (
                  <div ref={ref} key={i} className="mb-4">
                    <Post {...p} />
                  </div>
                );
              } else {
                return (
                  <div key={i} className="mb-4">
                    <Post {...p} />
                  </div>
                );
              }
            })
          ) : (
            <div className="flex justify-center">
              <p className="text-md text-neutral-500 mt-24">
                No posts to display.
              </p>
            </div>
          )}
          {isLoadingMore && (
            <div className="w-full h-10 flex justify-center items-center">
              <Spinner />
            </div>
          )}
        </div>
        <div className="w-full hidden md:flex justify-end max-w-[360px]">
          {currentUser ? (
            <div className="w-full flex flex-col gap-4">
              <FollowWidget />
            </div>
          ) : (
            <LoginWidget />
          )}
        </div>
      </div>
    </div>
  );
}
