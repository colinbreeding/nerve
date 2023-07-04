import useSWR from "swr";
import fetcher from "@/util/fetcher";

interface UseUserProps {
  userId?: string;
}

const useUsers = (userId: UseUserProps) => {
  const Url = userId ? `/api/user/${userId}` : "/api/user";
  const { data, error, isLoading, mutate } = useSWR(Url, fetcher);
  return { data, error, isLoading, mutate };
};

export default useUsers;
