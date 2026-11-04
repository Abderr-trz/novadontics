"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PracticeLogos } from "./TrustProof";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Every image below is an authentic Novadontics asset stored in the project.
const secondaryScreens = [
  {
    kind: "patient",
    label: "Patient engagement",
    src: "/assets/novadontics/patient-engagement.avif",
    alt: "Novadontics patient engagement interface",
    width: 720,
    height: 480,
  },
  {
    kind: "clinical",
    label: "Clinical imaging",
    src: "/assets/novadontics/clinical-imaging.avif",
    alt: "Novadontics clinical imaging interface",
    width: 740,
    height: 500,
  },
  {
    kind: "implant",
    label: "Implant workflows",
    src: "/assets/novadontics/implant-management.avif",
    alt: "Novadontics implant management interface",
    width: 720,
    height: 500,
  },
] as const;

function BrowserChrome() {
  return (
    <span className="platform-window-dots" aria-hidden="true">
      <span /><span /><span />
    </span>
  );
}

export function ConnectedPlatform() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1180px) and (prefers-reduced-motion: no-preference)", () => {
      const stage = root.current?.querySelector(".platform-composition");
      if (!stage) return;

      // Video reference @ 05–07s: four different windows rise from the bottom.
      // This is tied to natural scroll, not to a forced/pinned timeline.
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stage,
          start: "top 96%",
          end: "top 33%",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .fromTo(".platform-main-window",
          { y: 108, scale: .925, autoAlpha: .32 },
          { y: 0, scale: 1, autoAlpha: 1, duration: .85 }, 0)
        .fromTo(".platform-patient",
          { x: 52, y: 125, scale: .86, autoAlpha: 0 },
          { x: 0, y: 0, scale: 1, autoAlpha: 1, duration: .7 }, .17)
        .fromTo(".platform-clinical",
          { x: 62, y: 145, scale: .84, autoAlpha: 0 },
          { x: 0, y: 0, scale: 1, autoAlpha: 1, duration: .7 }, .28)
        .fromTo(".platform-implant",
          { x: -65, y: 130, scale: .85, autoAlpha: 0 },
          { x: 0, y: 0, scale: 1, autoAlpha: 1, duration: .72 }, .36);
    });

    return () => mm.revert();
  }, { scope: root });

  return (
    <section id="platform" ref={root} className="platform-showcase" aria-labelledby="platform-scene-title">
      <h2 id="platform-scene-title" className="sr-only">One connected dental practice in Novadontics</h2>
      <div className="platform-showcase-glow" aria-hidden="true" />
      <div className="platform-showcase-lines" aria-hidden="true" />

      <div className="platform-composition" aria-label="Actual Novadontics practice-management, patient engagement, clinical imaging and implant workflows shown together">
        <figure className="platform-main-window">
          <div className="platform-window-chrome">
            <BrowserChrome />
            <span className="platform-window-heading">Practice management</span>
          </div>
          <div className="platform-main-image">
            <Image
              src="/assets/novadontics/practice-management.avif"
              alt="Actual Novadontics practice management dashboard"
              width={1290}
              height={612}
              sizes="(max-width: 767px) 94vw, (max-width: 1179px) 88vw, 74vw"
              priority
            />
          </div>
          <figcaption className="platform-main-footer">
            <span className="platform-status-dot" /> One connected workspace
          </figcaption>
        </figure>

        {secondaryScreens.map((screen) => (
          <figure className={`platform-floating-window platform-${screen.kind}`} key={screen.kind}>
            <div className="platform-window-chrome"><BrowserChrome /></div>
            <figcaption className="platform-floating-label">{screen.label}</figcaption>
            <div className="platform-floating-image">
              <Image
                src={screen.src}
                alt={screen.alt}
                width={screen.width}
                height={screen.height}
                sizes="(max-width: 767px) 90vw, (max-width: 1179px) 44vw, 25vw"
              />
            </div>
          </figure>
        ))}
      </div>

      <div className="site-container platform-client-strip">
        <PracticeLogos />
      </div>
    </section>
  );
}
