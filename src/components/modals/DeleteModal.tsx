import React from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import usePosts from "@/hooks/usePosts";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const DeleteModal: React.FC<Props> = ({ visible, onClose }) => {
  const router = useRouter();
  const { postId } = useParams();
  const { mutate: mutatePosts } = usePosts();

  const onDelete = async () => {
    try {
      await axios.patch(`/api/posts/postId`, { postId });
      toast.success("Post Successfully Deleted");
    } catch (error) {
      console.log(error);
      toast.error("Error Deleting Post");
    } finally {
      onClose();
      await mutatePosts();
      router.push("/");
    }
  };

  return (
    <div
      className={`${
        visible ? "fixed" : "hidden"
      } w-screen h-screen bg-black/50 top-0 left-0 overflow-hidden flex justify-center items-center px-0 sm:px-4 z-50`}
    >
      <div className="w-full sm:max-w-[420px] h-full sm:h-fit -bg-white dark:-bg-smoothBlack flex flex-col justify-center items-center rounded-none sm:rounded-lg shadow-authCard md:border border-neutral-200 dark:border-neutral-700">
        <div className="w-full h-full p-6">
          <h1 className="text-[20px] -text-smoothBlack dark:text-white font-rubik font-semibold mb-4">
            Delete Post
          </h1>
          <p className="text-white">
            Are you sure you would like to delete this post?
          </p>
          <p className="text-red-500 text-[12px] mt-1">
            Warning: This action cannot be undone.
          </p>
          <div className="w-full flex justify-end gap-4 mt-8">
            <button
              onClick={onClose}
              className="text-neutral-500 hover:text-neutral-400 transition duration-150 ease-in-out"
            >
              Cancel
            </button>
            <button
              onClick={onDelete}
              className="bg-red-500 hover:bg-red-400 text-neutral-200 px-4 py-2 rounded-full transition duration-150 ease-in-out"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
