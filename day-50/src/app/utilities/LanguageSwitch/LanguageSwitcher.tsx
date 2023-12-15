import React, { useState } from "react";
import "./languageSwitcher.css";
const LanguageSwitcher = () => {
  const [currentLang, setCurrentLang] = useState("en");
  return (
    <>
      <button className="lang-switcher">
        {currentLang}
        {/* {currentLang === "en" ?? setCurrentLang("vi")} */}
      </button>
    </>
  );
};

export default LanguageSwitcher;
