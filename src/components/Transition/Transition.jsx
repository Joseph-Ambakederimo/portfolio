"use client";

import "./Transition.css"

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";

const Transition = ({ children }) => {
  const pathName = usePathname();
  const router = useRouter();
  const overlayRef = useRef(null);
  const logoOverlayRef = useRef(null);
  const logoRef = useRef(null);
  const blockRef = useRef([]);
  const isTransitioning = useRef(false);

  useEffect(() => {
    const createBlocks = () => {
      if (!overlayRef.current) return;
      overlayRef.current.innerHTML = "";
      blockRef.current = [];

      for (let i = 0; i < 20; i++) {
        const block = document.createElement("div");
        block.className = "block";
        overlayRef.current.appendChild(block);
        blockRef.current.push(block);
      }
    };

    const revealPage = () => {
      if (blockRef.current.length === 0) return;
      
      const tl = gsap.timeline();
      
      // Animate blocks revealing the page
      tl.to(blockRef.current, {
        scaleX: 0,
        duration: 0.8,
        stagger: 0.02,
        ease: "power2.inOut",
        transformOrigin: "right",
      });
      
      // Show logo overlay briefly
      if (logoOverlayRef.current) {
        tl.set(logoOverlayRef.current, { opacity: 1 }, 0);
        tl.to(logoOverlayRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        }, 0.3);
      }
    };

    const coverPage = (url) => {
      if (blockRef.current.length === 0) return;
      
      const tl = gsap.timeline({
        onComplete: () => {
          router.push(url);
          // Reset blocks after navigation
          gsap.set(blockRef.current, { scaleX: 0, transformOrigin: "left" });
          isTransitioning.current = false;
          // Reveal new page
          setTimeout(() => {
            revealPage();
          }, 100);
        },
      });
      
      // Show logo overlay
      if (logoOverlayRef.current) {
        tl.set(logoOverlayRef.current, { opacity: 1 }, 0);
      }
      
      // Animate blocks covering the page
      tl.to(blockRef.current, {
        scaleX: 1,
        duration: 0.8,
        stagger: 0.02,
        ease: "power2.inOut",
        transformOrigin: "left",
      });
    };

    createBlocks();

    gsap.set(blockRef.current, { scaleX: 0, transformOrigin: "left" });

    if (logoRef.current) {
      const path = logoRef.current.querySelector("path");
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          fill: "transparent",
        });
      }
    }

    revealPage();

    const handleRouteChange = (url) => {
      if (isTransitioning.current) return;
      isTransitioning.current = true;
      coverPage(url);
    };

    const handleLinkClick = (e) => {
      e.preventDefault();
      const href = e.currentTarget.href;
      const url = new URL(href).pathname;
      if (url !== pathName) {
        handleRouteChange(url);
      }
    };

    const links = document.querySelectorAll('a[href^="/"]');
    links.forEach((link) => {
      link.addEventListener("click", handleLinkClick);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleLinkClick);
      });
    };
  }, [router, pathName]);

  return (
    <>
      <div className="transition-overlay" ref={overlayRef}></div>
      <div className="logo-overlay" ref={logoOverlayRef}>
        <div className="logo-container" ref={logoRef}>
          {/* Add your logo SVG here if needed */}
        </div>
      </div>
      {children}
    </>
  );
};

export default Transition;