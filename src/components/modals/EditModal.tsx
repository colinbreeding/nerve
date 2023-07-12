import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import usePosts from "@/hooks/usePosts";
import { useDropzone } from "react-dropzone";
import useUsers from "@/hooks/useUsers";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditSchema, EditSchemaType } from "@/util/validation/EditSchema";
import Image from "next/image";
import { BiImageAdd } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { uploadFiles } from "@/util/uploadthing";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const EditModal: React.FC<Props> = ({ visible, onClose }) => {
  const { userId } = useParams();
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const { data: userDetails, mutate: mutateUser } = useUsers(userId);
  const { mutate: mutatePosts } = usePosts(userId);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [uploadAvatar, setUploadAvatar] = useState();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditSchemaType>({
    resolver: zodResolver(EditSchema),
  });

  const handleImageChange = (files: any) => {
    const image = files[0];
    setAvatar(URL.createObjectURL(image));
    setUploadAvatar(image);
  };

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleImageChange,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  const onSubmit = async ({ bio, username, name }: EditSchemaType) => {
    try {
      setIsLoading(true);
      if (uploadAvatar) {
        const imageResult = await uploadFiles({
          files: [uploadAvatar],
          endpoint: "imageUploader",
        });
        await axios.patch("/api/user", {
          name,
          username,
          bio,
          id: currentUser?.id,
          image: imageResult[0].fileUrl,
        });
      } else {
        await axios.patch("/api/user", {
          name,
          username,
          bio,
          id: currentUser?.id,
        });
      }
      toast.success("Profile Updated");
    } catch (error) {
      console.log(error);
      toast.error("Error Updating Profile");
    } finally {
      setIsLoading(false);
      await mutateUser();
      await mutatePosts();
      await mutateCurrentUser();
      onClose();
    }
  };

  useEffect(() => {
    if (!userDetails) return;
    setAvatar(userDetails.image);
    setValue("name", userDetails.name);
    setValue("username", userDetails.username);
    setValue("bio", userDetails.bio);
  }, [userDetails]);

  return (
    <div
      className={`${
        visible ? "fixed" : "hidden"
      } w-screen h-screen bg-black/50 top-0 left-0 overflow-hidden flex justify-center items-center px-4 z-50`}
    >
      <div className="w-full max-w-[400px] h-fit -bg-white dark:-bg-grey flex flex-col justify-center items-center rounded-lg shadow-authCard border border-neutral-200 dark:border-neutral-700">
        <div className="w-full h-full py-8 px-6 flex flex-col gap-4 relative">
          <div>
            <p
              className="absolute top-6 right-6 text-[14px] text-neutral-500 hover:bg-neutral-200 hover:dark:bg-neutral-700 p-1 rounded-md cursor-pointer transition duration-150 ease-in-out"
              onClick={onClose}
            >
              <AiOutlineClose className="w-5 h-5" />
            </p>
            <h1 className="text-[20px] -text-smoothBlack dark:text-white font-rubik font-semibold mb-6">
              Edit your profile
            </h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative">
              <div
                {...getRootProps({
                  className:
                    "w-[80px] h-[80px] flex justify-center items-center hover:bg-neutral-600/70 rounded-lg group cursor-pointer overflow-hidden",
                })}
              >
                <input
                  {...getInputProps({
                    className:
                      "absolute group-hover:z-30 opacity-0 w-[80px] h-[80px] flex justify-center items-center hover:bg-neutral-600/70 rounded-lg",
                  })}
                />
                <BiImageAdd className="w-5 h-5 absolute text-neutral-200" />
                <Image
                  alt="avatar"
                  src={avatar ?? "/images/avatar_default.png"}
                  width={80}
                  height={80}
                  className="rounded-lg shadow-lg z-20 group-hover:opacity-30"
                />
              </div>
              <input
                id="name"
                placeholder="Name"
                className={`${
                  errors.name
                    ? "border border-red-500 focus:outline-red-500"
                    : "focus:-outline-steelBlue"
                } w-full rounded-md mt-4 p-2 bg-neutral-200 dark:-bg-darkGrey text-[14px] -text-smoothBlack dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400`}
                {...register("name")}
              />
              {errors.name && (
                <span className="text-[12px] text-red-500 mt-1">
                  {errors.name.message}
                </span>
              )}
              <input
                id="username"
                placeholder="Username"
                className={`${
                  errors.username
                    ? "border border-red-500 focus:outline-red-500"
                    : "focus:-outline-steelBlue"
                } w-full rounded-md mt-4 p-2 bg-neutral-200 dark:-bg-darkGrey text-[14px] -text-smoothBlack dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400`}
                {...register("username")}
              />
              {errors.username && (
                <span className="text-[12px] text-red-500 mt-1">
                  {errors.username.message}
                </span>
              )}
              <textarea
                rows={4}
                id="bio"
                placeholder="Bio"
                className={`${
                  errors.bio
                    ? "border border-red-500 focus:outline-red-500"
                    : "focus:-outline-steelBlue"
                } w-full rounded-md mt-4 p-2 bg-neutral-200 dark:-bg-darkGrey text-[14px] -text-smoothBlack dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400`}
                {...register("bio")}
              />
              {errors.bio && (
                <span className="text-[12px] text-red-500 mt-1">
                  {errors.bio.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="w-full text-[14px] mt-2 py-2 -bg-steelBlue hover:-bg-pictonBlue rounded-md text-white transition duration-150 ease-in-out"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
