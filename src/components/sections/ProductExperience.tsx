"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const features = [
  { title: "Practice Management", description: "Bring your schedule, charts, billing and daily operations together. A clearer picture of your practice, from the front desk to the operatory.", image: "practice-management.avif", alt: "Novadontics practice dashboard showing activity and reporting", link: "https://www.novadontics.com/platform/practice-management", caption: "Your practice, at a glance." },
  { title: "Patient Engagement", description: "Keep patients connected with communication, scheduling and paperless workflows that make the next step feel effortless.", image: "patient-engagement.avif", alt: "Novadontics patient engagement and paperless forms", link: "https://www.novadontics.com/the-platform", caption: "A better experience, before the appointment." },
  { title: "Clinical & Imaging Tools", description: "See clinical information and cloud-based imaging together, right where you need them in the patient journey.", image: "clinical-imaging.avif", alt: "Dental X-rays and imaging tools in the Novadontics interface", link: "https://www.novadontics.com/the-platform", caption: "Clinical clarity. Without the extra login." },
  { title: "Implant Management", description: "Purpose-built tools for implant workflows, from evaluation and treatment planning to your digital implant logbook.", image: "implant-management.avif", alt: "Novadontics implant logbook CT evaluation checklist on a tablet", link: "https://www.novadontics.com/platform/implant-dentistry-tools", caption: "Made for the details that matter." },
];

export function ProductExperience() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? features.length - 1 : (index + (event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1) + features.length) % features.length;
    setActive(next);
    tabs.current[next]?.focus();
  }
  const feature = features[active];

  return (
    <section id="features" className="product-section" aria-labelledby="product-title">
      <div className="site-container">
        <p className="section-kicker"><span /> 02 / THE PRODUCT EXPERIENCE</p>
        <div className="product-intro"><h2 id="product-title">Everything in its<br />right place.</h2><p>Less jumping between systems. More clarity across the entire practice.</p></div>
        <div className="product-layout">
          <div className="feature-list" role="tablist" aria-label="Platform features" aria-orientation="vertical">
            {features.map((item, i) => (
              <button key={item.title} ref={node => { tabs.current[i] = node; }} type="button" id={`feature-tab-${i}`} role="tab" aria-selected={active === i} aria-controls={`feature-panel-${i}`} tabIndex={active === i ? 0 : -1} onClick={() => setActive(i)} onKeyDown={event => onKeyDown(event, i)} className={`feature-tab ${active === i ? "is-active" : ""}`}>
                <span className="feature-index">0{i + 1}</span>
                <span className="feature-copy"><strong>{item.title}</strong>{active === i ? <span>{item.description}</span> : null}</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </button>
            ))}
          </div>
          {features.map((item, i) => (
            <div key={item.title} id={`feature-panel-${i}`} role="tabpanel" aria-labelledby={`feature-tab-${i}`} hidden={active !== i} tabIndex={0} className="product-visual">
              {active === i ? <>
                <div className="product-visual-label"><span>INSIDE NOVADONTICS</span><span>0{i + 1} / 04</span></div>
                <div className="product-visual-image"><Image key={feature.image} src={`/assets/novadontics/${feature.image}`} alt={feature.alt} fill sizes="(max-width: 899px) 90vw, 55vw" /></div>
                <div className="product-visual-caption"><p>{feature.caption}</p><a href={feature.link}>Explore tools <ArrowUpRight size={13} aria-hidden="true" /></a></div>
              </> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

