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
        .from(".hero-pill", { opacity: 0, y: 12, duration: 0.55 })
        .from(".hero-title-line", { opacity: 0, y: 26, duration: 0.74, stagger: 0.09 }, "-=0.33")
        .from(".hero-lead", { opacity: 0, y: 12, duration: 0.60 }, "-=0.40")
        .from(".hero-actions", { opacity: 0, y: 10, duration: 0.58 }, "-=0.37");
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <section ref={root} className="hero-section hero-centered" aria-labelledby="hero-title">
      <div className="site-container hero-content">
        <div className="hero-fade-group">
          <a className="hero-pill" href="#platform">
            <span>Meet the connected dental practice</span>
            <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" />
          </a>

          <h1 id="hero-title" className="hero-title">
            <span className="hero-title-line">Your entire practice.</span>
            <span className="hero-title-line">Finally in sync.</span>
          </h1>

          <p className="hero-lead">
            Appointments, clinical imaging, billing and patient conversations —
            all working together in one platform built for modern dental practices.
          </p>

          <div className="hero-actions">
            <a className="hero-button-secondary" href="#features">Explore the platform</a>
            <a className="hero-button-primary" href="https://www.novadontics.com/book-a-demo">
              Book a free demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
