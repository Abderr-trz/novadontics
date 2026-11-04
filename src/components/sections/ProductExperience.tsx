"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const journeys = [
  {
    key: "practice",
    title: "Run your practice",
    headline: "The whole day, in a single view.",
    description: "Bring schedules, clinical records, billing and the decisions that shape your practice together. A clearer picture, from the front desk to the operatory.",
    image: "/assets/novadontics/practice-management.avif",
    alt: "Real Novadontics practice management interface",
    href: "https://www.novadontics.com/platform/practice-management",
    linkLabel: "Explore practice management",
  },
  {
    key: "engagement",
    title: "Connect with patients",
    headline: "Better conversations. Better care.",
    description: "Keep patient communication, reminders and paperless interactions close to the work your team already does, instead of adding another disconnected tool.",
    image: "/assets/novadontics/patient-engagement.avif",
    alt: "Real Novadontics patient engagement interface",
    href: "https://www.novadontics.com/the-platform",
    linkLabel: "Explore patient engagement",
  },
  {
    key: "clinical",
    title: "See the clinical picture",
    headline: "The details are already here.",
    description: "Clinical charting and imaging belong in the same flow as the patient record. See what matters when your team needs it.",
    image: "/assets/novadontics/clinical-imaging.avif",
    alt: "Real Novadontics clinical imaging interface",
    href: "https://www.novadontics.com/the-platform",
    linkLabel: "Explore clinical tools",
  },
  {
    key: "implant",
    title: "Plan implant care",
    headline: "Purpose-built for precision.",
    description: "Move from evaluation and treatment planning to implant case records and digital logbooks with tools designed for implant dentistry.",
    image: "/assets/novadontics/implant-management.avif",
    alt: "Real Novadontics implant management interface",
    href: "https://www.novadontics.com/platform/implant-dentistry-tools",
    linkLabel: "Explore implant tools",
  },
] as const;

export function ProductExperience() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 900px)", () => {
      const panels = gsap.utils.toArray<HTMLElement>(".product-story-panel");
      panels.forEach((panel, index) => {
        ScrollTrigger.create({
          trigger: panel,
          start: "top 45%",
          end: "bottom 45%",
          onEnter: () => setActive(index),
          onEnterBack: () => setActive(index),
        });
      });
    });

    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>(".product-shot").forEach((shot) => {
        gsap.fromTo(shot,
          { autoAlpha: .68, y: 46, scale: .975 },
          {
            autoAlpha: 1, y: 0, scale: 1, ease: "none",
            scrollTrigger: { trigger: shot, start: "top 95%", end: "top 48%", scrub: .6 },
          },
        );
      });
    });

    return () => mm.revert();
  }, { scope: root });

  return (
    <section id="features" className="product-section product-story-section" ref={root} aria-labelledby="product-title">
      <div className="site-container">
        <div className="product-story-heading">
          <h2 id="product-title">A more connected way <span>to work.</span></h2>
          <p>One thoughtfully integrated platform, supporting the entire patient journey from your first appointment through ongoing care.</p>
        </div>

        <div className="product-story-grid">
          <nav className="product-story-navigation" aria-label="Explore Novadontics workflows">
            <p>Explore the platform</p>
            <div className="product-story-navlist">
              {journeys.map((journey, i) => (
                <a
                  href={`#feature-${journey.key}`}
                  key={journey.key}
                  className={`product-story-navitem ${active === i ? "is-active" : ""}`}
                  aria-current={active === i ? "step" : undefined}
                  onClick={() => setActive(i)}
                >
                  {journey.title}
                </a>
              ))}
            </div>
          </nav>

          <div className="product-story-scenes">
            {journeys.map((journey) => (
              <article className="product-story-panel" id={`feature-${journey.key}`} key={journey.key}>
                <div className="product-story-copy">
                  <h3>{journey.headline}</h3>
                  <p>{journey.description}</p>
                  <a href={journey.href} className="product-story-link">
                    {journey.linkLabel} <ArrowUpRight size={17} aria-hidden="true" />
                  </a>
                </div>
                <figure className="product-shot">
                  <div className="product-shot-bar">
                    <span className="product-shot-dots" aria-hidden="true"><i /><i /><i /></span>
                    <span>Novadontics</span>
                  </div>
                  <Image
                    src={journey.image}
                    alt={journey.alt}
                    width={1290}
                    height={612}
                    sizes="(max-width: 899px) 94vw, 65vw"
                  />
                </figure>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
