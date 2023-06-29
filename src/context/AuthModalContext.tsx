"use client";

import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import AuthModal from "@/components/modals/AuthModal";

type Props = {
  children?: ReactNode;
};

type Context = {
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const AuthModalContext = createContext<Context>({
  isAuthModalOpen: false,
  setIsAuthModalOpen: () => {},
});

export const AuthModalProvider: React.FC<Props> = ({ children }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  return (
    <AuthModalContext.Provider value={{ isAuthModalOpen, setIsAuthModalOpen }}>
      <AuthModal
        visible={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
      {children}
    </AuthModalContext.Provider>
  );
};
