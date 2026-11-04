"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * All four images are actual Novadontics assets bundled in /public/assets/novadontics.
 * The layered browser frames are decorative; the screenshots themselves are unaltered.
 */
const screens = [
  {
    kind: "patient",
    label: "Patient engagement",
    src: "/assets/novadontics/patient-engagement.avif",
    alt: "Novadontics patient engagement software interface",
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
    alt: "Novadontics implant management and case workflow interface",
    width: 720,
    height: 500,
  },
] as const;

function WindowDots() {
  return (
    <span className="platform-window-dots" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

export function ConnectedPlatform() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        desktop: "(min-width: 1180px) and (min-height: 780px)",
        reduce: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        if (!context.conditions?.desktop || context.conditions?.reduce) return;

        const stage = root.current?.querySelector(".platform-composition");
        if (!stage) return;

        // Scrolling controls a single, reversible sequence; no autoscroll or hijacking.
        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: stage,
            start: "top 126px",
            end: "+=90%",
            pin: true,
            scrub: 0.85,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .fromTo(
            ".platform-main-window",
            { y: 62, scale: 0.925, autoAlpha: 0.45 },
            { y: 0, scale: 1, autoAlpha: 1, duration: 0.55 },
            0,
          )
          .fromTo(
            ".platform-patient",
            { x: 170, y: 95, scale: 0.78, autoAlpha: 0 },
            { x: 0, y: 0, scale: 1, autoAlpha: 1, duration: 0.56 },
            0.13,
          )
          .fromTo(
            ".platform-clinical",
            { x: 120, y: -30, scale: 0.83, autoAlpha: 0 },
            { x: 0, y: 0, scale: 1, autoAlpha: 1, duration: 0.54 },
            0.21,
          )
          .fromTo(
            ".platform-implant",
            { x: -150, y: 60, scale: 0.8, autoAlpha: 0 },
            { x: 0, y: 0, scale: 1, autoAlpha: 1, duration: 0.54 },
            0.29,
          )
          .to(".platform-main-window", { y: -7, duration: 0.22 }, 0.72)
          .to(".platform-patient", { x: -7, y: -5, duration: 0.22 }, 0.72)
          .to(".platform-clinical", { x: -9, y: 8, duration: 0.22 }, 0.72)
          .to(".platform-implant", { x: 6, y: -5, duration: 0.22 }, 0.72)
          .to({}, { duration: 0.12 });
      },
    );

    return () => mm.revert();
  }, { scope: root });

  return (
    <section
      id="platform"
      className="platform-showcase"
      ref={root}
      aria-labelledby="platform-showcase-title"
    >
      <div className="platform-showcase-glow" aria-hidden="true" />
      <div className="platform-showcase-lines" aria-hidden="true" />

      <div className="site-container platform-showcase-heading">
        <h2 id="platform-showcase-title">
          One platform. <span>Every part of your practice.</span>
        </h2>
        <p>
          One connected workspace for the tools your team uses every day — from
          patient communication to imaging and implant care.
        </p>
      </div>

      <div
        className="platform-composition"
        aria-label="Four genuine Novadontics software screens shown together"
      >
        <figure className="platform-main-window">
          <div className="platform-window-chrome">
            <WindowDots />
            <span className="platform-window-heading">Practice management</span>
          </div>
          <div className="platform-main-image">
            <Image
              src="/assets/novadontics/practice-management.avif"
              alt="Novadontics practice management dashboard"
              width={1290}
              height={612}
              sizes="(max-width: 767px) 94vw, (max-width: 1179px) 88vw, 74vw"
            />
          </div>
          <figcaption className="platform-main-footer">
            <span className="platform-status-dot" />
            Connected practice management
          </figcaption>
        </figure>

        {screens.map((screen) => (
          <figure
            className={`platform-floating-window platform-${screen.kind}`}
            key={screen.kind}
          >
            <div className="platform-window-chrome">
              <WindowDots />
            </div>
            <figcaption className="platform-floating-label">
              {screen.label}
            </figcaption>
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
    </section>
  );
}
