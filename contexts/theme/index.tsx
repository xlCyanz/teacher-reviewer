/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-use-before-define */
import React, {
  createContext, Dispatch, ReactNode, SetStateAction, useEffect, useMemo, useState,
} from "react";

interface ProviderProps {
  children: ReactNode
}

interface IThemeContext {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}

const ThemeContext = createContext<IThemeContext>({
  theme: "",
  setTheme: () => {},
});

const useContext = () => React.useContext(ThemeContext);

const getInitialTheme = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("color-theme");

    if (typeof storedPrefs === "string") return storedPrefs;

    const hours = new Date().getHours();
    const isDayTime = hours > 6 && hours < 20;

    if (isDayTime) return "light";
    return "dark";
  }

  return "light";
};

const Provider = ({ children }: ProviderProps) => {
  const [theme, setTheme] = useState<string>(getInitialTheme);

  const rawSetTheme = (rawTheme: string) => {
    if (typeof window !== "undefined") {
      const { classList } = window.document.documentElement;
      const isDark = rawTheme === "dark";

      classList.remove(isDark ? "light" : "dark");
      classList.add(rawTheme);

      localStorage.setItem("color-theme", rawTheme);
    }
  };

  useEffect(() => rawSetTheme(theme), [theme]);

  const values = useMemo(() => ({ theme, setTheme }), [setTheme, theme]);

  return (
    <ThemeContext.Provider value={values}>
      {children}
    </ThemeContext.Provider>
  );
};

export { Provider, useContext };
