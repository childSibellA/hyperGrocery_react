import { useState, useRef } from "react";
import { useOnOutsideClick } from "../../hooks/useOnOutsideClick";
import { Dropdown } from "../Dropdown/Dropdown";
import ThreeDotsSvg from "../../assets/svgs/ThreeDotsSvg";

import "./MoreButton.css";

export const MoreButton = ({ dropdownData }) => {
  const [active, setActive] = useState(false);

  const toggleActive = () => {
    setActive(!active);
  };

  const ref = useRef();
  useOnOutsideClick(ref, () => setActive(false));

  return (
    <div ref={ref} className={`more-container  ${active ? "z-more" : ""}`}>
      <div className="notification-toggle" onClick={toggleActive}>
        <ThreeDotsSvg />
      </div>
      <div className="notification-options">
        <div
          className={`${"moreBtn-hidden"} ${active ? "moreBtn-visible" : ""}`}
        >
          <Dropdown
            data={dropdownData}
            type={"dropdown"}
            dropdown={"dropdown"}
            handleListItemClick={() => setActive(false)}
          />
        </div>
      </div>
    </div>
  );
};
