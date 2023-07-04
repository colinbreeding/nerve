import useSWR from "swr";
import fetcher from "@/util/fetcher";

const useUsers = (userId?: string) => {
  const Url = userId ? `/api/user?userId=${userId}` : "/api/user";
  const { data, error, isLoading, mutate } = useSWR(Url, fetcher);
  return { data, error, isLoading, mutate };
};

export default useUsers;
