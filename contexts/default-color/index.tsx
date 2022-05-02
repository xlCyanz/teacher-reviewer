/* eslint-disable no-use-before-define */
import React, {
  createContext, FC, ReactNode, useCallback, useEffect, useMemo, useState,
} from "react";

interface IProviderProps {
  children: ReactNode;
}
interface IDefaultColor {
    color: string | undefined;
    changeColor: (colorHex: string) => void;
}

const DefaultColorContext = createContext<IDefaultColor>({
  color: "#6200EA",
  changeColor: () => {},
});

const useContext = () => React.useContext(DefaultColorContext);

const Provider: FC<IProviderProps> = ({ children }) => {
  const [color, setColor] = useState("#6200EA");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem("default-color");

      if (item) {
        setColor(item);
        document.documentElement.style.setProperty("--default-color", item);
      } else {
        localStorage.setItem("default-color", color);
        document.documentElement.style.setProperty("--default-color", color);
      }
    }
  }, [color]);

  /**
   *  Change the global color of the application.
   *
   * @param {string} colorHex
   */
  const changeColor = useCallback((colorHex: string) => {
    if (colorHex.includes("#")) {
      setColor(colorHex);
      localStorage.setItem("default-color", colorHex);
    } else {
      setColor(`#${colorHex}`);
      localStorage.setItem("default-color", `#${colorHex}`);
    }
  }, []);

  const values = useMemo(() => ({ color, changeColor }), [color, changeColor]);

  return (
    <DefaultColorContext.Provider value={values}>
      {children}
    </DefaultColorContext.Provider>
  );
};

export { Provider, useContext };
