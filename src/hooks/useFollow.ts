import useSWR from "swr";
import fetcher from "@/util/fetcher";
import { useCallback, useEffect, useState } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import axios from "axios";

const useFollow = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/follow?userId=${userId}`,
    fetcher
  );
  const { data: currentUser } = useCurrentUser();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const findIsFollowing = useCallback(() => {
    if (!data || !currentUser) return;
    const followerIds: any = [];
    data.Followers.forEach((follower: any) => {
      followerIds.push(follower.followerId);
    });
    const result = followerIds.includes(currentUser.id);
    setIsFollowing(result);
  }, [currentUser, data]);

  useEffect(() => {
    void findIsFollowing();
  }, [findIsFollowing, isFollowing]);

  const toggleFollow = async () => {
    if (!data) return;
    let request;
    if (isFollowing) {
      request = () =>
        axios.post("/api/follow/delete", {
          userId,
          currentUserId: currentUser.id,
        });
    } else {
      request = () =>
        axios.post("/api/follow", {
          userId,
          currentUserId: currentUser.id,
        });
    }
    await request();
    await mutate();
  };

  return {
    data,
    error,
    isLoading,
    mutate,
    isFollowing,
    toggleFollow,
  };
};

export default useFollow;
