import { useEffect, useState } from "react";
import WarningCircle from "../../assets/svgs/WarningCircle";
import WarningError from "../../assets/svgs/WarningError";
import WarningIcone from "../../assets/svgs/WarningIcone";
import SuccessSimpleSvg from "../../assets/svgs/SuccessSimpleSvg";

import "./HelpText.css";

export const HelpText = ({
  status,
  customStyles,
  className,
  icon,
  fontSize,
  title,
}) => {
  const [color, setColor] = useState("");

  function colorPicker(key, textColor) {
    if (status === key) {
      setColor(textColor);
    }
  }

  useEffect(() => {
    colorPicker("success", "#9CCC65");
    colorPicker("error", "#FF0C46");
    colorPicker("warning", "#FFA726");
    colorPicker("info", "#6A6D76");
  }, [status]);

  return (
    <div style={customStyles} className={`status-group ${className}`}>
      <div className={!icon ? "hidden" : "status-group-inner"}>
        {status === "success" && <SuccessSimpleSvg />}
        {status === "warning" && <WarningIcone />}
        {status === "error" && <WarningError />}
        {status === "info" && <WarningCircle />}
      </div>
      <p style={{ color }} className={fontSize}>
        {title}
      </p>
    </div>
  );
};
