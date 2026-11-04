import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { ConnectedPlatform } from "@/components/sections/ConnectedPlatform";
import { ProductExperience } from "@/components/sections/ProductExperience";
import { PracticeAndClosing } from "@/components/sections/PracticeAndClosing";

export default function Home() {
  return <><Navbar /><main id="main"><Hero /><ConnectedPlatform /><ProductExperience /><PracticeAndClosing /></main></>;
}
