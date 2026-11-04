"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(useGSAP);

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-pill", { opacity: 0, y: 12, duration: .65 })
        .from(".hero-title-line", { opacity: 0, y: 33, duration: .86, stagger: .10 }, "-=.35")
        .from(".hero-lead", { opacity: 0, y: 15, duration: .65 }, "-=.46")
        .from(".hero-actions", { opacity: 0, y: 12, duration: .65 }, "-=.42");
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <section ref={root} className="hero-section hero-centered" aria-labelledby="hero-title">
      <div className="hero-ambient" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="site-container hero-content">
        <a className="hero-pill" href="#platform">
          <span>A more connected way to practice</span>
          <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" />
        </a>

        <h1 id="hero-title" className="hero-title">
          <span className="hero-title-line">Your entire practice.</span>
          <span className="hero-title-line">Finally in sync.</span>
        </h1>

        <p className="hero-lead">
          Scheduling, patient communication, imaging, billing and clinical workflows.
          Everything your dental practice needs, connected in Novadontics.
        </p>

        <div className="hero-actions">
          <a className="hero-button-secondary" href="#features">Explore the platform</a>
          <a className="hero-button-primary" href="https://www.novadontics.com/book-a-demo">
            Book a free demo
          </a>
        </div>
      </div>
    </section>
  );
}
