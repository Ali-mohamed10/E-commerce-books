"use client";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";

import { useEffect, useState } from "react";

export const AnimatedTestimonials = ({ testimonials, autoplay = false }) => {
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(!!mql.matches);
    update();
    mql.addEventListener?.("change", update);
    return () => mql.removeEventListener?.("change", update);
  }, []);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => {
    return index === active;
  };

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  const buildUrlWithWidth = (url, width) => {
    if (!url) return url;
    if (url.includes("w=")) {
      return url.replace(/([?&])w=\d+/i, `$1w=${width}`);
    }
    const hasQuery = url.includes("?");
    return `${url}${hasQuery ? "&" : "?"}w=${width}`;
  };

  const buildSrcSet = (url) => {
    const widths = [320, 640, 960, 1280];
    return widths.map((w) => `${buildUrlWithWidth(url, w)} ${w}w`).join(", ");
  };
  return (
    <div className="container mx-auto text-center md:text-left px-10">
      <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
        <div className="">
          <div className="relative h-80 w-1/2 md:w-full mx-auto">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: reduced ? 1 : 0,
                    scale: reduced ? 1 : 0.98,
                    z: reduced ? 0 : -80,
                    rotate: reduced ? 0 : randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : (reduced ? 1 : 0.75),
                    scale: isActive(index) ? 1 : (reduced ? 1 : 0.97),
                    z: isActive(index) ? 0 : (reduced ? 0 : -80),
                    rotate: isActive(index) ? 0 : (reduced ? 0 : randomRotateY()),
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                    y: reduced ? 0 : (isActive(index) ? [0, -60, 0] : 0),
                  }}
                  exit={{
                    opacity: reduced ? 1 : 0,
                    scale: reduced ? 1 : 0.98,
                    z: reduced ? 0 : 80,
                    rotate: reduced ? 0 : randomRotateY(),
                  }}
                  transition={{
                    duration: reduced ? 0.001 : 0.25,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={buildUrlWithWidth(testimonial.src, 640)}
                    srcSet={buildSrcSet(testimonial.src)}
                    sizes="(min-width: 1024px) 600px, (min-width: 768px) 500px, 90vw"
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col justify-between py-4">
          <motion.div
            key={active}
            initial={{
              y: reduced ? 0 : 16,
              opacity: reduced ? 1 : 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: reduced ? 0 : -12,
              opacity: reduced ? 1 : 0,
            }}
            transition={{
              duration: reduced ? 0.001 : 0.18,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-2xl font-bold text-black dark:text-white">
              {testimonials[active].name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-neutral-500">
              {testimonials[active].designation}
            </p>
            <motion.p className="mt-8 text-base md:text-lg text-gray-500 dark:text-neutral-300">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: reduced ? "blur(0px)" : "blur(10px)",
                    opacity: reduced ? 1 : 0,
                    y: reduced ? 0 : 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: reduced ? 0.001 : 0.16,
                    ease: "easeInOut",
                    delay: reduced ? 0 : 0.015 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex gap-4 pt-12 md:pt-0 mx-auto md:mx-0">
            <button
              onClick={handlePrev}
              className="group/button cursor-pointer flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
            >
              <IconArrowLeft className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" />
            </button>
            <button
              onClick={handleNext}
              className="group/button cursor-pointer flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
            >
              <IconArrowRight className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
