import React from "react";

type VektorMarkProps = {
  className?: string;
};

export const VektorMark: React.FC<VektorMarkProps> = ({ className }) => (
  <svg
    width="18"
    height="22"
    viewBox="0 0 18 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={className}
  >
    <path d="M0 0 L6 0 L9 22 L3 22 Z" fill="white" fillOpacity="0.92" />
    <path d="M12 0 L18 0 L15 22 L9 22 Z" fill="white" fillOpacity="0.92" />
  </svg>
);
