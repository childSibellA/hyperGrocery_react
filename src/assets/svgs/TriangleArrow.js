import React from "react";

const TriangleArrow = ({ className, ...props }) => {
  return (
    <svg
      width="14"
      height="15"
      viewBox="0 0 14 15"
      fill="#FFFFFF"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path d="M9.86334 7.71133L8.48717 6.33516L7.6469 5.4906C7.47569 5.31965 7.24363 5.22363 7.00169 5.22363C6.75974 5.22363 6.52769 5.31965 6.35648 5.4906L4.13575 7.71133C3.84423 8.00285 4.0543 8.50016 4.46157 8.50016H9.53752C9.94908 8.50016 10.1549 8.00285 9.86334 7.71133Z" />
    </svg>
  );
};

export default TriangleArrow;
