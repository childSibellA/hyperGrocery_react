import React from "react";

const CheckSvg = ({ styles, classNmae }) => {
  return (
    <svg
      className={classNmae}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 48 48"
      style={styles}
    >
      <path
        d="M17.6 31.2L9.8 23.4L6.4 26.8L17.6 38L41.6 14L38.2 10.6L17.6 31.2Z"
        fill="green"
      />
    </svg>
  );
};

export default CheckSvg;
