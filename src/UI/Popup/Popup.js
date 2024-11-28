import React from "react";
import { Visual } from "../Visual/Visual";


import "./Popup.css";

export const Popup = ({
  label,
  handlePopUpClose,
  popUpElement,
  customStyles,
  description,
  headerCustomStyles,
  popupBGclass,
}) => {
  return (
    <div className={`popup-bg ${popupBGclass}`}>
      <div
        className="popup-wrapper-container"
        onClick={label !== "Confirm Payment" ? handlePopUpClose : () => {}}
      />
      <div className="popup-wrapper" style={customStyles}>
        {label && (
          <Visual
            label={label}
            element={"popup-header"}
            onClick={handlePopUpClose}
            customStyles={{
              width: "100%",
              ...headerCustomStyles,
            }}
            description={description}
          />
        )}

        {popUpElement && popUpElement}
      </div>
    </div>
  );
};
