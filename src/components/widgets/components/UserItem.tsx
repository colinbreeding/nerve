import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import useFollow from "@/hooks/useFollow";

interface UserItemProps {
  user: any;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  const router = useRouter();
  const { isFollowing, toggleFollow } = useFollow(user.id);
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Image
          alt="avatar"
          src={user.image ?? "/images/avatar_default.png"}
          width={35}
          height={35}
          className="rounded-full cursor-pointer max-w-[30px] max-h-[30px]"
          onClick={() => {
            router.push(`/profile/${user.id}`);
          }}
        />
        <div className="flex flex-col justify-center mt-1 gap-[1px]">
          <p
            className="text-base text-smoothBlack dark:text-white leading-4 hover:underline cursor-pointer"
            onClick={() => {
              router.push(`/profile/${user.id}`);
            }}
          >
            {user.name}
          </p>
          {user.username && (
            <p className="text-sm  text-neutral-500">@{user.username}</p>
          )}
        </div>
      </div>
      <div>
        <button
          onClick={toggleFollow}
          className="text-xs bg-neutral-200 dark:bg-neutral-400 hover:bg-neutral-300 hover:dark:bg-neutral-500 py-2 px-4 rounded-full transition duration-150 ease-in-out"
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      </div>
    </div>
  );
};

export default UserItem;
