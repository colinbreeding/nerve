import useSWR from "swr";
import fetcher from "@/util/fetcher";

const usePost = (postId?: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/posts/postId?postId=${postId}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePost;
