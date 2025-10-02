"use client";

import React, { useEffect, useRef, ReactNode } from "react";
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
  const containerRef = useRef(null);
  const isInViewRef = useRef(false);

  useEffect(() => {
    injectGlobalStyles();

    const updateAnimation = () => {
      const isSmallScreen = window.innerWidth < 640; // sm breakpoint
      if (containerRef.current) {
        const elements = containerRef.current.querySelectorAll('[data-animated]');
        elements.forEach(el => {
          if (isSmallScreen) {
            el.style.animation = 'none';
          } else {
            el.style.animation = isInViewRef.current 
              ? 'move-gradient 6s ease-in-out infinite' 
              : '';
            el.style.animationPlayState = isInViewRef.current ? 'running' : 'paused';
          }
        });
      }
    };

    // Pause animation when not in view to save performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
        updateAnimation();
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Listen for window resize to handle screen size changes
    window.addEventListener('resize', updateAnimation);
    updateAnimation(); // Initial check

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateAnimation);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative group ${className}`}>
      <div
        data-animated
        className="absolute -inset-2 bg-backgrounds sm:bg-gradient-to-r sm:from-main sm:via-background sm:to-main rounded-xl opacity-60 group-hover:opacity-80 transition duration-1000 group-hover:duration-200 will-change-transform"
        style={{
          backgroundSize: "200% 200%",
          animation: "move-gradient 6s ease-in-out infinite",
        }}
      ></div>
      <div
        data-animated
        className="relative rounded-xl bg-gradient-to-r from-main via-background to-main p-0.5 transition-all duration-500 will-change-transform"
        style={{
          backgroundSize: "200% 200%",
          animation: "move-gradient 6s ease-in-out infinite",
        }}
      >
        {children}
      </div>
    </div>
  );
};
export default Gradient;
