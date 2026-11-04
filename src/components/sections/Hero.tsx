"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, ArrowDownRight, Cloud, ShieldCheck, MonitorSmartphone } from "lucide-react";
import { AwardBadges, AwardsBand } from "./TrustProof";

gsap.registerPlugin(useGSAP);

export function Hero() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".hero-enter", { y: 24, opacity: 0, duration: 0.85, stagger: 0.1, ease: "power3.out" });
      gsap.from(".hero-product", { y: 35, opacity: 0, duration: 1.1, delay: 0.3, ease: "power3.out" });
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <section ref={root} className="hero-section" aria-labelledby="hero-title">
      <div className="site-container">
        <div className="hero-editorial">
          <div>
            <p className="section-kicker hero-enter"><span /> BUILT FOR THE WAY YOU PRACTICE</p>
            <h1 id="hero-title" className="hero-enter">Your entire practice.<br /><span>Finally in sync.</span></h1>
          </div>
          <div className="hero-summary hero-enter">
            <p>Scheduling, patient communication, imaging and billing. One connected cloud platform for modern dental practices.</p>
            <a href="https://www.novadontics.com/book-a-demo" className="primary-button">Book a Free Demo <ArrowRight size={17} aria-hidden="true" /></a>
            <a href="#platform" className="text-link">Explore the Platform <ArrowDownRight size={17} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="hero-product">
          <div className="hero-product-side"><span className="product-number">01—05</span><p>Every workflow.<br /> <strong>One workspace.</strong></p><span className="product-side-rule" /><span className="product-side-note">THE NOVADONTICS<br />PLATFORM</span></div>
          <div className="hero-product-image"><Image src="/assets/novadontics/practice-management.avif" alt="Novadontics dashboard with practice activity, patient status and reporting" width={1290} height={612} priority sizes="(max-width: 767px) 100vw, 75vw" /></div>
          <div className="hero-product-bottom"><span><Cloud size={15} aria-hidden="true" /> Cloud-based</span><span><ShieldCheck size={15} aria-hidden="true" /> Secure by design</span><span><MonitorSmartphone size={15} aria-hidden="true" /> Wherever you work</span></div>
        </div>
        <AwardBadges />
      </div>
      <AwardsBand />
    </section>
  );
}

