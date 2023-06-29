"use client";

import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

type Props = {
  children?: ReactNode;
};

export type Theme = "Light" | "Dark" | "System";

type Context = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<Context>({
  theme: "System",
  setTheme: () => {},
});

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(
    (typeof window !== "undefined" && localStorage.theme) || "System"
  );
  const element =
    (typeof document !== "undefined" && document.documentElement) || null;
  const themeQuery =
    (typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)")) ||
    null;

  const onWindowMatch = useCallback(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && themeQuery?.matches)
    ) {
      element?.classList.add("dark");
    } else {
      element?.classList.remove("dark");
    }
  }, [element?.classList, themeQuery?.matches]);

  useEffect(() => {
    themeQuery?.addEventListener("change", (e) => {
      if (!("theme" in localStorage)) {
        if (e.matches) {
          element?.classList.add("dark");
        } else {
          element?.classList.remove("dark");
        }
      }
    });
  }, [element?.classList, themeQuery]);

  useEffect(() => {
    switch (theme) {
      case "Light":
        element?.classList.remove("dark");
        localStorage.setItem("theme", "Light");
        break;
      case "Dark":
        element?.classList.add("dark");
        localStorage.setItem("theme", "Dark");
        break;
      default:
        localStorage.removeItem("theme");
        onWindowMatch();
        break;
    }
  }, [element?.classList, onWindowMatch, theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
