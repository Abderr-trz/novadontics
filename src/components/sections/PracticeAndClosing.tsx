import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PracticeLogos } from "./TrustProof";

const audiences = [
  { number: "01", title: "Independent practices", text: "The essentials a single office needs to run and grow, without an IT team.", href: "https://www.novadontics.com/solutions/independent-practices" },
  { number: "02", title: "Specialists & implant dentists", text: "Implant, perio and endo tools built into the platform you use every day.", href: "https://www.novadontics.com/platform/implant-dentistry-tools" },
  { number: "03", title: "Groups & DSOs", text: "Connect locations with shared workflows, central billing and roll-up reporting.", href: "https://www.novadontics.com/who-we-are-for" },
];

export function PracticeAndClosing() {
  return <>
    <section id="solutions" className="audience-section" aria-labelledby="audience-title">
      <div className="site-container">
        <PracticeLogos />
        <div className="audience-top">
          <div><p className="section-kicker"><span /> 03 / BUILT AROUND YOU</p><h2 id="audience-title">Every practice<br /><em>has its own rhythm.</em></h2></div>
          <p>One platform, made to meet you wherever you are in your practice journey.</p>
        </div>
        <div className="audience-layout">
          <div className="audience-image"><Image src="/assets/novadontics/practice-team.webp" alt="Dental professional using a tablet in a Novadontics practice" fill sizes="(max-width: 767px) 90vw, 45vw" /><span>MORE ROOM FOR WHAT MATTERS</span></div>
          <div className="audience-list">{audiences.map(item => <a href={item.href} key={item.number} className="audience-item"><span>{item.number}</span><div><h3>{item.title}</h3><p>{item.text}</p></div><ArrowUpRight size={18} aria-hidden="true" /></a>)}</div>
        </div>
      </div>
    </section>
    <section className="closing-section" aria-labelledby="closing-title">
      <div className="site-container">
        <p className="section-kicker">04 / A BETTER WAY TO PRACTICE</p>
        <div className="closing-content"><h2 id="closing-title">Less administration.<br /><span>More room for care.</span></h2><div><p>See what a more connected practice could look like.</p><a href="https://www.novadontics.com/book-a-demo" className="closing-button">Book a Free Demo <ArrowRight size={17} aria-hidden="true" /></a></div></div>
        <footer className="footer"><a href="#main" aria-label="Novadontics home"><Image src="/assets/novadontics/LogoColorAndWhite.svg" alt="Novadontics" width={170} height={38} /></a><div><a href="#platform">Platform</a><a href="#solutions">Solutions</a><a href="https://www.novadontics.com/contact">Contact</a></div><span>© Novadontics</span></footer>
      </div>
    </section>
  </>;
}

