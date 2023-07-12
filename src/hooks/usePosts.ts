import useSWRInfinite from "swr/infinite";
import fetcher from "@/util/fetcher";
import { PostType } from "@/util/types/PostType";

const usePosts = (userId?: string) => {
  const url = userId ? `/api/posts?userId=${userId}` : "/api/posts?";
  const postLimit = 10;
  const { data, mutate, size, setSize, isValidating, isLoading } =
    useSWRInfinite(
      (index) => `${url}&limit=${postLimit}&page=${index + 1}`,
      fetcher
    );
  const posts: PostType[] = data ? [].concat(...data) : [];
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < postLimit);
  return {
    posts,
    mutate,
    size,
    setSize,
    isValidating,
    isLoading,
    isEmpty,
    isReachingEnd,
  };
};

export default usePosts;
