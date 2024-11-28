import React, { useEffect, useState } from "react";

const UserProfileSvg = () => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C9.243 2 7 4.243 7 7C7 9.757 9.243 12 12 12C14.757 12 17 9.757 17 7C17 4.243 14.757 2 12 2ZM12 4C13.654 4 15 5.346 15 7C15 8.654 13.654 10 12 10C10.346 10 9 8.654 9 7C9 5.346 10.346 4 12 4Z"
        fill={"#eeeeee"}
      />
      <path
        d="M4 22V19C4 16.243 6.243 14 9 14H15C17.757 14 20 16.243 20 19V22H18V19C18 17.346 16.654 16 15 16H9C7.346 16 6 17.346 6 19V22H4Z"
        fill={"#eeeeee"}
      />
    </svg>
  );
};

export default UserProfileSvg;
