"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Visual proof-of-concept cards supplied in the client brief.
 * The names and quotations have NOT been independently verified.
 * Do not publish as authentic customer endorsements without permission.
 */
const samples = [
  {
    name: "Dr. Marcus Reed",
    initials: "MR",
    practice: "Reed Dental Group, 9 locations",
    quote: "Rolling out a new location used to take months. Now it takes a weekend, same workflows, same reporting.",
    detail: "9 LOCATIONS, ONE DASHBOARD",
  },
  {
    name: "Dr. Anaya Bose",
    initials: "AB",
    practice: "Magnolia Smiles, Nashville",
    quote: "Our no-show rate dropped the first month. The texting just works without anyone touching it.",
    detail: "PATIENT COMMUNICATION",
  },
  {
    name: "Dr. Lena Hart",
    initials: "LH",
    practice: "Harborview Dental, Seattle",
    quote: "Month-end used to eat a full weekend. Now it is two quiet days and the numbers match.",
    detail: "SIMPLER MONTH-END",
  },
  {
    name: "Dr. Sarah Whitman",
    initials: "SW",
    practice: "Whitman Family Dental, Austin",
    quote: "We replaced five logins with one. The front desk got their mornings back, and recall finally runs itself.",
    detail: "22 HRS/WEEK SAVED",
  },
] as const;

export function ReviewCards() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        ".review-example-card",
        { y: 23, opacity: .8 },
        {
          y: 0,
          opacity: 1,
          duration: .7,
          stagger: { each: .11, from: "start" },
          ease: "power2.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 84%",
            once: true,
          },
        },
      );
    });

    return () => media.revert();
  }, { scope: root });

  return (
    <section className="review-examples" aria-labelledby="review-examples-title" ref={root} id="reviews">
      <header className="review-examples-heading">
        <div>
          <span className="review-examples-kicker">Practice perspectives</span>
          <h3 id="review-examples-title">Made for teams that do it all.</h3>
        </div>
        <p>Four sample stories, presented in a clearer format.</p>
      </header>

      <div className="review-example-grid">
        {samples.map((review) => (
          <article className="review-example-card" key={review.name}>
            <div className="review-example-author">
              <span className="review-example-avatar" aria-hidden="true">{review.initials}</span>
              <div>
                <h4>{review.name}</h4>
                <p>{review.practice}</p>
              </div>
            </div>
            <blockquote>“{review.quote}”</blockquote>
            <span className="review-example-detail">{review.detail}</span>
          </article>
        ))}
      </div>
      <p className="review-examples-disclaimer">
        Illustrative testimonials from the design brief. Replace with approved, verified customer feedback before publication.
      </p>
    </section>
  );
}
