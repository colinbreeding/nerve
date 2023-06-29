"use client";

import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import SignInModal from "@/components/modals/SignInModal";
import SignUpModal from "@/components/modals/SignUpModal";

type Props = {
  children?: ReactNode;
};

type Context = {
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: Dispatch<SetStateAction<boolean>>;
  isSignUp: boolean;
  setIsSignUp: Dispatch<SetStateAction<boolean>>;
};

export const AuthModalContext = createContext<Context>({
  isAuthModalOpen: false,
  setIsAuthModalOpen: () => {},
  isSignUp: false,
  setIsSignUp: () => {},
});

export const AuthModalProvider: React.FC<Props> = ({ children }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    if (!isAuthModalOpen) setIsSignUp(false);
  }, [isAuthModalOpen]);

  return (
    <AuthModalContext.Provider
      value={{ isAuthModalOpen, setIsAuthModalOpen, isSignUp, setIsSignUp }}
    >
      {isSignUp ? (
        <SignUpModal
          visible={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      ) : (
        <SignInModal
          visible={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      )}
      {children}
    </AuthModalContext.Provider>
  );
};
