"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight, ArrowDownRight, ShieldCheck, Cloud, UsersRound } from "lucide-react";
import { AwardsBand } from "./TrustProof";

gsap.registerPlugin(useGSAP);

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline.from(".hero-title-line", { yPercent: 105, opacity: 0, duration: 1.05, stagger: 0.14 })
        .from(".hero-lead", { y: 20, opacity: 0, duration: 0.75 }, 0.35)
        .from(".hero-actions", { y: 12, opacity: 0, duration: 0.65 }, 0.48)
        .from(".hero-stage", { y: 44, opacity: 0, scale: 0.985, duration: 1.1 }, 0.48);
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <section className="hero-section" ref={root} aria-labelledby="hero-title">
      <div className="site-container">
        <div className="hero-intro">
          <h1 id="hero-title" className="hero-title">
            <span className="hero-title-clip"><span className="hero-title-line">Your entire</span></span>
            <span className="hero-title-clip"><span className="hero-title-line">practice.<em> In sync.</em></span></span>
          </h1>
          <div className="hero-aside">
            <p className="hero-lead">The everyday tools of dentistry, finally working together. From your first appointment to your final clinical note, Novadontics keeps your practice connected.</p>
            <div className="hero-actions">
              <a className="primary-button" href="https://www.novadontics.com/book-a-demo">Book a free demo <ArrowUpRight size={17} aria-hidden="true" /></a>
              <a className="quiet-link" href="#features">Explore the platform <ArrowDownRight size={17} aria-hidden="true" /></a>
            </div>
          </div>
        </div>

        <div className="hero-stage">
          <div className="hero-stage-top">
            <span>One connected practice</span>
            <span className="hero-stage-mark">NOVADONTICS</span>
          </div>
          <div className="hero-stage-product">
            <Image
              src="/assets/novadontics/practice-management.avif"
              alt="Actual Novadontics practice management dashboard showing practice activity and reporting"
              width={1290}
              height={612}
              sizes="(max-width: 767px) 100vw, 88vw"
              priority
            />
          </div>
          <div className="hero-stage-bottom">
            <span><Cloud size={15} aria-hidden="true" /> Cloud-based</span>
            <span><ShieldCheck size={15} aria-hidden="true" /> HIPAA compliant</span>
            <span><UsersRound size={15} aria-hidden="true" /> Built for every practice</span>
          </div>
        </div>
      </div>
      <AwardsBand />
    </section>
  );
}
