import React from "react";

const EditSvg = ({ editHandler, type }) => {
  return (
    <svg
      onClick={editHandler}
      style={{
        top: type === "lable-input-select" || type === "number" ? "8px" : "50%",
      }}
      className={`input-group-icon-sc `}
      width="18"
      height="16"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#3e54ac"
      fill="#3e54ac"
    >
      <path d="M497.9 74.16l-60.09-60.1c-18.75-18.75-49.19-18.75-67.93 0L313.4 70.61l127.1 128l56.56-56.55C516.7 123.3 516.7 92.91 497.9 74.16zM31.04 352.1c-2.234 2.234-3.756 5.078-4.377 8.176l-26.34 131.7C-1.703 502.1 6.156 512 15.95 512c1.049 0 2.117-.1035 3.199-.3203l131.7-26.34c3.098-.6191 5.941-2.141 8.176-4.373l259.7-259.7l-128-128L31.04 352.1zM131.9 440.2l-75.14 15.03l15.03-75.15L96 355.9V416h60.12L131.9 440.2z" />
    </svg>
  );
};

export default EditSvg;
