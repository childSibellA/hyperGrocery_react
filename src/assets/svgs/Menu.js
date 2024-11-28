import React from "react";

const Menu = ({ className, active, ...props }) => {
  if (active) {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        {...props}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.19995 16.8L16.8 7.19995"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.8 16.8L7.19995 7.19995"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  } else {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        {...props}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 7H19"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M9 12L19 12"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M5 17H19"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }
};

export default Menu;
