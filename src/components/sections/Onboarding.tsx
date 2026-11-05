"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Check, Headphones } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const steps = [
  {
    title: "Move your data",
    detail: "Novadontics helps transfer patient histories, schedules, ledgers and existing images from your current software.",
  },
  {
    title: "Get the team ready",
    detail: "Guided setup and role-based training help everyone get comfortable before launch.",
  },
  {
    title: "Go live together",
    detail: "The team moves into its connected workflows with onboarding specialists nearby.",
  },
  {
    title: "Keep moving forward",
    detail: "Ongoing support is available as your practice and your needs evolve.",
  },
] as const;

export function Onboarding() {
  const section = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(".switch-progress-fill", { scaleX: 0 }, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top 72%",
          end: "bottom 64%",
          scrub: 0.75,
        },
      });

      gsap.utils.toArray<HTMLElement>(".switch-step").forEach((item) => {
        gsap.fromTo(item, { opacity: .45, y: 22 }, {
          opacity: 1,
          y: 0,
          duration: .65,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 83%",
            once: true,
          },
        });
      });
    });

    return () => mm.revert();
  }, { scope: section });

  return (
    <section className="switch-section" id="onboarding" ref={section} aria-labelledby="switch-title">
      <div className="site-container">
        <div className="switch-heading">
          <h2 id="switch-title">The switch should feel <em>simple.</em></h2>
          <div className="switch-heading-aside">
            <p>New software is a big decision. Moving to Novadontics doesn't have to become a second job for your team.</p>
            <a href="https://www.novadontics.com/onboarding">Explore onboarding <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
        </div>

        <div className="switch-path">
          <div className="switch-progress-track" aria-hidden="true"><span className="switch-progress-fill" /></div>
          {steps.map((step) => (
            <div className="switch-step" key={step.title}>
              <span className="switch-step-marker" aria-hidden="true"><Check size={13} strokeWidth={2.4} /></span>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </div>
          ))}
        </div>

        <div className="switch-support">
          <div className="switch-support-icon"><Headphones size={22} strokeWidth={1.8} aria-hidden="true" /></div>
          <div>
            <strong>A real team on your side.</strong>
            <p>Migration, training and support are part of the onboarding experience.</p>
          </div>
          <a href="https://www.novadontics.com/book-a-demo">Talk through your switch <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
