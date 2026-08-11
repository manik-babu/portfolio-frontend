"use client"

import { projects } from "@/data/projects";
import { ProjectCard } from "../templates/ProjectCard";
import { Separator } from "../ui/separator";

export const ProjectsSection = () => {

    return (
        <div id="projects" className="space-y-4 py-28">
            <SectionHeader />
            <div className="flex max-w-7xl flex-col items-center gap-8 px-8">
                {projects.map((project, index) => (
                    <div key={index}>
                        <ProjectCard  {...project} isLeft={index % 2 === 1} />
                        <Separator />
                    </div>

                ))}
            </div>
        </div>
    );
}
function SectionHeader() {

    return (
        <div className="text-center mb-14 sm:mb-16">
            <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white"
            >
                Selected {" "}
                <span className="bg-linear-to-r from-indigo-600 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
                    Projects
                </span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Here are some of the selected projects that I have worked on.
            </p>
        </div>
    );
}