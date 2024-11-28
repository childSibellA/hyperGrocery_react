import React from "react";

const DuplicateSvg = ({ onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25px"
      height="25px"
      viewBox="0 0 21 21"
      onClick={onClick}
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(2 2)"
      >
        <path d="m16.5 10.5v-8c0-1.1045695-.8954305-2-2-2h-8c-1.1045695 0-2 .8954305-2 2v8c0 1.1045695.8954305 2 2 2h8c1.1045695 0 2-.8954305 2-2z" />
        <path d="m4.5 4.50345827h-2c-1.1045695 0-2 .8954305-2 2v7.99654173c0 1.1045695.8954305 2 2 2h.00345528l8.00000002-.0138241c1.1032187-.001906 1.9965447-.8967767 1.9965447-1.9999971v-1.9827205" />
        <path d="m10.5 3.5v6" />
        <path d="m10.5 3.5v6" transform="matrix(0 1 -1 0 17 -4)" />
      </g>
    </svg>
  );
};

export default DuplicateSvg;
