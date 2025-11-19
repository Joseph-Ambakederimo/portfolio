"use client"

import "./stickyCards.css";

import {  useRef } from "react";
import Image from "next/image";

import gsap from "gsap";
import AnimatedHeaderSection from "@/components/AnimatedHeaderSection";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);



const StickyCards = () => {
      const text = `I build secure, high-performance full-stack apps
    with smooth UX to drive growth 
    not headaches.`;
     const stickyCardsData = [
    {  
    
      index: "01",
      imageSrc: '/img/3.png',
      imageAlt: 'The Algorithm',
      title: <> Algorithm</>,
      text: "The algorithm's workings are shrouded in complexity, and its decision-making processes are inscrutable to the general populace.",
      description: "Hi",
    },
    {

      index: "02",
      imageSrc: '/img/2.png',
      imageAlt: 'The Dogma',
      title: <>Dogma</>,
      text: "The digital gospel etched into the very code of the algorithmic society, served as the bedrock of the cognitive regime.",
    },
    {
      index: "03",
      imageSrc: '/img/1.png',
      imageAlt: 'The Architects',
      title: <>Architects</>,
      text: "The elusive entities, lacking human form, operate in the shadows, skillfully shaping societal norms through the complex interplay of algorithms and Dogmas.",
    },
    {
      index: "04",
      imageSrc: '/img/4.png',
      imageAlt: 'The Wasteland',
      title: <>Wasteland</>,
      text: "This overlooked realm, a consequence of algorithmic judgments, is a haunting landscape filled with the echoes of untold stories and uncharted thoughts.",
    },
    {
      index: "05",
      imageSrc: '/img/4.png',
      imageAlt: 'thre Wast',
      title: <>Wasteland</>,
      text: "This overlooked realm, a consequence of algorithmic judgments, is a haunting landscape filled with the echoes of untold stories and uncharted thoughts.",
    },
    {
      index: "06",
      imageSrc: '/img/4.png',
      imageAlt: 'The Was',
      title: <>Wasteland</>,
      text: "This overlooked realm, a consequence of algorithmic judgments, is a haunting landscape filled with the echoes of untold stories and uncharted thoughts.",
    },
    // {
    //   bgClass: 'bg-5',
    //   imageSrc: '/img/5.png',
    //   imageAlt: 'The Narrative',
    //   title: <><i>The</i> Narrative</>,
    //   text: '"The Narrative" unfolds as the omnipresent thread weaving through the fabric of the algorithmic society.',
    // },
    // {
    //   bgClass: 'bg-6',
    //   imageSrc: '/img/6.png',
    //   imageAlt: 'The Opulence',
    //   title: <><i>The</i> Opulence</>,
    //   text: '"The Opulence" epitomizes the cognitive elite\'s wealth in the algorithmic society, where opulent thoughts and experiences shape the societal narrative.',
    // },
  ];
  const container = useRef(null);

  useGSAP(() => {
    const stickyCards = document.querySelectorAll(".sticky-card");

    stickyCards.forEach((card, index) => {
        if (index < stickyCards.length - 1) {
            ScrollTrigger.create({
                trigger: card,
                start: "top top",
                endTrigger: stickyCards[stickyCards.length - 1],
                end: " top top",
                pin: true,
                pinSpacing: false,
            });
        }

        if (index  < stickyCards.length -1 ) {
            ScrollTrigger.create({
                trigger: stickyCards[index + 1],
                start: "top bottom",
                end: "top top",
                onUpdate: (self) => {
                    const progress = self.progress;
                    const scale = 1 - progress * 0.25;
                    // const rotation = (index % 2 === 0 ? 5 : -5) * progress;
                    const afterOpacity = progress;

                    gsap.set(card, {
                        scale: scale,
                        // rotation: rotation,
                        "--after-opacity": afterOpacity,
                    })
                }
            })
        }
    })

  }, {scope: container});

    return (
        <div className="sticky-cards" ref={container}>
                  <AnimatedHeaderSection
                    subTitle={"Selected Projects"}
                    title={"Projects"}
                    text={text}
                    textColor={"text-black text-3xl"}
                    withScrollTrigger={true}
                  />
            {stickyCardsData.map((cardData, index) => (
                <div className="sticky-card" key={index}>
                    <div className="sticky-card-index">
                        <h4>{cardData.index}</h4>
                    </div>
                    <div className="sticky-card-content">
                        <div className="sticky-card-content-wrapper">
                            <h4 className="sticky-card-header">{cardData.title}</h4>
                            <div className="sticky-card-img">
                                <Image 
                                    src={cardData.imageSrc} 
                                    alt={cardData.imageAlt || ""} 
                                    width={800}
                                    height={600}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="sticky-card-copy">
                                <div className="sticky-card-copy-title">
                                    <p>(About the state)</p>
                                    <div className="sticky-card-copy-description">
                                        <p>{cardData.text}</p>
                                        {/* <p>{cardData.description}</p> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    );
}

export default StickyCards