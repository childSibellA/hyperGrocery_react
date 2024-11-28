import React from "react";

const ArrowDownSvg = ({ active }) => {
  return (
    <svg
      className={`${active ? "admin-arrow-rotate" : ""} ${"admin-arrow"}`}
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="black"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 10L10.5303 12.4697C10.2386 12.7614 9.76136 12.7614 9.4697 12.4697L7 10"
        stroke="#fff"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowDownSvg;
