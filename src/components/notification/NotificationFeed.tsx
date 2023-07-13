import useCurrentUser from "@/hooks/useCurrentUser";
import useNotification from "@/hooks/useNotification";
import React, { useCallback, useEffect } from "react";
import { NotificationType } from "@/util/types/NotificationType";
import { formatDistanceToNowStrict } from "date-fns";
import { Spinner } from "@/components/spinner/Spinner";
import { AiOutlineClose } from "react-icons/ai";

interface NotificationFeedProps {
  userId: string;
  setIsNotificationSelected: () => void;
}

export default function NotificationFeed({
  userId,
  setIsNotificationSelected,
}: NotificationFeedProps) {
  const { mutate: mutateCurrentUser } = useCurrentUser();
  const { data: notifications, isLoading } = useNotification(userId);

  const clearAlert = useCallback(async () => {
    await mutateCurrentUser();
  }, [mutateCurrentUser]);

  useEffect(() => {
    void clearAlert();
  }, [clearAlert]);

  if (isLoading)
    return (
      <div className="w-full h-full flex justify-center">
        <div className="mt-20">
          <Spinner />
        </div>
      </div>
    );
  if (!notifications.length) {
    return (
      <div className="w-full h-full flex justify-center">
        <p className="mt-12 text-neutral-500 text-[14px]">No Notifications</p>
      </div>
    );
  }
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex justify-between p-4 border-b border-neutral-700 shadow-lg">
        <p className="text-[18px] text-neutral-900 dark:text-neutral-200 flex items-end">
          Notifications
        </p>
        <p
          className="flex text-[14px] text-neutral-500 hover:bg-neutral-200 hover:dark:bg-neutral-700 p-1 rounded-md cursor-pointer transition duration-150 ease-in-out"
          onClick={setIsNotificationSelected}
        >
          <AiOutlineClose className="w-5 h-5" />
        </p>
      </div>
      <div className="overflow-scroll scrollbar-thin scrollbar-thumb-rounded-md scrollbar-thumb-neutral-400/40 dark:scrollbar-thumb-neutral-400/20 scrollbar-track-neutral-700/10 dark:scrollbar-track-neutral-700/20">
        {notifications.map((n: NotificationType, i: number) => {
          return (
            <div
              key={i}
              className="w-full p-4 flex items-center justify-between gap-2 border-b border-neutral-200 dark:border-neutral-700"
            >
              <div className="flex gap-2 items-center">
                <p className="text-[14px] text-neutral-900 dark:text-neutral-200">
                  {n.body}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-neutral-400">
                  {formatDistanceToNowStrict(new Date(n.createdAt))} ago
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
