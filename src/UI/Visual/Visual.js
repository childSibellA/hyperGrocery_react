import React from "react";
import CopyContentSvg from "../../assets/svgs/CopyContentSvg";
import CloseSvg from "../../assets/svgs/CloseSvg";
import SlideLeftSvg from "../../assets/svgs/SlideLeftSvg";

import "./Visual.css";

export const Visual = ({
  element: elementType, // Renamed to avoid conflict
  customStyles,
  goBack,
  label,
  description,
  closePopup,
  onClick,
  type,
  tokenBalance,
  centerButtons,
  buttonsLeft,
  fontSize,
  labelCustomStyles,
  buttons,
}) => {
  let element = null;

  if (elementType === "popup-header") {
    element = (
      <div className="popup-header" style={customStyles}>
        <div className="goBackWrapper">
          {goBack && (
            <span onClick={goBack} className="goBackSvg">
              <SlideLeftSvg />
            </span>
          )}
          <p className="popup-header-head">
            <span className="font-16 popup-header-label">{label}</span>
            {description && (
              <span className="font-14 popup-header-description">
                {description}
              </span>
            )}
          </p>
        </div>
        <CloseSvg onClick={onClick} style={{ cursor: "pointer" }} />
      </div>
    );
  }

  if (elementType === "delimiter") {
    element = (
      <div className="delimiter" style={customStyles}>
        <div className="line line1"></div>
        <span className="font-16">{label}</span>
        <div className="line line2"></div>
      </div>
    );
  }

  if (elementType === "copy-address") {
    element = (
      <div className="copy-address" style={customStyles} onClick={onClick}>
        <div className="copy-address-content">
          <CopyContentSvg />
          <p className="copy-address-text">{label}</p>
        </div>
        {type === "withBalance" && (
          <p className="address-balance-cont">
            AONE Balance:{" "}
            <span className="address-balance">{tokenBalance}</span>
          </p>
        )}
      </div>
    );
  }

  if (elementType === "table-header") {
    element = (
      <div
        style={customStyles}
        className={`tb-head ${centerButtons ? "tb-head-center" : ""}`}
      >
        {centerButtons && <div className="left-panel-btns">{buttonsLeft}</div>}
        <div className="left-panel">
          <h1 className={fontSize} style={labelCustomStyles}>
            {label}
          </h1>
          {description && <p className="font-14">{description}</p>}
        </div>
        {buttons && <div className="right-panel">{buttons}</div>}
      </div>
    );
  }

  return element;
};
