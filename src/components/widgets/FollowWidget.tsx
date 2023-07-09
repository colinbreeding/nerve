import React, { useCallback, useEffect, useState } from "react";
import useUsers from "@/hooks/useUsers";
import UserItem from "@/components/widgets/components/UserItem";
import useCurrentUser from "@/hooks/useCurrentUser";
import { UserType } from "@/util/types/UserType";

export default function FollowWidget() {
  const { data: users } = useUsers();
  const { data: currentUser } = useCurrentUser();
  const [randomInt, setRandomInt] = useState<number>(0);
  const filteredUsers =
    users && users.filter((u: UserType) => u.id !== currentUser.id);

  const getRandomUsers = useCallback(() => {
    if (filteredUsers) {
      setRandomInt(Math.floor(Math.random() * (filteredUsers.length - 3)) + 1);
    } else return 0;
  }, [filteredUsers]);

  useEffect(() => {
    void getRandomUsers();
  }, [getRandomUsers]);

  return (
    <div className="w-full max-w-[400px] h-fit -bg-white dark:-bg-grey/50 sticky top-[72px] pb-6 flex flex-col justify-center items-center rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700">
      <div className="w-full h-full py-4 px-6 flex flex-col gap-4 relative">
        <h1 className="text-smoothBlack dark:text-white font-semibold">
          Who To Follow
        </h1>
      </div>
      <div className="w-full px-6 flex flex-col gap-3">
        {filteredUsers &&
          filteredUsers
            .slice(randomInt, randomInt + 3)
            .map((d: any, i: number) => {
              return <UserItem key={i} user={d} />;
            })}
      </div>
    </div>
  );
}
