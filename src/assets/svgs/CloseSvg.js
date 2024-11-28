import React from "react";

const CloseSvg = ({ onClick }) => {
  return (
    <svg
      onClick={onClick}
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 29.1668C22.7916 29.1668 29.1666 22.7918 29.1666 15.0002C29.1666 7.2085 22.7916 0.833496 15 0.833496C7.20831 0.833496 0.833313 7.2085 0.833313 15.0002C0.833313 22.7918 7.20831 29.1668 15 29.1668Z"
        stroke="#6A6D76"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.9908 19.0095L19.0091 10.9912"
        stroke="#6A6D76"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.0091 19.0095L10.9908 10.9912"
        stroke="#6A6D76"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CloseSvg;
