import { useEffect, useState } from "react";
import { Switches } from "../../../UI/Switches/Switches";

import styles from "./DarckMode.module.css";
import SunSvg from "../../../assets/svgs/SunSvg";

const DarkMode = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("selectedTheme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("selectedTheme", theme);
    window.dispatchEvent(new Event("themeChanged")); // Dispatch custom event
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };
  const customSwitchStyles = {
    transform: "rotate(90deg)",
    height: "20px",
  };

  return (
    <Switches
      value={theme === "light"}
      onChange={toggleTheme}
      customStyles={customSwitchStyles}
    />
  );
};

export default DarkMode;
