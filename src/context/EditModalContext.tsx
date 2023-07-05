"use client";

import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { EditModal } from "@/components/modals/EditModal";

type Props = {
  children?: ReactNode;
};

type Context = {
  isEditModalOpen: boolean;
  setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const EditModalContext = createContext<Context>({
  isEditModalOpen: false,
  setIsEditModalOpen: () => {},
});

export const EditModalProvider: React.FC<Props> = ({ children }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  return (
    <EditModalContext.Provider value={{ isEditModalOpen, setIsEditModalOpen }}>
      <EditModal
        visible={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
      {children}
    </EditModalContext.Provider>
  );
};
