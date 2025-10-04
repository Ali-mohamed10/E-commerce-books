import { useRef, memo } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

function Section({ children, className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      ref={ref}
      className={className}
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
      animate={prefersReducedMotion ? undefined : (isInView ? { opacity: 1, y: 0 } : {})}
      transition={prefersReducedMotion ? undefined : { duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}

export default memo(Section);
