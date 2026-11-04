"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Platform", href: "#platform" },
  { label: "Solutions", href: "#solutions" },
  { label: "Resources", href: "https://www.novadontics.com/resources" },
  { label: "Pricing", href: "https://www.novadontics.com/pricing" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menu.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (event.key === "Tab") {
        const links = menu.current?.querySelectorAll<HTMLAnchorElement>("a");
        if (!links?.length) return;
        if (event.shiftKey && document.activeElement === links[0]) {
          event.preventDefault();
          toggle.current?.focus();
        } else if (!event.shiftKey && document.activeElement === links[links.length - 1]) {
          event.preventDefault();
          toggle.current?.focus();
        } else if (document.activeElement === toggle.current) {
          event.preventDefault();
          (event.shiftKey ? links[links.length - 1] : links[0]).focus();
        }
      }
    };

    const desktop = window.matchMedia("(min-width: 1061px)");
    const onResize = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", onResize);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", onResize);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <nav className="site-container navigation" aria-label="Main navigation">
          <a href="#main" className="brand-link" aria-label="Novadontics home" onClick={() => setOpen(false)}>
            <Image src="/assets/novadontics/LogoColorAndGray.svg" alt="Novadontics" width={174} height={37} priority />
          </a>

          <div className="desktop-links">
            {navLinks.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
          </div>

          <div className="nav-actions">
            <a className="nav-secondary" href="https://www.novadontics.com/pricing">View pricing</a>
            <a className="nav-demo" href="https://www.novadontics.com/book-a-demo">Book a demo</a>
          </div>

          <button
            ref={toggle}
            className="menu-toggle"
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-controls="mobile-menu"
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </nav>
      </header>

      {open && (
        <div id="mobile-menu" ref={menu} className="mobile-menu" role="dialog" aria-label="Navigation menu" aria-modal="true">
          <div className="mobile-menu-links">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} onClick={() => { setOpen(false); toggle.current?.focus(); }}>
                {link.label}<ArrowUpRight size={19} aria-hidden="true" />
              </a>
            ))}
          </div>
          <div className="mobile-menu-bottom">
            <p>Everything your practice needs, connected.</p>
            <a className="hero-button-primary" href="https://www.novadontics.com/book-a-demo">
              Book a free demo
            </a>
          </div>
        </div>
      )}
    </>
  );
}
