"use client";

import Image from "next/image";
import { PracticeLogos } from "./TrustProof";

// Every image below is an authentic Novadontics asset stored in the project.
const secondaryScreens = [
  {
    kind: "patient",
    label: "Patient engagement",
    src: "/assets/novadontics/patient-engagement.avif",
    alt: "Novadontics patient engagement interface",
    width: 720,
    height: 480,
  },
  {
    kind: "clinical",
    label: "Clinical imaging",
    src: "/assets/novadontics/clinical-imaging.avif",
    alt: "Novadontics clinical imaging interface",
    width: 740,
    height: 500,
  },
  {
    kind: "implant",
    label: "Implant workflows",
    src: "/assets/novadontics/implant-management.avif",
    alt: "Novadontics implant management interface",
    width: 720,
    height: 500,
  },
] as const;

function BrowserChrome() {
  return (
    <span className="platform-window-dots" aria-hidden="true">
      <span /><span /><span />
    </span>
  );
}

export function ConnectedPlatform() {
  return (
    <section id="platform" className="platform-showcase" aria-labelledby="platform-scene-title">
      <h2 id="platform-scene-title" className="sr-only">One connected dental practice in Novadontics</h2>
      <div className="platform-showcase-glow" aria-hidden="true" />
      <div className="platform-showcase-lines" aria-hidden="true" />

      <div className="platform-stage">
        <div className="platform-stage-sticky">
          <div className="platform-composition" aria-label="Actual Novadontics practice-management, patient engagement, clinical imaging and implant workflows shown together">
        <figure className="platform-main-window">
          <div className="platform-window-chrome">
            <BrowserChrome />
            <span className="platform-window-heading">Practice management</span>
          </div>
          <div className="platform-main-image">
            <Image
              src="/assets/novadontics/practice-management.avif"
              alt="Actual Novadontics practice management dashboard"
              width={1290}
              height={612}
              sizes="(max-width: 767px) 94vw, (max-width: 1179px) 88vw, (max-width: 1440px) 68vw, 950px"
              priority
            />
          </div>
          <figcaption className="platform-main-footer">
            <span className="platform-status-dot" /> One connected workspace
          </figcaption>
        </figure>

        {secondaryScreens.map((screen) => (
          <figure className={`platform-floating-window platform-${screen.kind}`} key={screen.kind}>
            <div className="platform-window-chrome"><BrowserChrome /></div>
            <figcaption className="platform-floating-label">{screen.label}</figcaption>
            <div className="platform-floating-image">
              <Image
                src={screen.src}
                alt={screen.alt}
                width={screen.width}
                height={screen.height}
                sizes="(max-width: 767px) 90vw, (max-width: 1179px) 44vw, (max-width: 1440px) 25vw, 340px"
              />
            </div>
          </figure>
        ))}
          </div>
        </div>
      </div>

      <div className="site-container platform-client-strip">
        <PracticeLogos />
      </div>
    </section>
  );
}
