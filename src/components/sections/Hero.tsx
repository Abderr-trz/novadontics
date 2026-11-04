"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(useGSAP);

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .from(".hero-pill", { y: 14, opacity: 0, duration: 0.65 })
        .from(".hero-title-line", { y: 36, opacity: 0, stagger: 0.105, duration: 0.86 }, "-=0.38")
        .from(".hero-lead", { y: 15, opacity: 0, duration: 0.7 }, "-=0.45")
        .from(".hero-actions", { y: 12, opacity: 0, duration: 0.65 }, "-=0.43")
        .from(".hero-showcase", { y: 24, opacity: 0, duration: 0.88 }, "-=0.25");
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <section ref={root} className="hero-section hero-centered" aria-labelledby="hero-title">
      <div className="hero-ambient" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />

      <div className="site-container hero-content">
        <a className="hero-pill" href="#platform">
          <span>Introducing a more connected practice</span>
          <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" />
        </a>

        <h1 id="hero-title" className="hero-title">
          <span className="hero-title-line">Your entire practice.</span>
          <span className="hero-title-line">Finally in sync.</span>
        </h1>

        <p className="hero-lead">
          Novadontics brings scheduling, patient communication, clinical imaging,
          billing and practice management together in one connected cloud platform.
        </p>

        <div className="hero-actions">
          <a className="hero-button-secondary" href="#features">Explore the platform</a>
          <a className="hero-button-primary" href="https://www.novadontics.com/book-a-demo">
            Book a free demo
          </a>
        </div>

        <div className="hero-showcase">
          <Image
            src="/assets/novadontics/practice-management.avif"
            alt="Novadontics practice management dashboard with practice activity and clinical workflows"
            width={1290}
            height={612}
            sizes="(max-width: 767px) 100vw, (max-width: 1400px) 88vw, 1180px"
            priority
          />
        </div>
      </div>
    </section>
  );
}
