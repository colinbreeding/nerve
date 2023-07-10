import useCurrentUser from "@/hooks/useCurrentUser";
import useNotification from "@/hooks/useNotification";
import { useCallback, useEffect } from "react";
import { NotificationType } from "@/util/types/NotificationType";
import { formatDistanceToNowStrict } from "date-fns";
import { Spinner } from "@/components/spinner/Spinner";

interface NotificationFeedProps {
  userId: string;
}

export default function NotificationFeed({ userId }: NotificationFeedProps) {
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
      {notifications.map((n: NotificationType, i: number) => {
        return (
          <div
            key={i}
            className="w-full p-4 flex items-center justify-between gap-2 border-b border-neutral-700"
          >
            <div className="flex gap-2 items-center">
              <p className="text-[14px] text-neutral-200">{n.body}</p>
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
  );
}
