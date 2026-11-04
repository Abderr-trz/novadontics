"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Product imagery is authentic Novadontics media. The order below tells an
 * illustrative care journey, not the history of an actual patient.
 */
const moments = [
  {
    id: "appointment",
    name: "Appointment",
    title: "It starts before they arrive.",
    description: "A scheduled visit and the patient's information belong in the same practice workflow. Your team begins with the context it needs.",
    image: "https://cdn.prod.website-files.com/6a3c0959f5ad49988da23e13/6a43fc02a9a03a2c7c5d1605_d4c41bf325eb4634ae9f31a9f932d25e_calendar.avif",
    alt: "Official Novadontics scheduling and calendar interface",
  },
  {
    id: "record",
    name: "Patient record",
    title: "The full picture, at every chair.",
    description: "Clinical notes, charting and treatment plans stay tied to the patient record, keeping the team aligned from visit to visit.",
    image: "/assets/novadontics/practice-management.avif",
    alt: "Official Novadontics practice management product screenshot",
  },
  {
    id: "imaging",
    name: "Clinical imaging",
    title: "See what matters, in context.",
    description: "Review imaging alongside clinical information, without breaking the flow of care or hunting through disconnected tools.",
    image: "/assets/novadontics/clinical-imaging.avif",
    alt: "Official Novadontics clinical imaging product screenshot",
  },
  {
    id: "billing",
    name: "Billing & payments",
    title: "Care and operations stay in sync.",
    description: "From treatment to billing and patient payments, the administrative side stays connected to the same practice workflow.",
    image: "https://cdn.prod.website-files.com/6a3c0959f5ad49988da23e13/6a49340368be0cc0c1ace0e1_portal.avif",
    alt: "Official Novadontics patient portal and payment experience visual",
  },
  {
    id: "followup",
    name: "Follow-up",
    title: "The relationship goes beyond the visit.",
    description: "Patient communication, reminders and the next appointment stay part of one continuous experience.",
    image: "/assets/novadontics/patient-engagement.avif",
    alt: "Official Novadontics patient engagement product visual",
  },
] as const;

export function PatientJourney() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 960px) and (prefers-reduced-motion: no-preference)", () => {
      const beats = gsap.utils.toArray<HTMLElement>(".journey-beat");
      const triggers = beats.map((beat, index) =>
        ScrollTrigger.create({
          trigger: beat,
          start: "top 58%",
          end: "bottom 58%",
          onEnter: () => setActive(index),
          onEnterBack: () => setActive(index),
        }),
      );

      const progress = gsap.fromTo(
        ".journey-progress-fill",
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".journey-beats",
            start: "top 58%",
            end: "bottom 58%",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        },
      );

      return () => {
        triggers.forEach((trigger) => trigger.kill());
        progress.scrollTrigger?.kill();
        progress.kill();
      };
    });

    return () => mm.revert();
  }, { scope: root });

  return (
    <section id="journey" ref={root} className="journey-section" aria-labelledby="journey-heading">
      <div className="site-container journey-intro">
        <div className="journey-intro-main">
          <span className="journey-eyebrow">The connected patient record</span>
          <h2 id="journey-heading">
            One patient journey.
            <span>One connected record.</span>
          </h2>
        </div>
        <div className="journey-intro-side">
          <p>Good care is continuous. Your software should be, too. Follow the moments that connect one visit to the next.</p>
          <a href="https://www.novadontics.com/the-platform">
            Explore the platform <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="journey-story">
        <div className="site-container journey-story-grid">
          <div className="journey-showcase" aria-label="Authentic Novadontics product screens along the patient journey">
            <div className="journey-showcase-inner">
              <div className="journey-showcase-top">
                <span className="journey-showcase-label">
                  <span className="journey-showcase-signal" aria-hidden="true" />
                  ONE CONNECTED RECORD
                </span>
                <span className="journey-counter">{String(active + 1).padStart(2, "0")} / 05</span>
              </div>
              <div className="journey-screen-stage">
                <div className="journey-screen-glow" aria-hidden="true" />
                {moments.map((moment, index) => (
                  <div
                    className={`journey-screen-layer ${index === active ? "is-active" : ""}`}
                    key={moment.id}
                    aria-hidden={index !== active}
                  >
                    <Image
                      src={moment.image}
                      alt={moment.alt}
                      width={1290}
                      height={612}
                      sizes="(max-width: 959px) 90vw, (max-width: 1440px) 52vw, 700px"
                      priority={index === 0}
                    />
                  </div>
                ))}
              </div>
              <div className="journey-showcase-bottom">
                <span>{moments[active].name}</span>
                <span>One practice. One patient record.</span>
              </div>
            </div>
          </div>

          <div className="journey-beats">
            <span className="journey-spine" aria-hidden="true">
              <span className="journey-progress-fill" />
            </span>
            {moments.map((moment, index) => (
              <article
                id={`journey-${moment.id}`}
                key={moment.id}
                className={`journey-beat ${index === active ? "is-active" : ""}`}
                aria-label={moment.name}
              >
                <span className="journey-beat-dot" aria-hidden="true" />
                <div className="journey-beat-index">
                  <span>{String(index + 1).padStart(2, "0")} / 05</span>
                  <span>{moment.name}</span>
                </div>
                <h3>{moment.title}</h3>
                <p>{moment.description}</p>
              </article>
            ))}
          </div>
        </div>
        <p className="site-container journey-disclaimer">
          Illustrative patient journey using authentic Novadontics product visuals.
        </p>
      </div>

      <div className="site-container journey-mobile-story">
        {moments.map((moment, index) => (
          <article className="journey-mobile-beat" key={moment.id}>
            <span className="journey-mobile-index">{String(index + 1).padStart(2, "0")} / 05 — {moment.name}</span>
            <h3>{moment.title}</h3>
            <p>{moment.description}</p>
            <Image
              src={moment.image}
              alt={moment.alt}
              width={900}
              height={430}
              sizes="(max-width: 959px) 88vw, 450px"
            />
          </article>
        ))}
        <p className="journey-mobile-disclaimer">
          Illustrative patient journey using authentic Novadontics product visuals.
        </p>
      </div>
    </section>
  );
}
