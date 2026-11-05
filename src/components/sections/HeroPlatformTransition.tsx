"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hero } from "./Hero";
import { ConnectedPlatform } from "./ConnectedPlatform";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * One continuous Attio-inspired hero:
 * enlarged genuine Novadontics dashboard -> controlled zoom out ->
 * the three real supporting interfaces progressively join the composition.
 *
 * Use native scroll, no scroll-jacking or JS pin. The sticky stage is
 * dimensioned with CSS so the sequence works at ordinary laptop heights.
 */
export function HeroPlatformTransition() {
  const wrapper = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();

    media.add(
      "(min-width: 1100px) and (min-height: 580px) and (prefers-reduced-motion: no-preference)",
      () => {
        const hero = wrapper.current?.querySelector<HTMLElement>(".hero-centered");
        const stage = wrapper.current?.querySelector<HTMLElement>(".platform-stage");
        const sticky = wrapper.current?.querySelector<HTMLElement>(".platform-stage-sticky");
        const main = sticky?.querySelector<HTMLElement>(".platform-main-window");
        if (!hero || !stage || !sticky || !main) return;

        const satellites = [
          { element: sticky.querySelector<HTMLElement>(".platform-patient"), start: .16, x: 45, y: 75 },
          { element: sticky.querySelector<HTMLElement>(".platform-clinical"), start: .28, x: 56, y: 80 },
          { element: sticky.querySelector<HTMLElement>(".platform-implant"), start: .40, x: -55, y: 73 },
        ];

        const smooth = (p: number) => {
          const x = gsap.utils.clamp(0, 1, p);
          return x * x * (3 - 2 * x);
        };
        const render = (progress: number) => {
          const zoom = smooth(progress / .75);
          gsap.set(main, {
            autoAlpha: 1,
            scale: 1.24 - .24 * zoom,
            y: 36 * (1 - zoom),
          });

          satellites.forEach(({ element, start, x, y }) => {
            if (!element) return;
            const visible = smooth((progress - start) / .36);
            gsap.set(element, {
              autoAlpha: visible <= .002 ? 0 : visible,
              scale: .92 + .08 * visible,
              x: x * (1 - visible),
              y: y * (1 - visible),
            });
          });
        };

        const sceneTrigger = ScrollTrigger.create({
          trigger: stage,
          start: "top top+=72",
          end: () => "+=" + Math.max(425, Math.round(window.innerHeight * .82)),
          invalidateOnRefresh: true,
          onUpdate: self => render(self.progress),
          onRefresh: self => render(self.progress),
        });
        render(sceneTrigger.progress);

        const textTween = gsap.to(".hero-fade-group", {
          autoAlpha: 0,
          y: -28,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top+=72",
            end: "bottom top+=120",
            scrub: .5,
            invalidateOnRefresh: true,
          },
        });

        // ScrollTrigger is scoped to the component and reverted on breakpoints.
        return () => {
          sceneTrigger.kill();
          textTween.scrollTrigger?.kill();
          textTween.kill();
        };
      },
    );

    media.add(
      "(min-width: 768px) and (max-width: 1099px) and (prefers-reduced-motion: no-preference)",
      () => {
        const hero = wrapper.current?.querySelector<HTMLElement>(".hero-centered");
        if (!hero) return;
        gsap.to(".hero-fade-group", {
          autoAlpha: 0,
          y: -22,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top+=105",
            scrub: .5,
          },
        });
      },
    );

    media.add(
      "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
      () => {
        const hero = wrapper.current?.querySelector<HTMLElement>(".hero-centered");
        if (!hero) return;
        gsap.to(".hero-fade-group", {
          autoAlpha: 0,
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top+=108",
            scrub: .5,
          },
        });
      },
    );

    return () => media.revert();
  }, { scope: wrapper });

  return (
    <div ref={wrapper} className="hero-platform-transition">
      <Hero />
      <ConnectedPlatform />
    </div>
  );
}
