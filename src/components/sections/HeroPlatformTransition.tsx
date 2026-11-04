"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hero } from "./Hero";
import { ConnectedPlatform } from "./ConnectedPlatform";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * The hero and collage share one scroll timeline and one background.
 * Individual sections no longer compete with separate ScrollTriggers.
 * No scroll-jacking or pinning: the content moves with native scrolling.
 */
export function HeroPlatformTransition() {
  const wrapper = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const hero = wrapper.current?.querySelector<HTMLElement>(".hero-centered");
      if (!hero) return;

      gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top+=120",
          scrub: 0.75,
          invalidateOnRefresh: true,
        },
      })
        // First soften the hero copy, then let the product take over the viewport.
        .to(".hero-fade-group", {
          autoAlpha: 0,
          y: -54,
          scale: 0.985,
          duration: 0.60,
        }, 0.06)
        .fromTo(".platform-showcase-heading",
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.46 },
          0.24)
        .fromTo(".platform-main-window",
          { autoAlpha: 0, y: 150, scale: 0.93 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.74 },
          0.40)
        .fromTo(".platform-patient",
          { autoAlpha: 0, x: 50, y: 150, scale: 0.88 },
          { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: 0.64 },
          0.52)
        .fromTo(".platform-clinical",
          { autoAlpha: 0, x: 55, y: 160, scale: 0.88 },
          { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: 0.64 },
          0.60)
        .fromTo(".platform-implant",
          { autoAlpha: 0, x: -55, y: 145, scale: 0.88 },
          { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: 0.64 },
          0.68);
    });

    // On phones, keep the product accessible and the scroll short.
    mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
      const hero = wrapper.current?.querySelector<HTMLElement>(".hero-centered");
      if (!hero) return;

      gsap.to(".hero-fade-group", {
        autoAlpha: 0,
        y: -24,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top+=120",
          scrub: 0.65,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => mm.revert();
  }, { scope: wrapper });

  return (
    <div ref={wrapper} className="hero-platform-transition">
      <Hero />
      <ConnectedPlatform />
    </div>
  );
}
