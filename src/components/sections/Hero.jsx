"use client"

// import AnimatedHeader from "@/components/AnimatedHeader";
import AnimatedHeaderSection from "../AnimatedHeaderSection";



const Hero = () => {

  const text = "i build full-stack solutions that solve real problems and ship fast.";
  // const text = "Welcome to my portfolio! Explore my projects and skills.";

  return (
    <section id="home" className="relative bg-white min-h-[80vh]">
      <AnimatedHeaderSection
        subTitle={"full-stack dev"}
        title={"Joseph"}
        text={text}
        textColor={"text-black"}
      />
      {/* <AnimatedHeader
        subTitle={"Full-Stack Developer"}
        // subTitle={"404 No Bugs Found"}
        title={"Joseph"}
        text={text}
        textColor={"text-black"}
      /> */}
     
    </section>
  );
};

export default Hero;


// "use client";

// import { useLayoutEffect, useRef } from "react";
// import { gsap } from "gsap";
// import AnimatedHeader from "@/components/AnimatedHeader";

// const Hero = () => {
//   const heroRef = useRef(null);

//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       // Initial state
//       gsap.set(heroRef.current, {
//         width: "0vw",
//         height: "0vh",
//         opacity: 0
//       });

//       // Animation sequence
//       gsap.to(heroRef.current, {
//         width: "25vw",
//         height: "50vh",
//         opacity: 1,
//         duration: 1,
//         ease: "power2.out",
//         onComplete: () => {
//           // Second part of animation
//           gsap.to(heroRef.current, {
//             width: "100vw",
//             height: "100vh",
//             duration: 1.5,
//             ease: "power2.inOut",
//             delay: 0.2
//           });
//         }
//       });
//     });

//     return () => ctx.revert(); // Cleanup
//   }, []);

//   return (
//     <section 
//       ref={heroRef}
//       id="home" 
//       className="flex bg-white flex-col justify-end min-h-screen overflow-hidden mx-auto"
//     >
//       <AnimatedHeader
//         title={"Joseph"}
//         textColor={"text-black"}
//       />
//     </section>
//   );
// };

// export default Hero;