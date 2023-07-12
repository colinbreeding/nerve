import React from "react";
import useUsers from "@/hooks/useUsers";
import UserItem from "@/components/widgets/components/UserItem";
import useCurrentUser from "@/hooks/useCurrentUser";
import { UserType } from "@/util/types/UserType";
import { Spinner } from "@/components/spinner/Spinner";

export default function FollowWidget() {
  const { data: users, isLoading } = useUsers();
  const { data: currentUser } = useCurrentUser();
  const filteredUsers =
    users &&
    currentUser &&
    users.filter((u: UserType) => u.id !== currentUser.id);

  return (
    <div className="w-full max-w-[400px] h-fit -bg-white dark:-bg-grey/50 sticky top-[72px] pb-6 flex flex-col justify-center items-center rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700">
      {isLoading ? (
        <div className="absolute top-1/3 left-1/2 translate-x-[-50%]">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="w-full h-full py-4 px-6 flex flex-col gap-4 relative">
            <h1 className="text-smoothBlack dark:text-white font-semibold">
              Who To Follow
            </h1>
          </div>
          {filteredUsers && filteredUsers.length > 0 ? (
            <div className="w-full px-6 flex flex-col gap-3">
              {currentUser
                ? filteredUsers &&
                  filteredUsers.slice(0, 3).map((d: any, i: number) => {
                    return <UserItem key={i} user={d} />;
                  })
                : users &&
                  users.slice(0, 3).map((d: any, i: number) => {
                    return <UserItem key={i} user={d} />;
                  })}
            </div>
          ) : (
            <div className="flex justify-center">
              <p className="text-md text-neutral-500 mt-2 mb-20">
                Your the only user :(
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
