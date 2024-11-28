import React from "react";

const ReferralTreeSvg = ({ suItem, index, item, key }) => {
  return (
    <svg
      key={key}
      className={suItem.type == "nothing" ? "hide" : ""}
      style={{
        width: `calc(${100 / item.documents.length}% + 20px)`,
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="367"
      height="55"
      viewBox="0 0 367 55"
      fill="none"
    >
      <path
        d="M183.5 2V8C183.5 19.0457 174.546 28 163.5 28H128.25H26C14.9543 28 6 36.9543 6 48V53.5"
        stroke="rgba(100, 95, 95, 0.571)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M183.5 2V8C183.5 19.0457 192.454 28 203.5 28H238.75H341C352.046 28 361 36.9543 361 48V53.5"
        stroke="rgba(100, 95, 95, 0.571)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="183.5" cy="4.5" r="4.5" fill="rgba(100, 95, 95, 0.571)" />
      <line
        x1="1"
        y1="54"
        x2="11"
        y2="54"
        stroke="rgba(100, 95, 95, 0.571)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="356"
        y1="54"
        x2="366"
        y2="54"
        stroke="rgba(100, 95, 95, 0.571)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ReferralTreeSvg;
