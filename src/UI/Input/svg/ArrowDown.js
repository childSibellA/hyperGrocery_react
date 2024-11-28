import React from "react";

const ArrowDown = ({ active, value, edit, editable, onClick }) => {
  return (
    <svg
      className={`inputSvgs ${active ? "rotate" : ""} ${"arrow"} ${
        value?.length > 0 && !edit && editable ? "arrow-none" : "arrow-show"
      } `}
      onClick={onClick}
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="inputSvgs"
        d="M13 10L10.5303 12.4697C10.2386 12.7614 9.76136 12.7614 9.4697 12.4697L7 10"
        stroke="white"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowDown;
