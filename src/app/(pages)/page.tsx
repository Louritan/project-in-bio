import { Header } from "@/app/components/header";
import { Hero } from "@/app/components/hero";
import { VideoExplanation } from "@/app/components/video-explanation";
import { Pricing } from "@/app/components/pricing";
import { FAQ } from "@/app/components/faq";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <Header />
      <Hero />
      <VideoExplanation />
      <Pricing />
      <FAQ />
    </div>
  );
}
