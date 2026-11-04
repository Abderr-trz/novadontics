"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CalendarDays, FolderHeart, ScanLine, ReceiptText, MessagesSquare, Check, ArrowDown } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const workflows = [
  { title: "Scheduling", detail: "A clear view of your day", icon: CalendarDays, className: "schedule" },
  { title: "Patient records", detail: "The whole patient picture", icon: FolderHeart, className: "records" },
  { title: "Clinical imaging", detail: "Clarity at the point of care", icon: ScanLine, className: "imaging" },
  { title: "Billing", detail: "From treatment to payment", icon: ReceiptText, className: "billing" },
  { title: "Patient communication", detail: "Keep the conversation going", icon: MessagesSquare, className: "communication" },
];

// Inspired by 21st.dev's Animated Beam; uses our existing GSAP stack.
// The viewBox follows the percentage-based node positions without layout reads.
const connections = [
  "M 180 95 H 310 Q 335 95 335 120 V 175 Q 335 200 360 200 H 500",
  "M 820 95 H 690 Q 665 95 665 120 V 175 Q 665 200 640 200 H 500",
  "M 180 290 H 310 Q 335 290 335 265 V 225 Q 335 200 360 200 H 500",
  "M 820 290 H 690 Q 665 290 665 265 V 225 Q 665 200 640 200 H 500",
  "M 500 395 V 200",
];

export function ConnectedPlatform() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add({ desktop: "(min-width: 1024px) and (min-height: 600px)", reduced: "(prefers-reduced-motion: reduce)" }, (context) => {
      const { desktop, reduced } = context.conditions!;
      if (reduced) return;
      const select = gsap.utils.selector(root);
      if (desktop) {
        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top 64px", end: "+=105%", pin: true, scrub: 0.65, invalidateOnRefresh: true },
        });
        timeline
          .from(select(".connection-node"), { x: (i: number) => [-30, 30, -20, 20, 0][i], y: (i: number) => [-15, -15, 20, 20, 28][i], rotation: (i: number) => [-3, 3, 2, -2, 0][i], stagger: 0.025, duration: 0.35 }, 0)
          .from(select(".connection-beam"), { strokeDashoffset: 1, stagger: 0.035, duration: 0.4 }, 0.12)
          .from(select(".connection-hub"), { scale: 0.92, opacity: 0.35, duration: 0.4 }, 0.1)
          .from(select(".node-connected"), { opacity: 0, y: 4, stagger: 0.035, duration: 0.2 }, 0.38)
          .from(select(".hub-status"), { opacity: 0, duration: 0.25 }, 0.5)
          .from(select(".connection-outcome"), { opacity: 0, y: 14, duration: 0.25 }, 0.55)
          .fromTo(select(".connection-progress-fill"), { scaleX: 0 }, { scaleX: 1, duration: 0.9 }, 0)
          .to({}, { duration: 0.18 });
      } else {
        gsap.from(select(".connection-node"), {
          opacity: 0.3, y: 20, stagger: 0.08, duration: 0.6,
          scrollTrigger: { trigger: select(".connection-canvas")[0], start: "top 85%", end: "bottom 85%", scrub: 0.5 },
        });
      }
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <section id="platform" ref={root} className="connection-section" aria-labelledby="connection-title">
      <div className="site-container connection-screen">
        <div className="connection-heading">
          <div>
            <p className="section-kicker"><span /> 01 / THE CONNECTED PRACTICE</p>
            <h2 id="connection-title">Five moving parts.<br /><span>One beautiful rhythm.</span></h2>
          </div>
          <div className="connection-intro">
            <p>Five systems that never spoke.<br />Now, every part of your practice works together.</p>
            <span className="scroll-cue"><ArrowDown size={14} aria-hidden="true" /> Scroll to connect the dots</span>
          </div>
        </div>

        <div className="connection-canvas">
          <div className="diagram-label" aria-hidden="true"><span className="tiny-dot" /> YOUR PRACTICE, IN SYNC</div>
          <svg className="connection-lines" viewBox="0 0 1000 460" preserveAspectRatio="none" fill="none" aria-hidden="true">
            {connections.map((path, i) => <g key={path}>
              <path d={path} stroke="var(--color-border-strong)" strokeWidth="1.1" />
              <path className="connection-beam" d={path} pathLength="1" stroke="var(--color-brand-amber)" strokeWidth="2" strokeDasharray="1" strokeDashoffset="0" />
              <circle cx={[180, 820, 180, 820, 500][i]} cy={[95, 95, 290, 290, 395][i]} r="4" fill="var(--color-brand-amber)" />
            </g>)}
          </svg>
          <div className="connection-hub">
            <div className="hub-brand"><Image src="/assets/novadontics/LogoColorAndGray.svg" alt="Novadontics" width={174} height={38} /></div>
            <p>Your entire practice.<br /><strong>In one place.</strong></p>
            <div className="hub-status"><Check size={13} aria-hidden="true" /> All systems connected</div>
          </div>
          {workflows.map(({ title, detail, icon: Icon, className }, i) => (
            <div className={`connection-node node-${className}`} key={title}>
              <div className="node-top"><span className="node-icon"><Icon size={20} strokeWidth={1.6} aria-hidden="true" /></span><span className="node-index">0{i + 1}</span></div>
              <h3>{title}</h3><p>{detail}</p>
              <span className="node-connected"><Check size={11} aria-hidden="true" />Connected</span>
            </div>
          ))}
          <span className="diagram-note">An illustration of a connected workflow</span>
        </div>
        <div className="connection-bottom">
          <p className="connection-outcome"><span className="outcome-check"><Check size={16} aria-hidden="true" /></span><strong>Now, they’re one.</strong><span>Less switching. More practicing.</span></p>
          <div className="connection-progress" aria-hidden="true"><span className="connection-progress-fill" /></div>
        </div>
      </div>
    </section>
  );
}


