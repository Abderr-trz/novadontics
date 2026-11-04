"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Genuine Novadontics screenshots. The concise copy is specific to dentistry,
// rather than borrowing Attio's sales CRM terminology or interface imagery.
const workflows = [
  {
    id: "practice",
    label: "Practice management",
    headline: "The whole day, in one place.",
    summary: "Schedules, charts and billing stay connected, giving every team member a clearer view of the work ahead.",
    image: "/assets/novadontics/practice-management.avif",
    alt: "Actual Novadontics practice management software interface",
    link: "https://www.novadontics.com/platform/practice-management",
    linkText: "Explore practice management",
  },
  {
    id: "patients",
    label: "Patient engagement",
    headline: "A better patient experience.",
    summary: "From reminders to paperless forms, communication stays close to the patient record and your daily workflow.",
    image: "/assets/novadontics/patient-engagement.avif",
    alt: "Actual Novadontics patient engagement software interface",
    link: "https://www.novadontics.com/platform/patient-engagement",
    linkText: "Explore patient engagement",
  },
  {
    id: "imaging",
    label: "Clinical imaging",
    headline: "Every clinical detail, in context.",
    summary: "Keep imaging and clinical information connected to the visit, so the next decision is easier to make.",
    image: "/assets/novadontics/clinical-imaging.avif",
    alt: "Actual Novadontics clinical imaging interface",
    link: "https://www.novadontics.com/platform/clinical-imaging",
    linkText: "Explore clinical imaging",
  },
  {
    id: "implants",
    label: "Implant dentistry",
    headline: "Precision in every step.",
    summary: "Purpose-built implant tools bring treatment planning, case records and digital logbooks into one workflow.",
    image: "/assets/novadontics/implant-management.avif",
    alt: "Actual Novadontics implant management software screen",
    link: "https://www.novadontics.com/platform/implant-dentistry-tools",
    linkText: "Explore implant dentistry",
  },
] as const;

export function ProductExperience() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 960px)", () => {
      const panels = gsap.utils.toArray<HTMLElement>(".product-story-panel");
      const triggers = panels.map((panel, index) =>
        ScrollTrigger.create({
          trigger: panel,
          start: "top 48%",
          end: "bottom 48%",
          onEnter: () => setActive(index),
          onEnterBack: () => setActive(index),
        }),
      );
      return () => triggers.forEach((trigger) => trigger.kill());
    });

    mm.add("(min-width: 960px) and (prefers-reduced-motion: no-preference)", () => {
      const media = gsap.utils.toArray<HTMLElement>(".product-story-media");
      media.forEach((element) => {
        gsap.fromTo(
          element.querySelector("img"),
          { y: 32, opacity: 0.78 },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top 94%",
              end: "top 49%",
              scrub: 0.55,
            },
          },
        );
      });
    });

    return () => mm.revert();
  }, { scope: root });

  return (
    <section
      id="features"
      ref={root}
      className="product-story-section"
      aria-labelledby="product-title"
    >
      <div className="site-container">
        <header className="product-story-heading">
          <h2 id="product-title">
            A more connected way <span>to work.</span>
          </h2>
          <p>
            Everything your team needs, working together. Explore the real
            Novadontics tools behind a simpler, more connected practice.
          </p>
        </header>

        <div className="product-story-grid">
          <nav className="product-story-navigation" aria-label="Explore platform workflows">
            <div className="product-story-navlist">
              {workflows.map((workflow, index) => (
                <a
                  key={workflow.id}
                  href={`#feature-${workflow.id}`}
                  className={`product-story-navitem ${active === index ? "is-active" : ""}`}
                  aria-current={active === index ? "location" : undefined}
                  onClick={() => setActive(index)}
                >
                  {workflow.label}
                </a>
              ))}
            </div>
          </nav>

          <div className="product-story-scenes">
            {workflows.map((workflow) => (
              <article
                id={`feature-${workflow.id}`}
                className="product-story-panel"
                key={workflow.id}
                aria-label={workflow.label}
              >
                <h3 className="product-story-statement">
                  <span>{workflow.headline}</span>{" "}
                  <span className="product-story-statement-muted">{workflow.summary}</span>
                </h3>

                <figure className={`product-story-media product-story-media--${workflow.id}`}>
                  <Image
                    src={workflow.image}
                    alt={workflow.alt}
                    width={1290}
                    height={612}
                    sizes="(max-width: 959px) 94vw, (max-width: 1440px) 72vw, 1050px"
                  />
                </figure>

                <a className="product-story-link" href={workflow.link}>
                  {workflow.linkText}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
