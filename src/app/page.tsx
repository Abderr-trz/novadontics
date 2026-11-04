import { Navbar } from "@/components/layout/Navbar";
import { HeroPlatformTransition } from "@/components/sections/HeroPlatformTransition";
import { ProductExperience } from "@/components/sections/ProductExperience";
import { PracticeAndClosing } from "@/components/sections/PracticeAndClosing";

export default function Home() {
  return <><Navbar /><main id="main"><HeroPlatformTransition /><ProductExperience /><PracticeAndClosing /></main></>;
}
