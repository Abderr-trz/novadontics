"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

interface TextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  stagger?: number;
  splitBy?: "lines" | "words";
}

export function TextReveal({
  children,
  className = "",
  as: Tag = "h1",
  delay = 0,
  stagger = 0.08,
  splitBy = "lines",
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      el.style.opacity = "1";
      return;
    }

    const parts =
      splitBy === "lines" ? children.split("\n") : children.split(" ");
    el.innerHTML = "";

    parts.forEach((part) => {
      const wrapper = document.createElement("span");
      wrapper.style.display = splitBy === "lines" ? "block" : "inline-block";
      wrapper.style.overflow = "hidden";
      wrapper.style.verticalAlign = "top";

      const inner = document.createElement("span");
      inner.textContent = splitBy === "words" ? part + "\u00A0" : part;
      inner.style.display = "block";
      inner.style.transform = "translateY(110%)";

      wrapper.appendChild(inner);
      el.appendChild(wrapper);
    });

    const inners = el.querySelectorAll("span > span");

    const tl = gsap.timeline({ delay });
    tl.to(inners, {
      y: 0,
      duration: 0.9,
      stagger,
      ease: "power3.out",
    });

    return () => {
      tl.kill();
    };
  }, [children, delay, stagger, splitBy]);

  return (
    <div
      ref={containerRef}
      className={className}
      role="heading"
      aria-level={Tag === "h1" ? 1 : Tag === "h2" ? 2 : Tag === "h3" ? 3 : undefined}
      style={{ opacity: 1 }}
    >
      {children}
    </div>
  );
}
