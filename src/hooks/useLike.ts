import useSWR from "swr";
import fetcher from "@/util/fetcher";
import { useCallback, useContext, useEffect, useState } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import axios from "axios";
import { AuthModalContext } from "@/context/AuthModalContext";

const useLike = (postId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/like?postId=${postId}`,
    fetcher
  );
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { setIsAuthModalOpen } = useContext(AuthModalContext);
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  const findHasLiked = useCallback(() => {
    if (!data || !currentUser) return;
    const likedIds: any = [];
    data.forEach((like: any) => {
      likedIds.push(like.likeId);
    });
    const result = likedIds.includes(currentUser.id);
    setHasLiked(result);
  }, [currentUser, data]);

  useEffect(() => {
    void findHasLiked();
  }, [findHasLiked, hasLiked]);

  const toggleLike = async () => {
    if (!data) return;
    if (!currentUser) return setIsAuthModalOpen(true);
    let request;
    if (hasLiked) {
      request = () =>
        axios.post("/api/like/delete", {
          postId,
          currentUserId: currentUser.id,
        });
    } else {
      request = () =>
        axios.post("/api/like", {
          postId,
          currentUserId: currentUser.id,
        });
    }
    await request();
    await mutate();
    await mutateCurrentUser();
  };

  return {
    data,
    error,
    isLoading,
    mutate,
    hasLiked,
    toggleLike,
  };
};

export default useLike;
