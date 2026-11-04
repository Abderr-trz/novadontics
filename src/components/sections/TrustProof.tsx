import Image from "next/image";
import { Star, Award } from "lucide-react";

const awards = [
  { name: "Best Value", source: "Capterra" },
  { name: "Best Functionality", source: "GetApp" },
  { name: "Best Customer Support", source: "Software Advice" },
];

export function AwardsBand() {
  return (
    <aside className="awards-band" aria-label="Customer ratings and 2025 awards">
      <div className="site-container awards-content">
        <div className="review-score">
          <div className="review-stars" aria-label="Rated 4.8 out of 5">
            {Array.from({ length: 5 }, (_, i) => <Star key={i} size={14} fill="currentColor" strokeWidth={0} aria-hidden="true" />)}
          </div>
          <p><strong>4.8/5</strong> from 300+ reviews</p>
        </div>
        <div className="award-list">
          {awards.map((award) => <div className="award-item" key={award.source}><Award size={18} strokeWidth={1.5} aria-hidden="true" /><span><strong>{award.name}</strong> · {award.source}</span></div>)}
        </div>
      </div>
    </aside>
  );
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
  return (
    <div className="practice-proof">
      <div className="practice-proof-copy">
        <p>Trusted by dental practices across all 50 states.</p>
      </div>
      <ul className="practice-logo-grid" aria-label="Dental practices using Novadontics">
        {practices.map(([file, name]) => <li key={file}><Image src={`/assets/novadontics/${file}`} alt={name} width={190} height={72} sizes="(max-width: 767px) 38vw, 150px" className="practice-logo" /></li>)}
      </ul>
    </div>
  );
}
