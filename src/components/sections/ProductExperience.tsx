"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const features = [
  {
    title: "Practice management",
    description: "Bring your scheduling, charting, billing and reporting into a single view of your day.",
    image: "practice-management.avif",
    alt: "Authentic Novadontics practice management interface",
    link: "https://www.novadontics.com/platform/practice-management",
    caption: "More clarity from the front desk to the operatory.",
  },
  {
    title: "Patient engagement",
    description: "Stay close to patients with thoughtful communication, reminders and paperless workflows.",
    image: "patient-engagement.avif",
    alt: "Authentic Novadontics patient engagement product interface",
    link: "https://www.novadontics.com/the-platform",
    caption: "A better experience before the appointment.",
  },
  {
    title: "Clinical imaging",
    description: "View clinical records and cloud-based imaging together, right where care happens.",
    image: "clinical-imaging.avif",
    alt: "Novadontics clinical imaging product imagery",
    link: "https://www.novadontics.com/the-platform",
    caption: "Clinical clarity, without another login.",
  },
  {
    title: "Implant workflows",
    description: "Purpose-built tools to support implant planning, case tracking and your digital implant logbook.",
    image: "implant-management.avif",
    alt: "Novadontics implant management workflow screenshot",
    link: "https://www.novadontics.com/platform/implant-dentistry-tools",
    caption: "A more connected path from plan to placement.",
  },
];

export function ProductExperience() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? features.length - 1 :
      (index + (event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1) + features.length) % features.length;
    setActive(next);
    tabs.current[next]?.focus();
  }

  const feature = features[active];

  return (
    <section className="product-section" id="features" aria-labelledby="product-title">
      <div className="site-container">
        <div className="product-heading">
          <h2 id="product-title">From the front desk.<br /><em>To every detail.</em></h2>
          <p>Discover the real Novadontics tools behind a more connected day. Choose a workflow to explore the platform.</p>
        </div>
        <div className="product-layout">
          <div className="feature-list" role="tablist" aria-label="Explore Novadontics features" aria-orientation="vertical">
            {features.map((item, i) => (
              <button
                key={item.title}
                type="button"
                id={`feature-tab-${i}`}
                ref={(node) => { tabs.current[i] = node; }}
                role="tab"
                aria-selected={active === i}
                aria-controls="feature-panel"
                tabIndex={active === i ? 0 : -1}
                className={`feature-tab ${active === i ? "is-active" : ""}`}
                onClick={() => setActive(i)}
                onKeyDown={(event) => onKeyDown(event, i)}
              >
                <span className="feature-copy">
                  <strong>{item.title}</strong>
                  {active === i && <span>{item.description}</span>}
                </span>
                <ArrowUpRight size={20} aria-hidden="true" />
              </button>
            ))}
          </div>
          <div id="feature-panel" role="tabpanel" aria-labelledby={`feature-tab-${active}`} tabIndex={0} className="product-visual">
            <div className="product-visual-image" key={feature.image}>
              <Image src={`/assets/novadontics/${feature.image}`} alt={feature.alt} fill sizes="(max-width: 899px) 90vw, 60vw" />
            </div>
            <div className="product-visual-caption">
              <p>{feature.caption}</p>
              <a href={feature.link}>Explore this feature <ArrowUpRight size={16} aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
