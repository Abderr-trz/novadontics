import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import "./platform-showcase.css";
import "./product-story.css";
import "./novadontics-brand-motion.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Novadontics — All-in-One Dental Practice Management Software",
  description:
    "Novadontics connects dental scheduling, patient engagement, clinical management, imaging, billing, and implant workflows within one integrated cloud-based platform.",
  openGraph: {
    title: "Novadontics — Your entire practice. Finally in sync.",
    description:
      "All-in-one cloud-based dental practice management and EHR software for general dentistry and implant practices.",
    images: ["/assets/novadontics/opengraph.jpg"],
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-ink">
        {children}
      </body>
    </html>
  );
}
