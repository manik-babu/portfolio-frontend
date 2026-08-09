import { HtmlIcon } from "@/components/icons/Html";
import { About } from "@/components/sections/About";
import ContactMe from "@/components/sections/ContactMe";
import { Hero } from "@/components/sections/Hero";
import { ProjectsSection } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { ProjectCard } from "@/components/templates/ProjectCard";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Hero />
      <About />
      <Skills />
      <ProjectsSection />
      <ContactMe />
    </div>
  );
}
