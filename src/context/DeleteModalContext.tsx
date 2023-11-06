"use client";

import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { EditModal } from "@/components/modals/EditModal";
import { DeleteModal } from "@/components/modals/DeleteModal";

type Props = {
  children?: ReactNode;
};

type Context = {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const DeleteModalContext = createContext<Context>({
  isDeleteModalOpen: false,
  setIsDeleteModalOpen: () => {},
});

export const DeleteModalProvider: React.FC<Props> = ({ children }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  return (
    <DeleteModalContext.Provider
      value={{ isDeleteModalOpen, setIsDeleteModalOpen }}
    >
      <DeleteModal
        visible={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
      {children}
    </DeleteModalContext.Provider>
  );
};
