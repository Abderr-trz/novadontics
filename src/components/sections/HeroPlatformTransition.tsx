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

      // The dashboard scales down first; related product windows are driven
      // by the exact scroll progress instead of delayed nested tweens.
      // This makes the final four-window state deterministic (including
      // when navigating directly to #platform or reversing the scroll).
      const range = () => "+=" + Math.max(520, Math.round(window.innerHeight * 1.05));

      gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stage,
          start: "top top+=72",
          end: range,
          scrub: 0.65,
          invalidateOnRefresh: true,
        },
      })
        .fromTo(
          ".platform-main-window",
          { autoAlpha: 1, y: 52, scale: 1.27 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.92, ease: "power2.inOut" },
          0,
        )
        .to({}, { duration: 0.25 }, 0.92);

      const satellites = [
        { node: sticky.querySelector<HTMLElement>(".platform-patient"), at: 0.18, x: 45, y: 98 },
        { node: sticky.querySelector<HTMLElement>(".platform-clinical"), at: 0.29, x: 64, y: 113 },
        { node: sticky.querySelector<HTMLElement>(".platform-implant"), at: 0.39, x: -64, y: 105 },
      ];

      const updateSatellites = (progress: number) => {
        satellites.forEach(({ node, at, x, y }) => {
          if (!node) return;
          const raw = gsap.utils.clamp(0, 1, (progress - at) / 0.34);
          const reveal = raw * raw * (3 - 2 * raw);
          gsap.set(node, {
            opacity: reveal,
            visibility: raw < 0.005 ? "hidden" : "visible",
            x: x * (1 - reveal),
            y: y * (1 - reveal),
            scale: 0.88 + reveal * 0.12,
          });
        });
      };

      const revealTrigger = ScrollTrigger.create({
        trigger: stage,
        start: "top top+=72",
        end: range,
        invalidateOnRefresh: true,
        onUpdate: (self) => updateSatellites(self.progress),
        onRefresh: (self) => updateSatellites(self.progress),
      });
      updateSatellites(revealTrigger.progress);
      return () => revealTrigger.kill();
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
