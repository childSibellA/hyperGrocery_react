import React from "react";

const DashSvg = ({ decriment }) => {
  return (
    <svg
      onClick={decriment}
      width="8"
      height="2"
      viewBox="0 0 8 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7.312 0.52V1.752H0.928V0.52H7.312Z" fill="white" />
    </svg>
  );
};

export default DashSvg;
