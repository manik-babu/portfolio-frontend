import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Hero />
      <About />
    </div>
  );
}
