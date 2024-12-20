import React from "react";

const PlusSvg = ({ incriment }) => {
  return (
    <svg
      onClick={incriment}
      width="9"
      height="9"
      viewBox="0 0 9 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.552 4.768H5.144V8.224H3.784V4.768H0.392V3.536H3.784V0.0639992H5.144V3.536H8.552V4.768Z"
        fill="white"
      />
    </svg>
  );
};

export default PlusSvg;
