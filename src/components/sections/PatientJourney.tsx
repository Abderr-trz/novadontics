"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const journey = [
  {
    name: "Appointment",
    action: "A visit begins with a booking.",
    detail: "The schedule and the patient record live in the same practice workflow, so the team starts with context.",
    image: "https://cdn.prod.website-files.com/6a3c0959f5ad49988da23e13/6a43fc02a9a03a2c7c5d1605_d4c41bf325eb4634ae9f31a9f932d25e_calendar.avif",
    alt: "Official Novadontics scheduling and calendar product visual",
    tone: "schedule",
  },
  {
    name: "Patient record",
    action: "A clearer picture of every visit.",
    detail: "Clinical charts and treatment planning stay close to the patient record instead of another disconnected login.",
    image: "/assets/novadontics/practice-management.avif",
    alt: "Authentic Novadontics practice management screen",
    tone: "record",
  },
  {
    name: "Imaging",
    action: "Imaging stays in the conversation.",
    detail: "Radiographs, scans and clinical information can be accessed through an integrated cloud-based record.",
    image: "/assets/novadontics/clinical-imaging.avif",
    alt: "Authentic Novadontics clinical imaging screen",
    tone: "imaging",
  },
  {
    name: "Billing",
    action: "From treatment to the front desk.",
    detail: "Clinical and administrative work is connected with the practice’s billing and claims workflow.",
    image: "https://cdn.prod.website-files.com/6a3c0959f5ad49988da23e13/6a49340368be0cc0c1ace0e1_portal.avif",
    alt: "Official Novadontics patient portal and payment workflow visual",
    tone: "billing",
  },
  {
    name: "Follow-up",
    action: "Care keeps moving after the visit.",
    detail: "Patient engagement tools support communication, reminders and the next appointment.",
    image: "/assets/novadontics/patient-engagement.avif",
    alt: "Authentic Novadontics patient engagement interface",
    tone: "followup",
  },
] as const;

export function PatientJourney() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1100px) and (min-height: 660px) and (prefers-reduced-motion: no-preference)", () => {
      if (!stage.current) return;

      gsap.set(".journey-meter-fill", { scaleX: 0, transformOrigin: "left center" });
      const trigger = ScrollTrigger.create({
        trigger: stage.current,
        start: "top top+=95",
        end: () => "+=" + Math.round(window.innerHeight * 1.65),
        pin: true,
        pinSpacing: true,
        scrub: 0.55,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const next = Math.min(journey.length - 1, Math.floor(self.progress * journey.length));
          setActive((previous) => previous === next ? previous : next);
          gsap.set(".journey-meter-fill", { scaleX: self.progress });
        },
      });

      return () => trigger.kill();
    });
    return () => mm.revert();
  }, { scope: root });

  const current = journey[active];

  return (
    <section className="journey-section" id="journey" ref={root} aria-labelledby="journey-heading">
      <div className="site-container journey-intro">
        <div className="journey-intro-main">
          <h2 id="journey-heading">One patient journey.<br /><em>One connected record.</em></h2>
        </div>
        <div className="journey-intro-side">
          <p>From the first appointment to the next conversation, see how each part of a dental practice can work together.</p>
          <a href="https://www.novadontics.com/the-platform">Discover the platform <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
      </div>

      <div className="journey-stage" ref={stage}>
        <div className="journey-stage-inner">
          <div className="journey-stage-head">
            <span className="journey-stage-brand">Novadontics <span className="journey-brand-mark" /></span>
            <span className="journey-stage-description">ONE CONNECTED PATIENT JOURNEY</span>
          </div>

          <div className="journey-meter" aria-hidden="true">
            <span className="journey-meter-track" />
            <span className="journey-meter-fill" />
          </div>

          <div className="journey-steps" aria-label="Patient journey stages">
            {journey.map((step, index) => (
              <button
                type="button"
                key={step.name}
                className={`journey-step ${index === active ? "is-active" : ""}`}
                onClick={() => setActive(index)}
                aria-pressed={index === active}
              >
                <span className="journey-step-dot" aria-hidden="true" />
                {step.name}
              </button>
            ))}
          </div>

          <div className="journey-stage-content">
            <div className="journey-stage-copy" aria-live="off">
              <span className="journey-label">A connected workflow</span>
              <div key={current.name} className="journey-copy-transition">
                <h3>{current.action}</h3>
                <p>{current.detail}</p>
              </div>
              <span className="journey-step-caption">Illustrative journey · Actual Novadontics product imagery</span>
            </div>

            <div className="journey-screen-frame" data-step={current.tone}>
              <div className="journey-screen-chrome">
                <span className="journey-dots" aria-hidden="true"><i /><i /><i /></span>
                <span>Novadontics / {current.name}</span>
              </div>
              <div className="journey-screen-image" key={current.name}>
                <Image
                  src={current.image}
                  alt={current.alt}
                  width={1290}
                  height={612}
                  sizes="(max-width: 1099px) 88vw, 55vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="site-container journey-mobile-story">
        {journey.map((step, i) => (
          <div className="journey-mobile-beat" key={step.name}>
            <div className="journey-mobile-marker" aria-hidden="true"><span /></div>
            <div>
              <span className="journey-mobile-name">{step.name}</span>
              <h3>{step.action}</h3>
              <p>{step.detail}</p>
              {(i === 0 || i === 2 || i === 4) && (
                <Image src={step.image} alt={step.alt} width={900} height={430} sizes="(max-width: 768px) 92vw, 45vw" />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
