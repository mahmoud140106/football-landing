import React, { createContext, useContext, useEffect, useState } from "react";

import ar from "../locale/ar";
import en from "../locale/en";

export const I18nContext = createContext(null);

const supportedLanguages = ["en", "ar"];
const defaultLanguage = "en";

export const I18nProvider = ({ children }) => {
  const [language, setLanguage] = useState(defaultLanguage);
  console.log(language);

  useEffect(() => {
    const browserLang = navigator.language.split("-")[0];
    const storedLang = localStorage.getItem("language");

    if (storedLang && supportedLanguages.includes(storedLang)) {
      setLanguage(storedLang);
    } else if (supportedLanguages.includes(browserLang)) {
      setLanguage(browserLang);
    } else {
      setLanguage(defaultLanguage);
    }
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const translations = {
    en,
    ar,
  };

  const t = (key, count) => {
    let keys = key.toString().split(".");
    let value = translations[language];
    for (let i = 0; i < keys.length; i++) {
      if (value && value.hasOwnProperty(keys[i])) {
        value = value[keys[i]];
      } else {
        return "";
      }
    }

    if (
      typeof count === "number" &&
      value.hasOwnProperty(count === 1 ? "one" : "other")
    ) {
      value = value[count === 1 ? "one" : "other"];
    } else if (value.hasOwnProperty("one")) {
      value = value["one"];
    }
    if (typeof value === "string" && count) {
      return value.replace("{count}", count.toString());
    }
    return value;
  };

  return (
    <I18nContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18nContext = () => {
  const context = useContext(I18nContext);

  if (context === null) {
    throw new Error(
      "The I18n context is not initialized. Make sure you have the provider set up correctly."
    );
  }

  return context;
};
