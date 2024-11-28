import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import WarningIcone from "../../assets/svgs/WarningIcone";

import "./Button.css";

export const Button = ({
  ArrowDownSvg,
  color,
  element,
  size,
  type,
  arrow,
  labelSetting,
  disabled,
  className,
  onClick,
  customStyles,
  svg,
  label,
  warning,
  subMenu,
  id,
  route,
  open,
  active,
}) => {
  const location = useLocation();
  const [expand, setExpand] = useState(null);

  const openExpand = (expandId) => {
    setExpand(expandId !== expand ? expandId : null);
  };

  let elementComponent = null;

  if (element === "button") {
    elementComponent = (
      <div
        className={`btn ${size} ${type} ${arrow} ${labelSetting} ${
          disabled ? "disabled" : ""
        } ${className}`}
        onClick={(e) => {
          if (!disabled) onClick(e);
        }}
        style={customStyles}
        disabled={disabled}
      >
        <span className="btnSvg">{svg}</span>
        <span>{label}</span>
        {ArrowDownSvg}
      </div>
    );
  }

  if (element === "laguage") {
    elementComponent = (
      <div
        className={`btn ${size} ${type} ${arrow} ${labelSetting} ${
          disabled ? "disabled" : ""
        } ${className}`}
        onClick={(e) => {
          if (!disabled) onClick(e);
        }}
        style={customStyles}
        disabled={disabled}
      >
        {svg}
        <span style={{ color: "#eeeeee", fontSize: "20px" }}>{label}</span>
        {ArrowDownSvg}
      </div>
    );
  }

  if (element === "signin") {
    elementComponent = (
      <div
        className={`btn ${size} ${type} ${arrow} ${labelSetting} ${
          disabled ? "disabled" : ""
        } ${className}`}
        style={customStyles}
        disabled={disabled}
      >
        {svg}
        <span style={{ color: "#3e54ac", fontSize: "20px" }}>{label}</span>
        {ArrowDownSvg}
      </div>
    );
  }

  if (element === "side-button") {
    elementComponent = (
      <div className="side-btn" onClick={onClick} style={customStyles}>
        <div className="side-btn-icon">
          <div className="side-btn-icon">{svg}</div>
        </div>
        <span>{label}</span>
        <div className="side-btn-note">{warning && <WarningIcone />}</div>
        {subMenu?.length}
      </div>
    );
  }

  if (element === "side-admin-button" && subMenu?.length > 0) {
    elementComponent = (
      <div className="side-admin-button-container">
        <div
          onClick={() => openExpand(id)}
          className={`side-admin-button open ${id === expand ? "active" : ""}`}
          style={customStyles}
        >
          <div className="side-btn-icon">{svg}</div>
          <span className="font-16">{label}</span>
        </div>
        <div className={`side-admin-expand ${id === expand ? "active" : ""}`}>
          {subMenu.map((item, index) => (
            <Link
              to={route + item.route}
              key={index}
              className={`side-admin-button-expand font-14 ${
                route + item.route === location.pathname ? "subMenu-active" : ""
              }`}
            >
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  if (element === "side-admin-button" && subMenu?.length === 0) {
    elementComponent = (
      <Link
        to={route}
        className={`side-admin-button open ${open ? "open" : ""} ${
          active ? "active" : ""
        }`}
        style={customStyles}
      >
        <div className="side-btn-icon">{svg}</div>
        <div className="side-btn-text">
          <span className="font-16">{label}</span>
        </div>
      </Link>
    );
  }

  return elementComponent;
};
