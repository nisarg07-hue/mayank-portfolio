import { HomeClient } from "@/components/HomeClient";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { VideoPortfolio } from "@/components/sections/VideoPortfolio";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <HomeClient />

        <VideoPortfolio />

        <About />
        <Contact />
      </main>
    </div>
  );
}
