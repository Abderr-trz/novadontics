import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const officialPortrait =
  "https://cdn.prod.website-files.com/6a5369bc29a68e66179e0bc0/6ad8852836f87a7bd62069aa_6a87258fc431f449325ef5a5_Dr%2520Yana%2520Pekarski%25201.jpeg";

/** The quotation and attribution are from the official Novadontics testimonials page. */
export function CustomerVoice() {
  return (
    <div className="customer-voice" aria-labelledby="customer-voice-heading">
      <div className="customer-voice-copy">
        <div className="customer-voice-topline">
          <span className="customer-voice-accent" aria-hidden="true" />
          <span>From the people who use it</span>
        </div>
        <h3 id="customer-voice-heading">Made for dentistry.<br /><em>Trusted in practice.</em></h3>
        <blockquote>
          “Novadontics has been an absolute game-changer for our office. It has streamlined our operations, elevated our patient care.”
        </blockquote>
        <div className="customer-voice-attribution">
          <span>Dr. Yana Pekarski, DDS</span>
          <span>Sacramento, California</span>
        </div>
        <a href="https://www.novadontics.com/testimonials">
          Read real customer stories <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>
      <div className="customer-voice-photo">
        <Image
          src={officialPortrait}
          alt="Dr. Yana Pekarski, dental professional featured in Novadontics testimonials"
          width={900}
          height={1100}
          sizes="(max-width: 767px) 92vw, (max-width: 1050px) 40vw, 34vw"
        />
        <span>Customer perspective</span>
      </div>
    </div>
  );
}
