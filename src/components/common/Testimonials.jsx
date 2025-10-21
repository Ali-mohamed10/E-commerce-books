import { AnimatedTestimonials } from "../ui/animated-testimonials";
import { lazy, Suspense, useEffect, useState } from "react";
import { TextAnimate } from "../magicui/text-animate";
import photo1 from "../../assets/imgs/photo1.webp";
import photo2 from "../../assets/imgs/photo2.webp";
import photo3 from "../../assets/imgs/photo3.webp";
import photo4 from "../../assets/imgs/photo4.webp";
import photo5 from "../../assets/imgs/photo5.webp";

const LightRays = lazy(() => import("../LightRays/LightRays"));

export default function Testimonials() {
  const [enableFX, setEnableFX] = useState(false);
  useEffect(() => {
    const noReduce = typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = typeof window !== "undefined" && window.matchMedia("(min-width: 640px)").matches;
    setEnableFX(noReduce && isDesktop);
  }, []);
  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sarah Chen",
      designation: "Product Manager at TechFlow",
      src: photo1,
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: photo2,
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Emily Watson",
      designation: "Operations Director at CloudScale",
      src: photo3,
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src: photo4,
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      src: photo5,
    },
  ];
  return (
    <div className="relative py-16 bg-gradient-to-br from-button-border/30 via-button-border/30 to-whites sm:bg-none">
      {enableFX && (
        <div className="absolute inset-0 -z-10">
          <Suspense fallback={null}>
            <LightRays
              raysOrigin="top-center"
              raysColor="#ddd"
              raysSpeed={1.5}
              lightSpread={0.8}
              rayLength={1.2}
              followMouse={true}
              mouseInfluence={0.1}
              noiseAmount={0.1}
              distortion={0.05}
              className="w-full h-full hidden sm:block"
            />
          </Suspense>
        </div>
      )}
      <h2>
        <TextAnimate
          animation="blurInUp"
          by="word"
          className={`text-3xl md:text-6xl font-bold mb-10 text-center`}
        >
          Our Testimonials
        </TextAnimate>
      </h2>
      <AnimatedTestimonials testimonials={testimonials} />
    </div>
  );
}
