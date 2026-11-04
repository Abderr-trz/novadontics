"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Award } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const awards = [
  { name: "Best Value", source: "Capterra" },
  { name: "Best Functionality", source: "GetApp" },
  { name: "Best Customer Support", source: "Software Advice" },
];

export function AwardsBand() {
  return (
    <aside className="awards-band" aria-label="Customer ratings and 2025 awards">
      <div className="site-container awards-content">
        <div className="review-score">
          <div className="review-stars" aria-label="Rated 4.8 out of 5">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} size={14} fill="currentColor" strokeWidth={0} aria-hidden="true" />
            ))}
          </div>
          <p><strong>4.8/5</strong> from 300+ reviews</p>
        </div>
        <div className="award-list">
          {awards.map((award) => (
            <div className="award-item" key={award.source}>
              <Award size={18} strokeWidth={1.5} aria-hidden="true" />
              <span><strong>{award.name}</strong> · {award.source}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

const practices = [
  ["fleur-de-lis.webp", "Fleur De Lis Dental Care"],
  ["artlab.webp", "ArtLab Dentistry"],
  ["hurst.webp", "Hurst Dental Care"],
  ["bright-smile.webp", "Bright Smile Design"],
  ["dental-spa.webp", "Dental Spa Oklahoma"],
  ["mountainside.webp", "Mountainside Oral Implantology & Prosthetics"],
  ["sacramento.webp", "Sacramento Holistic Dentistry"],
  ["ross.webp", "Ross Dental"],
] as const;

export function PracticeLogos() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 87%",
          toggleActions: "play none none reverse",
        },
      });

      timeline
        .fromTo(".practice-proof-rule",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.85, ease: "power2.out" },
          0)
        .fromTo(".practice-proof-copy > *",
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.7, ease: "power3.out" },
          0.08)
        .fromTo(".practice-logo-grid li",
          { autoAlpha: 0, y: 18, scale: 0.97 },
          { autoAlpha: 1, y: 0, scale: 1, stagger: 0.07, duration: 0.72, ease: "power2.out" },
          0.19);
    });

    return () => mm.revert();
  }, { scope: root });

  return (
    <div className="practice-proof" ref={root}>
      <span className="practice-proof-rule" aria-hidden="true" />

      <div className="practice-proof-copy">
        <h3>Trusted where <span>care happens.</span></h3>
        <p>Dental practices across all 50 states choose Novadontics for their everyday work.</p>
      </div>

      <ul className="practice-logo-grid" aria-label="Dental practices using Novadontics">
        {practices.map(([file, name]) => (
          <li key={file}>
            <Image
              src={`/assets/novadontics/${file}`}
              alt={name}
              width={190}
              height={72}
              sizes="(max-width: 600px) 42vw, (max-width: 1023px) 22vw, 180px"
              className="practice-logo"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
