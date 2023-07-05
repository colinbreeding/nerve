import React, { useCallback, useEffect, useState } from "react";
import useUsers from "@/hooks/useUsers";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function FollowWidget() {
  const router = useRouter();
  const { data: users } = useUsers();
  const [randomInt, setRandomInt] = useState<number>(0);

  const getRandomUsers = useCallback(() => {
    if (users) {
      setRandomInt(Math.floor(Math.random() * (users.length - 3)) + 1);
    } else return 0;
  }, [users]);

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
        {users &&
          users.slice(randomInt, randomInt + 3).map((d: any, i: number) => {
            return (
              <div key={i} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Image
                    alt="avatar"
                    src={"/images/avatar_default.png"}
                    width={35}
                    height={35}
                    className="rounded-full cursor-pointer"
                    onClick={() => {
                      router.push(`/profile/${d.id}`);
                    }}
                  />
                  <div className="flex flex-col justify-center mt-1 gap-[1px]">
                    <p
                      className="text-base text-smoothBlack dark:text-white leading-4 hover:underline cursor-pointer"
                      onClick={() => {
                        router.push(`/profile/${d.id}`);
                      }}
                    >
                      {d.name}
                    </p>
                    {d.username && (
                      <p className="text-sm  text-neutral-500">@{d.username}</p>
                    )}
                  </div>
                </div>
                <div>
                  <button className="text-xs bg-neutral-200 dark:bg-neutral-400 hover:bg-neutral-300 hover:dark:bg-neutral-500 py-2 px-4 rounded-full transition duration-150 ease-in-out">
                    Follow
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
