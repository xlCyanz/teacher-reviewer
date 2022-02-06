/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/ban-types */
import React, {
  createContext, ReactNode, useCallback, useMemo, useState,
} from "react";

// import esLang from "../../../public/language/es_es.json";

interface ProviderProps {
    children: ReactNode
}

interface IObject {
    [key: string]: {}
}

interface ILanguageContext {
    language: string;
    dictionary: IObject;
    changeLanguage: Function;
}

interface IDictionaryList {
    en: {},
    es: {}
}

const dictionaryList: IDictionaryList = { en: {}, es: {} };

const LanguageContext = createContext<ILanguageContext>({
  language: "es",
  dictionary: dictionaryList.es,
  changeLanguage: () => {},
});

const useContext = () => React.useContext(LanguageContext);

const getLanguageStoraged = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("lang");

    if (typeof storedPrefs === "string") return storedPrefs;
  }

  return "es";
};

const Provider = ({ children }: ProviderProps) => {
  const [language, setLanguage] = useState<string>(getLanguageStoraged || "es");

  const changeLanguage = useCallback((newLang: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", newLang);
      setLanguage(newLang);
    }
  }, []);

  const values = useMemo(() => ({
    language,
    dictionary: dictionaryList[language as keyof object],
    changeLanguage,
  }), [changeLanguage, language]);

  return (
    <LanguageContext.Provider value={values}>
      {children}
    </LanguageContext.Provider>
  );
};

export { Provider, useContext };
