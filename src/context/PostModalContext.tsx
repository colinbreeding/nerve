"use client";

import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { PostModal } from "@/components/modals/PostModal";

type Props = {
  children?: ReactNode;
};

type Context = {
  isPostModalOpen: boolean;
  setIsPostModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const PostModalContext = createContext<Context>({
  isPostModalOpen: false,
  setIsPostModalOpen: () => {},
});

export const PostModalProvider: React.FC<Props> = ({ children }) => {
  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);

  return (
    <PostModalContext.Provider value={{ isPostModalOpen, setIsPostModalOpen }}>
      <PostModal
        visible={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
      />
      {children}
    </PostModalContext.Provider>
  );
};
