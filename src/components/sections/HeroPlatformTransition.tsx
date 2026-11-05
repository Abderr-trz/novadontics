"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hero } from "./Hero";
import { ConnectedPlatform } from "./ConnectedPlatform";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Editorial hero and authentic product screens share a single visual narrative.
 * Desktop animation uses a native CSS-sticky stage; GSAP ONLY scrubs:
 *  1. big, prominent main interface shrinks naturally into its final position;
 *  2. three supporting windows enter with deliberate spatial staggering.
 *
 * Never pin with JS or intercept mouse wheel. The stage's CSS scroll height
 * establishes the real native-scrolling distance.
 */
export function HeroPlatformTransition() {
  const wrapper = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1180px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)", () => {
      const hero = wrapper.current?.querySelector<HTMLElement>(".hero-centered");
      const stage = wrapper.current?.querySelector<HTMLElement>(".platform-stage");
      const sticky = wrapper.current?.querySelector<HTMLElement>(".platform-stage-sticky");
      if (!hero || !stage || !sticky) return;

      // The hero headline recedes gracefully as the product takes over.
      gsap.to(".hero-fade-group", {
        autoAlpha: 0,
        y: -46,
        scale: 0.988,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top+=76",
          end: "bottom top+=225",
          scrub: 0.65,
          invalidateOnRefresh: true,
        },
      });

      // Match the two reference states: hero product LARGE first; then the
      // large window scales down and the other three come in around it.
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stage,
          start: "top top+=72",
          end: () => "+=" + Math.max(500, Math.round(window.innerHeight * 0.99)),
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        ".platform-main-window",
        { autoAlpha: 1, y: 52, scale: 1.27 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 1.15, ease: "power2.inOut" },
        0,
      )
        .fromTo(
          ".platform-patient",
          { autoAlpha: 0, y: 102, x: 43, scale: 0.87 },
          { autoAlpha: 1, y: 0, x: 0, scale: 1, duration: 0.67, ease: "power2.out" },
          0.57,
        )
        .fromTo(
          ".platform-clinical",
          { autoAlpha: 0, y: 112, x: 67, scale: 0.86 },
          { autoAlpha: 1, y: 0, x: 0, scale: 1, duration: 0.67, ease: "power2.out" },
          0.72,
        )
        .fromTo(
          ".platform-implant",
          { autoAlpha: 0, y: 100, x: -65, scale: 0.87 },
          { autoAlpha: 1, y: 0, x: 0, scale: 1, duration: 0.67, ease: "power2.out" },
          0.85,
        )
        .to({}, { duration: 0.22 }, 1.52);
    });

    // Tablet: do not force a desktop overlap on a three-column product grid.
    mm.add("(min-width: 768px) and (max-width: 1179px) and (prefers-reduced-motion: no-preference)", () => {
      const hero = wrapper.current?.querySelector<HTMLElement>(".hero-centered");
      if (!hero) return;
      gsap.to(".hero-fade-group", {
        autoAlpha: 0,
        y: -34,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top+=125",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    });

    // Mobile: preserve the clear one-column product gallery and native scroll.
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
