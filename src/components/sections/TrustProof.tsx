import Image from "next/image";
import { Star, Award } from "lucide-react";

const awards = [
  { name: "Best Value", source: "Capterra" },
  { name: "Best Functionality", source: "GetApp" },
  { name: "Best Customer Support", source: "Software Advice" },
];

export function AwardsBand() {
  return (
    <aside className="awards-band" aria-label="Customer reviews and 2025 awards">
      <div className="site-container awards-content">
        <div className="review-score">
          <div className="review-stars" aria-label="Rated 4.8 out of 5">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={15} fill="currentColor" strokeWidth={0} aria-hidden="true" />)}</div>
          <div><strong>4.8<span>/5</span></strong><p>from 300+ reviews</p></div>
        </div>
        <div className="award-list">{awards.map((award) => <div className="award-item" key={award.source}><Award size={22} strokeWidth={1.4} aria-hidden="true" /><div><strong>{award.name}</strong><span>{award.source} <span className="award-year">· 2025</span></span></div></div>)}</div>
      </div>
    </aside>
  );
}

export function AwardBadges() {
  return <div className="hero-recognition"><Image src="/assets/novadontics/awards-2025.avif" alt="2025 awards: Software Advice Best Customer Support, GetApp Best Functionality and Features, Capterra Best Value" width={420} height={122} sizes="250px" /><span>Recognized for what<br /><strong>matters to your practice.</strong></span></div>;
}

const practices = [
  ["fleur-de-lis.webp", "Fleur De Lis Dental Care"],
  ["artlab.webp", "ArtLab Dentistry"],
  ["hurst.webp", "Hurst Dental Care"],
  ["bright-smile.webp", "Bright Smile Design"],
  ["dental-spa.webp", "Dental Spa Oklahoma"],
  ["mountainside.webp", "Mountainside Oral Implantology & Prosthetics"],
  ["sacramento.webp", "Sacramento Holistic Dentistry"],
  ["ross.webp", "Ross Dental"],
];

export function PracticeLogos() {
  return <div className="practice-proof"><div className="practice-proof-copy"><p className="section-kicker">IN GOOD COMPANY</p><h3>Different practices.<br /><span>Shared confidence.</span></h3><p>Trusted by practices across all <strong>50 states</strong>, from single offices to multi-location groups.</p></div><ul className="practice-logo-grid" aria-label="Practices using Novadontics">{practices.map(([file, name]) => <li key={file}><Image src={`/assets/novadontics/${file}`} alt={name} width={220} height={100} sizes="(max-width: 767px) 38vw, 180px" className="practice-logo" /></li>)}</ul></div>;
}
