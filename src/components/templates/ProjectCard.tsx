import { ExternalLink, ArrowUpRight } from "lucide-react"
import ImageSlider from "./ImageSlider"
import { GithubIconTheme } from "../icons/githubIcon"
import Link from "next/link"
import { Project } from "@/@types/project"
import { useState } from "react"
import { ProjectDetailsDialog } from "./ProjectDetailsDialog"




export const ProjectCard = ({ isLeft, images, title, description, liveDemo, githubClient, githubServer, techStack, details }: Project & { isLeft?: boolean }) => {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <div className={`flex flex-wrap md:flex-nowrap gap-9 py-14 ${isLeft ? "md:flex-row-reverse" : ""}`}>
            <section className="w-full">
                <ImageSlider images={images} />
            </section>

            <section className="flex flex-col justify-between gap-6 w-full">
                <div className="flex flex-col gap-3">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white leading-snug">
                        {title}
                    </h1>

                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                        {techStack.frontend.map((tech) => (
                            <span
                                key={tech}
                                className="px-2.5 py-1 rounded-full text-xs font-medium
                                           bg-indigo-50 text-indigo-700 border border-indigo-200
                                           dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-500/20"
                            >
                                {tech}
                            </span>
                        ))}
                        {techStack.backend.map((tech) => (
                            <span
                                key={tech}
                                className="px-2.5 py-1 rounded-full text-xs font-medium
                                           bg-emerald-50 text-emerald-700 border border-emerald-200
                                           dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20"
                            >
                                {tech}
                            </span>
                        ))}
                        {techStack.database.map((tech) => (
                            <span
                                key={tech}
                                className="px-2.5 py-1 rounded-full text-xs font-medium
                                           bg-amber-50 text-amber-700 border border-amber-200
                                           dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    {/* Links */}
                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            href={liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-medium
                                       text-gray-700 dark:text-gray-200
                                       hover:text-primary dark:hover:text-primary
                                       transition-colors"
                        >
                            <ExternalLink size={16} />
                            Live Demo
                        </Link>

                        <span className="text-gray-300 dark:text-gray-700">•</span>
                        <Link

                            href={githubClient}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-medium
                                       text-gray-700 dark:text-gray-200
                                       hover:text-primary dark:hover:text-primary
                                       transition-colors"
                        >
                            <GithubIconTheme className="w-4 h-4" />
                            Frontend
                        </Link>

                        <span className="text-gray-300 dark:text-gray-700">•</span>
                        <Link

                            href={githubServer}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-medium
                                       text-gray-700 dark:text-gray-200
                                       hover:text-primary dark:hover:text-primary
                                       transition-colors"
                        >
                            <GithubIconTheme className="w-4 h-4" />
                            Backend
                        </Link>
                    </div>

                    {/* Details CTA */}
                    <button
                        onClick={() => setOpen(true)}
                        className="group inline-flex items-center justify-center gap-2 w-fit
                                   px-5 py-2.5 rounded-lg
                                   bg-linear-to-r from-indigo-600 via-indigo-500 to-blue-500 text-white cursor-pointer text-sm font-semibold
                                   hover:bg-primary/90
                                   transition-all duration-300"
                    >
                        View Project Details
                        <ArrowUpRight
                            size={16}
                            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                    </button>
                    <ProjectDetailsDialog open={open} onOpenChange={(open) => setOpen(open)} details={details} />

                </div>
            </section>
        </div>
    )
}