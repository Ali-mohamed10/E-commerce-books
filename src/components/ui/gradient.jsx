"use client";

import React, { useEffect, ReactNode } from "react";
let stylesInjected = false;
const injectGlobalStyles = () => {
  if (stylesInjected) return;
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes move-gradient {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
  `;
  document.head.appendChild(style);
  stylesInjected = true;
};
const Gradient = ({ children, className = "" }) => {
  useEffect(() => {
    injectGlobalStyles();
  }, []);
  return (
    <div className={`relative group ${className}`}>
      <div
        className="absolute -inset-2 bg-gradient-to-r from-main via-background to-main rounded-xl blur-2xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
        style={{
          backgroundSize: "200% 200%",
          animation: "move-gradient 4s ease-in-out infinite",
        }}
      ></div>
      <div
        className="relative rounded-xl bg-gradient-to-r from-main via-background to-main p-0.5 transition-all duration-500"
        style={{
          backgroundSize: "200% 200%",
          animation: "move-gradient 4s ease-in-out infinite",
        }}
      >
        {children}
      </div>
    </div>
  );
};
export default Gradient;
