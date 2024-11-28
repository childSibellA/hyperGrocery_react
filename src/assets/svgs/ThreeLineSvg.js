import React from "react";

const ThreeLineSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
    >
      <rect
        x="2"
        y="4"
        width="20"
        height="16"
        fill="#fff"
        stroke="#000"
        strokeWidth="1.5"
      />
      <line x1="4" y1="8" x2="20" y2="8" stroke="#000" strokeWidth="1" />
      <line x1="4" y1="12" x2="20" y2="12" stroke="#000" strokeWidth="1" />
      <line x1="4" y1="16" x2="20" y2="16" stroke="#000" strokeWidth="1" />
    </svg>
  );
};

export default ThreeLineSvg;
