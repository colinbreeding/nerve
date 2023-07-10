import useSWR from "swr";
import fetcher from "@/util/fetcher";

const useNotification = (userId?: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/notification?userId=${userId}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useNotification;
