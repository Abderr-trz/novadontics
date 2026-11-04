"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const workflows = [
  "Scheduling",
  "Patient records",
  "Clinical imaging",
  "Billing & claims",
  "Patient communication",
];

export function ConnectedPlatform() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.set(".merge-preview", { autoAlpha: 0, scale: 0.94, clipPath: "inset(14% 14% round 12px)" });
      gsap.set(".merge-message", { autoAlpha: 0, y: 18 });
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top+=64",
          end: "+=110%",
          scrub: 0.7,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      timeline
        .to(".merge-item", {
          x: (i: number) => [80, 38, 0, -38, -80][i],
          y: (i: number) => [92, 48, 0, -48, -92][i],
          scale: 0.86,
          opacity: 0,
          stagger: 0.035,
          duration: 0.48,
        }, 0.08)
        .to(".merge-preview", {
          autoAlpha: 1,
          scale: 1,
          clipPath: "inset(0% 0% round 12px)",
          duration: 0.48,
        }, 0.40)
        .to(".merge-message", { autoAlpha: 1, y: 0, duration: 0.24 }, 0.72)
        .to({}, { duration: 0.18 });
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <section id="platform" ref={root} className="connection-section" aria-labelledby="connection-title">
      <div className="site-container connection-shell">
        <div className="connection-copy">
          <h2 id="connection-title">Five systems.<br /><em>One seamless day.</em></h2>
          <p>Every appointment touches more than a calendar. Novadontics brings the moving parts of your practice into one connected experience, from booking to billing.</p>
          <div className="connection-workflows" aria-label="Connected workflows">
            {workflows.map((workflow) => <span key={workflow}>{workflow}</span>)}
          </div>
          <a href="#features" className="connection-link">See how it works <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
        <div className="merge-stage">
          <div className="merge-stack" aria-hidden="true">
            {workflows.map((item) => <div className="merge-item" key={item}><span>{item}</span><span className="merge-item-line" /></div>)}
          </div>
          <div className="merge-preview">
            <div className="merge-image">
              <Image src="/assets/novadontics/practice-management.avif" alt="Authentic Novadontics practice management product interface" width={1290} height={612} sizes="(max-width: 1023px) 90vw, 48vw" />
            </div>
            <div className="merge-message"><span className="merge-success-dot" />One connected workspace</div>
          </div>
          <div className="merge-stage-caption">From disconnected steps to one complete patient journey.</div>
        </div>
      </div>
    </section>
  );
}
