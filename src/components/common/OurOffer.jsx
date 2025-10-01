"use client";

import { useState, useEffect } from "react";
import { useRef } from "react";

import { Confetti } from "../magicui/confetti";
import { BackgroundLines } from "../ui/background-lines";
import { BorderBeam } from "../magicui/border-beam";
import { TextAnimate } from "../magicui/text-animate";

import { Link } from "react-router-dom";
import Section from "../ui/AnimationSection";

export default function OurOffer() {
  const [timeLeft, setTimeLeft] = useState({});
  const [isExpired, setIsExpired] = useState(false);
  const confettiRef = useRef(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const offerEnd = new Date("January 31, 2027 23:59:59").getTime();
      const difference = offerEnd - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
      } else {
        setIsExpired(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);

    return () => clearInterval(timer);
  }, []);

  if (isExpired) {
    return (
      <section className="py-16 bg-gradient-to-br from-backgrounds to-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-main mb-4">Offer Expired</h2>
          <p className="text-lg text-text">
            This special offer has ended. Stay tuned for future promotions!
          </p>
        </div>
      </section>
    );
  }

  return (
    <BackgroundLines className="bg-gradient-to-br from-backgrounds to-card relative py-16 overflow-x-hidden">
      {/* Background Confetti */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-main text-white text-sm font-semibold rounded-full mb-4 animate-pulse">
              LIMITED TIME OFFER
            </span>
            <h2>
              <TextAnimate
                animation="blurInUp"
                by="word"
                className={`text-3xl md:text-6xl font-bold mb-4`}
              >
                Special Book Sale
              </TextAnimate>
            </h2>
            <p className="text-base md:text-xl text-text max-w-2xl mx-auto">
              Get any book in our collection for just $20! Don't miss this
              incredible opportunity to expand your library.
            </p>
          </div>
          {/* Price Display */}
          <Section>
            <div className="mb-12">
              <div className="relative inline-flex items-center justify-center bg-whites dark:bg-card rounded-2xl p-8 shadow-2xl">
                <div className="text-center">
                  <p className="text-lg text-text mb-2">Regular Price</p>
                  <p className="text-2xl text-text line-through mb-2 opacity-60">
                    $49.99
                  </p>
                  <div className="text-5xl md:text-6xl font-bold text-main">
                    $20
                  </div>
                  <p className="text-lg text-second font-semibold mt-2">
                    60% OFF
                  </p>
                </div>
                <BorderBeam
                  duration={6}
                  size={400}
                  className="from-transparent via-main to-transparent"
                />
                <BorderBeam
                  duration={6}
                  delay={3}
                  size={400}
                  borderWidth={2}
                  className="from-transparent via-blue-500 to-transparent"
                />
              </div>
            </div>
          </Section>
          {/* Countdown Timer */}
          <Section>
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-text mb-6">
                Offer Ends In:
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div
                    key={unit}
                    className="bg-whites dark:bg-card rounded-xl p-2 shadow-lg border border-button-border"
                  >
                    <div className="text-2xl md:text-4xl font-bold text-main mb-2">
                      {value.toString().padStart(2, "0")}
                    </div>
                    <div className="text-sm font-medium text-text uppercase tracking-wide">
                      {unit}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>
          {/* CTA Buttons */}
          <Section>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/categories">
                <button className="cursor-pointer bg-gradient-to-r from-main to-card hover:from-main hover:to-main text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  Shop Now - $20 Only
                </button>
              </Link>
              <Link to="/categories">
                <button className="cursor-pointer border-2 border-main text-main hover:bg-main hover:text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300">
                  Browse Collection
                </button>
              </Link>
            </div>
          </Section>
        </div>

        {/* Features */}
        <Section>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-whites dark:bg-card rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-text mb-2">
                Free Shipping
              </h4>
              <p className="text-text opacity-80">On all orders over $50</p>
            </div>

            <div className="text-center p-6 bg-whites dark:bg-card rounded-xl shadow-lg">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-blue-600/10">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-text mb-2">
                Limited Time
              </h4>
              <p className="text-text opacity-80">
                Offer valid until Jan 31, 2027
              </p>
            </div>

            <div className="text-center p-6 bg-whites dark:bg-card rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-text mb-2">
                Quality Guarantee
              </h4>
              <p className="text-text opacity-80">
                100% satisfaction guaranteed
              </p>
            </div>
          </div>
        </Section>
      </div>
      <Confetti
        ref={confettiRef}
        className="absolute left-0 top-0 z-0 size-full"
        onMouseEnter={() => {
          confettiRef.current?.fire({});
        }}
      />
    </BackgroundLines>
  );
}
