"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, CalendarDays, Check, FolderOpen, ScanLine, ReceiptText, MessageSquareText } from "lucide-react";
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
    supporting: "A clear view of your day",
    detail: "Scheduling and patient information move together.",
    Icon: CalendarDays,
  },
  {
    id: "record",
    label: "Patient records",
    supporting: "The whole patient picture",
    detail: "Clinical history and visit context remain connected.",
    Icon: FolderOpen,
  },
  {
    id: "imaging",
    label: "Clinical imaging",
    supporting: "Clarity at the point of care",
    detail: "Images and clinical records belong in one workflow.",
    Icon: ScanLine,
  },
  {
    id: "billing",
    label: "Billing",
    supporting: "From treatment to payment",
    detail: "Clinical and administrative work stay in sync.",
    Icon: ReceiptText,
  },
  {
    id: "followup",
    label: "Patient communication",
    supporting: "Keep the conversation going",
    detail: "Communication continues beyond the visit.",
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
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const [connected, setConnected] = useState(0);

  useGSAP(() => {
    const media = gsap.matchMedia();

    media.add("(min-width: 1024px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)", () => {
      const stage = canvas.current;
      if (!stage) return;

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
          trigger: stage,
          start: "top top+=86",
          end: () => "+=" + Math.round(window.innerHeight * 1.85),
          scrub: 0.7,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
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
      "(min-width: 1024px) and (max-height: 639px), (min-width: 1024px) and (prefers-reduced-motion: reduce)",
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
          <span className="journey-eyebrow">The connected patient journey</span>
          <h2 id="journey-heading">
            One patient journey.
            <span>One connected record.</span>
          </h2>
        </div>
        <div className="journey-intro-side">
          <p>Five important moments in a patient's experience. One continuous flow for the practice.</p>
          <span className="journey-scroll-hint"><ArrowDown size={15} aria-hidden="true" /> Scroll to connect the moments</span>
        </div>
      </div>

      <div className="pj-map" ref={canvas} aria-label="Interactive illustration of five care workflows connected to one patient record">
        <div className="pj-map-topline">
          <span className="pj-map-eyebrow"><span className="pj-map-dot" aria-hidden="true" /> THE PRACTICE, IN SYNC</span>
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
              src="/assets/novadontics/LogoColorAndGray.svg"
              alt="Novadontics"
              width={186}
              height={40}
              sizes="186px"
            />
          </div>
          <p>Your entire practice.<br/><strong>In one place.</strong></p>
          <span className="pj-center-status">
            <Check size={14} aria-hidden="true" />
            {connected === 5 ? "All systems connected" : connected === 0 ? "Connecting your practice" : `${connected} of 5 connected`}
          </span>
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

        <span className="pj-map-caption">An illustration of connected clinical and administrative workflows</span>
      </div>

      <div className="site-container pj-epilogue">
        <p>From booking to follow-up, every detail belongs to the same story.</p>
        <a href="https://www.novadontics.com/the-platform">
          Discover the platform <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>

      <div className="site-container pj-mobile-flow" aria-label="The five connected steps of the patient journey">
        <div className="pj-mobile-center">
          <Image src="/assets/novadontics/LogoColorAndGray.svg" width={156} height={35} alt="Novadontics" />
          <span>One connected patient record</span>
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
        <a className="pj-mobile-link" href="https://www.novadontics.com/the-platform">
          Explore the connected platform <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
