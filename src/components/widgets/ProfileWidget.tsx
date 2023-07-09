import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { RxCalendar } from "react-icons/rx";
import { Spinner } from "@/components/spinner/Spinner";
import { useParams } from "next/navigation";
import useUsers from "@/hooks/useUsers";
import { UserType } from "@/util/types/UserType";
import { EditModalContext } from "@/context/EditModalContext";
import useFollow from "@/hooks/useFollow";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function ProfileWidget() {
  const { data: currentUser } = useCurrentUser();
  const { userId } = useParams();
  const { data, isLoading } = useUsers(userId);
  const { setIsEditModalOpen } = useContext(EditModalContext);
  const [profileDetails, setProfileDetails] = useState<UserType | undefined>();
  const { data: followers, isFollowing, toggleFollow } = useFollow(userId);

  useEffect(() => {
    if (!data) return;
    setProfileDetails(data);
  }, [data]);

  if (!profileDetails) return;
  return (
    <div className="w-full max-w-full h-fit -bg-white dark:-bg-grey/50 sticky top-[72px] flex flex-col justify-center items-center rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700">
      {isLoading ? (
        <div className="w-full min-h-[332px] flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="w-full h-[90px] bg-neutral-200 dark:bg-neutral-800 absolute top-0 rounded-t-lg" />
          <div className="w-full h-full py-8 px-6 flex flex-col gap-4 relative">
            <div className="flex flex-col relative">
              {userId === currentUser?.id ? (
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="w-fit text-xs text-white dark:text-neutral-900 absolute top-[25px] right-0 bg-neutral-800 dark:bg-neutral-400 hover:bg-neutral-700 hover:dark:bg-neutral-500 rounded-full px-4 py-1 transition duration-150 ease-in-out"
                >
                  Edit Profile
                </button>
              ) : (
                <button
                  onClick={toggleFollow}
                  className="w-fit text-xs text-white dark:text-neutral-900 absolute top-[25px] right-0 bg-neutral-800 dark:bg-neutral-400 hover:bg-neutral-700 hover:dark:bg-neutral-500 rounded-full px-4 py-1 transition duration-150 ease-in-out"
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
              )}
              <Image
                alt="avatar"
                src={profileDetails.image ?? "/images/avatar_default.png"}
                width={80}
                height={80}
                className="rounded-lg shadow-lg"
                priority
              />
              <div className="flex items-center gap-2 mt-2">
                <p className="text-[20px] -text-smoothBlack dark:-text-white">
                  {profileDetails.name && profileDetails.name}
                </p>
                {profileDetails.username && (
                  <p className="text-[12px] text-neutral-400">
                    @{profileDetails.username}
                  </p>
                )}
              </div>
              <p className="text-[12px] text-neutral-400 mt-1">
                {profileDetails.email}
              </p>
              <p className="text-sm -text-smoothBlack dark:text-neutral-200 leading-5 mt-4">
                {profileDetails.bio && profileDetails.bio}
              </p>
              {profileDetails.createdAt && (
                <div className="flex items-center mt-4 gap-1">
                  <RxCalendar className="w-4 h-4 mb-1 text-neutral-500" />
                  <p className="text-xs text-neutral-500">
                    Joined{" "}
                    {format(new Date(profileDetails.createdAt), "MMMM yyyy")}
                  </p>
                </div>
              )}
              <div className="flex gap-2 mt-2 items-center">
                <p className="text-sm text-neutral-500">
                  {followers ? (
                    <span className="-text-smoothBlack dark:text-neutral-200 font-semibold">
                      {followers.Following.length}{" "}
                    </span>
                  ) : (
                    0
                  )}
                  Following
                </p>
                <p className="text-sm text-neutral-500">
                  {followers ? (
                    <span className="-text-smoothBlack dark:text-neutral-200 font-semibold">
                      {followers.Followers.length}{" "}
                    </span>
                  ) : (
                    0
                  )}
                  Followers
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
