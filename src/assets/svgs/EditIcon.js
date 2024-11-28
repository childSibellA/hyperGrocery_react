import React from "react";

const EditIcon = ({ onClick }) => {
  return (
    <svg
      onClick={onClick}
      width="18"
      height="18"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.0495 2.00002L3.2078 9.24168C2.94947 9.51668 2.69947 10.0584 2.64947 10.4334L2.34114 13.1333C2.2328 14.1083 2.9328 14.775 3.89947 14.6084L6.5828 14.15C6.9578 14.0834 7.4828 13.8084 7.74114 13.525L14.5828 6.28335C15.7661 5.03335 16.2995 3.60835 14.4578 1.86668C12.6245 0.141685 11.2328 0.750018 10.0495 2.00002Z"
        stroke="white"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.9082 3.2085C9.08291 4.32587 9.62371 5.35361 10.4457 6.13037C11.2677 6.90713 12.3244 7.38894 13.4499 7.50016"
        stroke="white"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.5 17.3335H16.5"
        stroke="white"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default EditIcon;
