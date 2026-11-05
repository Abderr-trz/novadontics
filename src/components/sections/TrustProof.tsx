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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".practice-proof-intro",
        { opacity: .85, y: 12 },
        { opacity: 1, y: 0, duration: .65, ease: "power2.out" },
        0,
      ).fromTo(
        ".practice-logo-grid li",
        { opacity: .78, y: 16, scale: .985 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: .75,
          ease: "power2.out",
          stagger: { amount: .57, from: "start" },
        },
        .15,
      );
    });

    return () => mm.revert();
  }, { scope: root });

  return (
    <div className="practice-proof" ref={root}>
      <p className="practice-proof-intro">
        Trusted by dental practices <span>across all 50 states.</span>
      </p>

      <ul className="practice-logo-grid" aria-label="Dental practices using Novadontics">
        {practices.map(([file, name]) => (
          <li key={file}>
            <Image
              src={`/assets/novadontics/${file}`}
              alt={name}
              width={190}
              height={72}
              sizes="(max-width: 600px) 42vw, (max-width: 1023px) 22vw, 190px"
              className="practice-logo"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
