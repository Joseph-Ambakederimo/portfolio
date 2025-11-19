"use client"

import React from "react";
import { useRef } from "react";
// import { AnimatedTextLines } from "@/components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";


const AnimatedHeader = ({
  subTitle,
  title,
//   text,
  textColor,
  withScrollTrigger = false,
}) => {
  const contextRef = useRef(null);
  const headerRef = useRef(null);
  const letterRefs = useRef([]);
  const titleLetters = Array.from(title);
  
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: withScrollTrigger
        ? {
            trigger: contextRef.current,
          }
        : undefined,
    });
    tl.from(contextRef.current, {
      y: "50vh",
      duration: 1,
      ease: "circ.out",
    });
    tl.from(
      headerRef.current,
      {
        opacity: 0,
        y: "100",
        duration: 1,
        ease: "circ.out",
      },
      "<+0.2"
    );
    // Animate each letter with stagger
    if (letterRefs.current.length > 0) {
      tl.from(
        letterRefs.current,
        {
          opacity: 0,
          y: 40,
          duration: 0.5,
          stagger: 0.04,
          ease: "power3.out",
        },
        "<+0.2"
      );
    }
  }, [title]);
  return (
    <div ref={contextRef}>
      <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
        <div
          ref={headerRef}
          className="flex flex-col justify-center gap-12 pt-16 sm:gap-16"
        >
          <p
            className={`text-sm font-light tracking-[0.5rem] uppercase px-10 ${textColor}`}
          >
            {subTitle}
          </p>
          <div className="px-10">
            <h1
              className={`flex flex-col gap-12 uppercase banner-text-responsive sm:gap-16 md:block ${textColor}`}
            >
              {titleLetters.map((char, index) => (
                <span
                  key={index}
                  ref={el => (letterRefs.current[index] = el)}
                  style={{ display: "inline-block", marginRight: char === ' ' ? '0.5em' : undefined }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h1>
          </div>
        </div>
      </div>
      <div className={`relative px-10 ${textColor}`}>
        <div className="absolute inset-x-0 " />
        <div className="py-12 sm:py-16 text-end">
          
        </div>
      </div>
    </div>
  );
};

export default AnimatedHeader;
