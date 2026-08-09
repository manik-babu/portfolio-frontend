"use client";

import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    FileDown,
    Mail,
    Terminal,
    CheckCircle2,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import KineticGrid from "../templates/HeroBackground";
import { useTheme } from "next-themes";

// Custom SVG Social Icons for perfect rendering & zero dependency errors
const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
);

export const Hero = () => {
    const { theme } = useTheme();
    return (
        <KineticGrid
            background={theme === "dark" ? "#000000" : "#FAFAFA"}
            dotColor={theme === "dark" ? "#2563EB" : "#2563EB"}
            lineColor={theme === "dark" ? "#2563EB" : "#2563EB"}
            trailColor={theme === "dark" ? "#2664EB" : "#2664EB"}
            spacing={50}
            radius={200}
            strength={4}
            trail={true}
        >
            <section id="intro" className="relative min-h-[85vh] w-full flex items-center justify-center overflow-hidden py-12 lg:py-20">
                {/* Background Subtle Gradient & Grid Layer */}
                <div className="absolute inset-0 -z-10 pointer-events-none">
                    {/* Ambient Glow Orbs */}
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-indigo-500/15 dark:bg-indigo-600/10 rounded-full blur-[140px]" />
                    <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-blue-500/10 dark:bg-cyan-500/10 rounded-full blur-[120px]" />

                    {/* Subtle Grid pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                </div>

                <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

                        {/* Left Column - Hero Text Content */}
                        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
                            {/* Headline & Title */}
                            <div className="space-y-3">
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                                    Hi, I'm{" "}
                                    <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
                                        Manik Babu
                                    </span>
                                </h1>
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-700 dark:text-slate-300">
                                        Full-Stack Developer
                                    </span>
                                </div>
                            </div>

                            {/* Value Proposition */}
                            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-normal">
                                I architect and build high-performance, scalable web applications with intuitive user interfaces. Passionate about robust code architectures, modern design systems, and driving business impact through technology.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap items-center gap-4 pt-3 w-full sm:w-auto">
                                <Link
                                    href="#projects"
                                    className={cn(
                                        buttonVariants({ variant: "default", size: "lg" }),
                                        "rounded-full px-7 bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-lg shadow-indigo-600/25 transition-all hover:shadow-indigo-600/40 hover:-translate-y-0.5"
                                    )}
                                >
                                    View Projects
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>

                                <a
                                    href="/docs/Manik_Babu_Full_Stack_Developer_Resume.pdf"
                                    download="Manik_Babu_Full_Stack_Developer_Resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(
                                        buttonVariants({ variant: "outline", size: "lg" }),
                                        "rounded-full px-7 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium transition-all hover:-translate-y-0.5"
                                    )}
                                >
                                    <FileDown className="w-4 h-4 mr-2" />
                                    Download Resume
                                </a>
                            </div>

                            {/* Social Links */}
                            <div className="flex items-center gap-4 pt-5 border-t border-slate-200/80 dark:border-slate-800/80 w-full">
                                <span className="text-xs uppercase font-semibold text-slate-400 dark:text-slate-500 tracking-wider">
                                    Connect With Me:
                                </span>
                                <div className="flex items-center gap-3">
                                    <Link
                                        href="https://github.com/manik-babu"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="GitHub Profile"
                                        className="p-2.5 rounded-full text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/80 transition-all hover:scale-110"
                                    >
                                        <GithubIcon className="w-4 h-4" />
                                    </Link>

                                    <Link
                                        href="https://linkedin.com/in/md-manik-babu"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="LinkedIn Profile"
                                        className="p-2.5 rounded-full text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/80 transition-all hover:scale-110"
                                    >
                                        <LinkedinIcon className="w-4 h-4" />
                                    </Link>

                                    <a
                                        href="mailto:manikbabu.dev@gmail.com"
                                        aria-label="Send Email"
                                        className="p-2.5 rounded-full text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/80 transition-all hover:scale-110"
                                    >
                                        <Mail className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>

                        </div>

                        {/* Right Column - Profile Illustration / Image */}


                    </div>
                </div>
            </section>
        </KineticGrid>
    );
};
