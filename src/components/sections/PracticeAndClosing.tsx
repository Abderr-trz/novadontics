"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CustomerVoice } from "./CustomerVoice";
import { ReviewCards } from "./ReviewCards";
import { Onboarding } from "./Onboarding";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const audiences = [
  { title: "Independent practices", text: "A clear, connected foundation for the everyday work of running a dental practice.", href: "https://www.novadontics.com/solutions/independent-practices" },
  { title: "Specialists & implant dentists", text: "From clinical imaging to implant case management, more of your workflow lives together.", href: "https://www.novadontics.com/platform/implant-dentistry-tools" },
  { title: "New dental practices", text: "Build your daily clinical and administrative workflows on a connected foundation from the start.", href: "https://www.novadontics.com/solutions/new-practices" },
  { title: "Groups & DSOs", text: "Bring people, reporting and operations together across multiple locations.", href: "https://www.novadontics.com/solutions/groups-dsos" },
];

export function PracticeAndClosing() {
  const closing = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(".closing-orbit",
        { yPercent: -10, scale: .85, autoAlpha: .32 },
        {
          yPercent: 4, scale: 1, autoAlpha: .9, ease: "none",
          scrollTrigger: {
            trigger: closing.current,
            start: "top bottom",
            end: "bottom 43%",
            scrub: .9,
          },
        },
      );
      gsap.from(".closing-content h2", {
        y: 34, autoAlpha: 0, duration: .9, ease: "power3.out",
        scrollTrigger: {
          trigger: closing.current,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });
    });
    return () => mm.revert();
  }, { scope: closing });

  return (
    <>
      <section id="solutions" className="audience-section" aria-labelledby="audience-title">
        <div className="site-container">
          <div className="audience-heading">
            <h2 id="audience-title">Every practice<br />has its <em>own way.</em></h2>
            <p>One connected platform, thoughtfully built around the people and workflows that make your practice unique.</p>
          </div>
          <div className="audience-layout">
            <div className="audience-image">
              <Image src="/assets/novadontics/practice-team.webp" alt="Dental professional at work using a tablet" fill sizes="(max-width: 767px) 90vw, 47vw" />
            </div>
            <div className="audience-list">
              {audiences.map((item) => (
                <a href={item.href} key={item.title} className="audience-item">
                  <div><h3>{item.title}</h3><p>{item.text}</p></div>
                  <ArrowUpRight size={21} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <CustomerVoice />
          <ReviewCards />
        </div>
      </section>
      <Onboarding />
      <section className="closing-section" ref={closing} aria-labelledby="closing-title">
        <div className="closing-orbit" aria-hidden="true" />
        <div className="site-container">
          <div className="closing-content">
            <h2 id="closing-title">Less administration.<br /><em>More room for care.</em></h2>
            <div className="closing-aside">
              <p>See how your entire practice could work together.</p>
              <a href="https://www.novadontics.com/book-a-demo" className="closing-button">Book a free demo <ArrowUpRight size={17} aria-hidden="true" /></a>
            </div>
          </div>
          <footer className="footer">
            <a href="#main" aria-label="Back to top"><Image src="/assets/novadontics/LogoColorAndWhite.svg" alt="Novadontics" width={170} height={38} /></a>
            <div>
              <a href="#platform">Platform</a>
              <a href="#features">Features</a>
              <a href="#solutions">Solutions</a>
              <a href="https://www.novadontics.com/contact">Contact</a>
            </div>
            <span>© Novadontics</span>
          </footer>
        </div>
      </section>
    </>
  );
}
