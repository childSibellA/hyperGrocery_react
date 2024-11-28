import React from "react";

const ActiveSvg = () => (
  <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feFlood result="flood" floodColor="lime" floodOpacity="1"></feFlood>
        <feComposite
          in="flood"
          result="mask"
          in2="SourceGraphic"
          operator="in"
        ></feComposite>
        <feGaussianBlur
          in="mask"
          result="blurred"
          stdDeviation="10"
        ></feGaussianBlur>
        <feMerge>
          <feMergeNode in="blurred"></feMergeNode>
          <feMergeNode in="SourceGraphic"></feMergeNode>
        </feMerge>
      </filter>
    </defs>
    <circle cx="50" cy="50" r="10" fill="lime" filter="url(#neon-glow)" />
  </svg>
);

export default ActiveSvg;
