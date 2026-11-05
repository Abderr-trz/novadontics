"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown, CalendarDays, Check, FolderOpen, ScanLine, ReceiptText, MessageSquareText } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Inspired by the motion in the supplied Novadontics reference recording:
 * an anchored 5-to-1 diagram, neutral paths that draw orange as the user scrolls,
 * nodes moving from pending to connected, and one central shared patient record.
 * This illustrates a workflow, rather than depicting real patient information.
 */
const steps = [
  {
    id: "appointment",
    label: "Scheduling",
    supporting: "Your day, in view",
    detail: "Scheduling and patient information, together.",
    Icon: CalendarDays,
  },
  {
    id: "record",
    label: "Patient records",
    supporting: "The full patient picture",
    detail: "Clinical history in one place.",
    Icon: FolderOpen,
  },
  {
    id: "imaging",
    label: "Clinical imaging",
    supporting: "Images in context",
    detail: "Images connected to the record.",
    Icon: ScanLine,
  },
  {
    id: "billing",
    label: "Billing",
    supporting: "Treatment to payment",
    detail: "Billing follows care.",
    Icon: ReceiptText,
  },
  {
    id: "followup",
    label: "Patient communication",
    supporting: "Beyond the visit",
    detail: "Conversations beyond the visit.",
    Icon: MessageSquareText,
  },
] as const;

// Endpoints match the percentages defined in patient-journey.css.
// Path layout is symmetric but each connection draws independently.
const connectionPaths = [
  "M372 145 H399 Q432 145 432 181 V260 Q432 282 452 282",
  "M828 145 H801 Q768 145 768 181 V260 Q768 282 748 282",
  "M372 403 H402 Q432 403 432 370 V324 Q432 305 452 305",
  "M828 403 H798 Q768 403 768 370 V324 Q768 305 748 305",
  "M600 359 V480",
] as const;

export function PatientJourney() {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLDivElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const [connected, setConnected] = useState(0);

  useGSAP(() => {
    const media = gsap.matchMedia();

    media.add("(min-width: 1024px) and (min-height: 580px) and (prefers-reduced-motion: no-preference)", () => {
      const stage = canvas.current;
      if (!stage || !scene.current) return;

      const paths = Array.from(stage.querySelectorAll<SVGPathElement>(".pj-wire-active"));
      const nodes = Array.from(stage.querySelectorAll<HTMLButtonElement>(".pj-node"));

      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      });
      gsap.set(nodes, { opacity: 0.72, y: 9, scale: 0.985 });
      gsap.set(".pj-center-card", { scale: 0.975 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          // The map sticks inside its own scroll scene. No GSAP pin spacer can
          // lift the canvas above the previous headline during the transition.
          trigger: scene.current,
          start: "top top+=80",
          end: () => "+=" + Math.max(1, scene.current!.offsetHeight - stage.offsetHeight),
          scrub: 0.7,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const next = Math.min(5, Math.floor(self.progress * 5 + 0.4));
            setConnected((previous) => previous === next ? previous : next);
          },
        },
      });

      paths.forEach((path, index) => {
        tl.to(path, { strokeDashoffset: 0, duration: 0.9 }, index);
        tl.to(nodes[index], { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: "power2.out" }, index + 0.14);
      });
      tl.to(".pj-center-card", { scale: 1, duration: 0.6, ease: "power2.out" }, 4.38);
      // Ensure each scroll stage lasts equally, including the final connection.
      tl.to({}, { duration: 0.12 }, 4.9);
      timeline.current = tl;

      return () => {
        timeline.current = null;
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    // Keep the full five-card diagram visible on short desktop windows and
    // for visitors who request reduced motion. Only pinning is disabled.
    media.add(
      "(min-width: 1024px) and (max-height: 579px), (min-width: 1024px) and (prefers-reduced-motion: reduce)",
      () => {
        const paths = canvas.current?.querySelectorAll<SVGPathElement>(".pj-wire-active");
        paths?.forEach((path) => {
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: 0 });
        });
        gsap.set(".pj-center-card", { scale: 1 });
        gsap.set(".pj-node", { opacity: 1, y: 0, scale: 1 });
        setConnected(5);
      },
    );

    return () => media.revert();
  }, { scope: root });

  function focusStep(index: number) {
    const trigger = timeline.current?.scrollTrigger;
    if (!trigger) {
      // Non-pinned desktop: clicking a card selects its connection directly.
      const paths = canvas.current?.querySelectorAll<SVGPathElement>(".pj-wire-active");
      paths?.forEach((path, pathIndex) => {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: pathIndex <= index ? 0 : length,
        });
      });
      setConnected(index + 1);
      return;
    }
    // Native smooth scroll to the chosen connection; no wheel hijacking.
    const progress = Math.min(0.98, (index + 0.82) / steps.length);
    window.scrollTo({
      top: trigger.start + (trigger.end - trigger.start) * progress,
      behavior: "smooth",
    });
  }

  return (
    <section id="journey" className="journey-section" ref={root} aria-labelledby="journey-heading">
      <div className="site-container journey-intro">
        <div className="journey-intro-main">
          <span className="journey-eyebrow">Patient journey</span>
          <h2 id="journey-heading">
            One patient journey.
            <span>One connected record.</span>
          </h2>
        </div>
        <div className="journey-intro-side">
          <p>Five moments. One connected record.</p>
          <span className="journey-scroll-hint"><ArrowDown size={15} aria-hidden="true" /> Scroll to connect</span>
        </div>
      </div>

      <div className="pj-scroll-scene" ref={scene}>
        <div className="pj-map" ref={canvas} aria-label="Interactive illustration of five care workflows connected to one patient record">
        <div className="pj-map-topline">
          <span className="pj-map-dot" aria-hidden="true" />
          <span className="pj-map-progress">{String(connected).padStart(2, "0")} / 05 connected</span>
        </div>

        <svg className="pj-connections" viewBox="0 0 1200 620" preserveAspectRatio="none" aria-hidden="true">
          {connectionPaths.map((path, index) => (
            <g key={index}>
              <path d={path} className="pj-wire-base" />
              <path d={path} className="pj-wire-active" />
            </g>
          ))}
        </svg>

        <div className={`pj-center-card ${connected === steps.length ? "is-complete" : ""}`}>
          <div className="pj-center-brand">
            <Image
              src="/assets/novadontics/LogoMark.svg"
              alt="Novadontics symbol"
              width={40}
              height={51}
              sizes="56px"
            />
          </div>

        </div>

        {steps.map((step, index) => {
          const Icon = step.Icon;
          const complete = index < connected;
          return (
            <button
              type="button"
              className={`pj-node pj-node--${step.id} ${complete ? "is-connected" : ""}`}
              key={step.id}
              onClick={() => focusStep(index)}
              aria-label={`${step.label}: ${step.supporting}. ${complete ? "Connected" : "Select to explore"}`}
            >
              <span className="pj-node-top">
                <Icon size={21} strokeWidth={1.7} aria-hidden="true" />
                <span className="pj-node-status">
                  {complete ? <><Check size={13} strokeWidth={1.8} aria-hidden="true" /> Connected</> : String(index + 1).padStart(2, "0")}
                </span>
              </span>
              <strong>{step.label}</strong>
              <span className="pj-node-description">{step.supporting}</span>
            </button>
          );
        })}

        </div>
      </div>

      <div className="site-container pj-mobile-flow" aria-label="The five connected steps of the patient journey">
        <div className="pj-mobile-center">
          <Image src="/assets/novadontics/LogoMark.svg" width={40} height={51} alt="Novadontics symbol" />
        </div>
        {steps.map((step, index) => {
          const Icon = step.Icon;
          return (
            <article className="pj-mobile-node" key={step.id}>
              <span className="pj-mobile-node-icon"><Icon size={20} aria-hidden="true" /></span>
              <div>
                <span className="pj-mobile-number">{String(index + 1).padStart(2, "0")} / 05</span>
                <h3>{step.label}</h3>
                <p>{step.detail}</p>
              </div>
              <Check size={17} className="pj-mobile-check" aria-hidden="true" />
            </article>
          );
        })}
      </div>
    </section>
  );
}
