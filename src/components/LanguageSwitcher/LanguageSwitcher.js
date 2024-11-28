import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import GlobeSvg from "../../assets/svgs/GlobeSvg";
import ArrowDownSvg from "../../assets/svgs/ArrowDownSvg";
import { Button } from "../../UI/Button/Button";

import styles from "./LanguageSwitcher.module.css";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const switcherRef = useRef(null);

  const currentLanguage = localStorage.getItem("language") || i18n.language;

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (switcherRef.current && !switcherRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  return (
    <div className={styles.switcherContainer} ref={switcherRef}>
      <Button
        label={currentLanguage === "en" ? "EN" : "GE"}
        size={"btn-lg"}
        type={"btn-primary"}
        element={"laguage"}
        svg={<GlobeSvg />}
        arrow={true}
        onClick={toggleDropdown}
        ArrowDownSvg={ArrowDownSvg(isOpen)}
        customStyles={{
          border: "1px solid #eeeeee",
          background: "#3e54ac",
        }}
      />
      <div className={`${styles.dropdownMenu} ${isOpen ? styles.active : ""}`}>
        <div
          className={`${styles.dropdownItem} ${
            currentLanguage === "en" ? styles.active : ""
          }`}
          onClick={() => changeLanguage("en")}
        >
          English
        </div>
        <div
          className={`${styles.dropdownItem} ${
            currentLanguage === "ge" ? styles.active : ""
          }`}
          onClick={() => changeLanguage("ge")}
        >
          Georgian
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
