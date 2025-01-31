import React from "react";
import { useLanguage } from "translate-easy";

const LanguageSelector = () => {
  const { languages, selectedLanguage, handleChangeLanguage } = useLanguage();

  const handleChange = (event) => {
    handleChangeLanguage(event.target.value);
  };

  return (
    <div className="text-white border z-50 border-[#F9B8B4] flex justify-center items-center rounded-full w-16 h-16">
      <select
        value={selectedLanguage.code}
        onChange={handleChange}
        className="bg-[#F9B8B4] py-1 cursor-pointer rounded-full"
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
