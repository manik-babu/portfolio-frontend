"use client";

import { useEffect, useRef } from "react";
import { HtmlIcon } from "../icons/Html";
import { TanstackIcon } from "../icons/Tanstack";
import { MysqlIcon } from "../icons/MySql";
import { PostgresqlIcon } from "../icons/PostgreSql";
import { MongodbIcon } from "../icons/Mongodb";
import { PrismaIcon } from "../icons/Prisma";
import { GithubIcon } from "../icons/github";
import { DockerIcon } from "../icons/docker";
import { LinuxIcon } from "../icons/Linux";
import { VercelIcon } from "../icons/Vercel";
import { RailwayIcon } from "../icons/railway";
import { PostmanIcon } from "../icons/postman";
import { NodejsIconAltIcon } from "../icons/nodejs";
import { GolangIcon } from "../icons/golang";
import { GlowCard } from "../ui/SpotlightCard";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Skill {
    name: string;
    icon: React.ReactNode;
}

interface SkillCategory {
    title: string;
    accent: string;
    badgeBg: string;
    badgeBorder: string;
    icon: React.ReactNode;
    skills: Skill[];
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const Icons = {
    HTML: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32"><path d="M4.46 28.802L1.892.001h28.216l-2.57 28.797L15.982 32z" fill="#e44d26" /><path d="M25.337 26.964l2.197-24.608H16v27.197z" fill="#f16529" /><path d="M15.988 5.888H7.142l.953 10.682H16v-3.532h-4.674l-.323-3.617H16V5.888zM16 22.2l-.015.004-3.934-1.062-.25-2.817H8.253l.495 5.546 7.236 2 .016-.005z" fill="#ebebeb" /><path d="M15.988 16.57h4.35l-.4 4.58-3.94 1.063v3.675l7.242-2.007.97-10.845H16zm8.764-9.734l.084-.948h-8.85V9.42h8.532l.07-.794z" fill="#fff" /></svg>
    ),
    CSS: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 361"><path fill="#264DE4" d="M127.844 360.088L23.662 331.166L.445 70.766h255.11l-23.241 260.36z" /><path fill="#2965F1" d="m212.417 314.547l19.86-222.49H128V337.95z" /><path fill="#EBEBEB" d="m53.669 188.636l2.862 31.937H128v-31.937zm-5.752-64.641l2.903 31.937H128v-31.937zM128 271.58l-.14.037l-35.568-9.604l-2.274-25.471h-32.06l4.474 50.146l65.421 18.16l.147-.04z" /><path d="M60.484 0h38.68v16.176H76.66v16.176h22.506v16.175H60.484zm46.417 0h38.681v14.066h-22.505v2.813h22.505v32.352h-38.68V34.46h22.505v-2.813H106.9zm46.418 0H192v14.066h-22.505v2.813H192v32.352h-38.681V34.46h22.505v-2.813H153.32z" /><path fill="#FFF" d="m202.127 188.636l5.765-64.641H127.89v31.937h45.002l-2.906 32.704H127.89v31.937h39.327l-3.708 41.42l-35.62 9.614v33.226l65.473-18.145l.48-5.396l7.506-84.08z" /></svg>
    ),
    JavaScript: () => (
        <svg viewBox="0 0 32 32" className="w-5 h-5" aria-hidden="true">
            <path fill="#F7DF1E" d="M2 2h28v28H2z" />
            <path d="M20.809 23.875a2.866 2.866 0 002.6 1.6c1.09 0 1.787-.545 1.787-1.3 0-.9-.716-1.222-1.916-1.747l-.658-.282c-1.9-.809-3.16-1.822-3.16-3.964 0-1.973 1.5-3.476 3.853-3.476a3.889 3.889 0 013.742 2.107L25.4 17.93a1.789 1.789 0 00-1.689-1.124 1.147 1.147 0 00-1.264 1.124c0 .787.487 1.107 1.61 1.6l.658.282c2.236.959 3.5 1.939 3.5 4.139 0 2.372-1.862 3.668-4.362 3.668a5.059 5.059 0 01-4.766-2.683zm-9.295.445c.42.744.8 1.373 1.689 1.373.862 0 1.406-.338 1.406-1.653v-8.947h2.578v8.978c0 2.724-1.6 3.962-3.927 3.962a4.085 4.085 0 01-3.936-2.4z" />
        </svg>
    ),
    TypeScript: () => (
        <svg viewBox="0 0 32 32" className="w-5 h-5" aria-hidden="true">
            <path fill="#3178C6" d="M2 2h28v28H2z" />
            <path fill="#fff" d="M18.245 23.666v2.667a5.45 5.45 0 001.385.516 7.5 7.5 0 001.707.187 7.19 7.19 0 001.669-.189 4.1 4.1 0 001.351-.576 2.758 2.758 0 00.9-1.005 3.208 3.208 0 00.324-1.5 3.266 3.266 0 00-.175-1.1 2.63 2.63 0 00-.527-.87 4.106 4.106 0 00-.876-.716 10.206 10.206 0 00-1.236-.62q-.502-.208-.9-.4a3.4 3.4 0 01-.66-.391 1.617 1.617 0 01-.407-.449 1.094 1.094 0 01-.138-.556.989.989 0 01.133-.512 1.2 1.2 0 01.371-.386 1.82 1.82 0 01.564-.244 2.87 2.87 0 01.712-.085 3.922 3.922 0 01.675.059 4.36 4.36 0 01.667.178 3.855 3.855 0 01.616.3 3.253 3.253 0 01.516.413v-2.5a5.8 5.8 0 00-1.244-.356 8.068 8.068 0 00-1.542-.131 6.951 6.951 0 00-1.65.193 4.19 4.19 0 00-1.337.577 2.8 2.8 0 00-.9.991 2.909 2.909 0 00-.327 1.409 3.057 3.057 0 00.636 1.987 5.4 5.4 0 001.929 1.378q.527.225.965.436a4.27 4.27 0 01.731.44 1.865 1.865 0 01.463.511 1.213 1.213 0 01.162.64 1.019 1.019 0 01-.148.549 1.225 1.225 0 01-.409.389 2 2 0 01-.622.238 3.614 3.614 0 01-.786.08 3.794 3.794 0 01-1.374-.267 4.1 4.1 0 01-1.24-.8zm-3.926-7.306H17.6v-2.18H10v2.18h2.267V26h2.053z" />
        </svg>
    ),
    React: () => (
        <svg viewBox="0 0 32 32" className="w-5 h-5" aria-hidden="true">
            <circle cx="16" cy="16" r="2.85" fill="#61DAFB" />
            <g stroke="#61DAFB" strokeWidth="1.5" fill="none">
                <ellipse rx="11" ry="4.2" cx="16" cy="16" />
                <ellipse rx="11" ry="4.2" cx="16" cy="16" transform="rotate(60 16 16)" />
                <ellipse rx="11" ry="4.2" cx="16" cy="16" transform="rotate(120 16 16)" />
            </g>
        </svg>
    ),
    NextJS: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><defs><linearGradient id="SVGrDou6dwg" x1="55.633%" x2="83.228%" y1="56.385%" y2="96.08%"><stop offset="0%" stopColor="#fff" /><stop offset="100%" stopColor="#fff" stopOpacity="0" /></linearGradient><linearGradient id="SVG9onTObtB" x1="50%" x2="49.953%" y1="0%" y2="73.438%"><stop offset="0%" stopColor="#fff" /><stop offset="100%" stopColor="#fff" stopOpacity="0" /></linearGradient><circle id="SVGN5eQqeMK" cx="128" cy="128" r="128" /></defs><mask id="SVGMX2wGdvm" fill="#fff"><use href="#SVGN5eQqeMK" /></mask><g mask="url(#SVGMX2wGdvm)"><circle cx="128" cy="128" r="128" /><path fill="url(#SVGrDou6dwg)" d="M212.634 224.028L98.335 76.8H76.8v102.357h17.228V98.68L199.11 234.446a128 128 0 0 0 13.524-10.418" /><path fill="url(#SVG9onTObtB)" d="M163.556 76.8h17.067v102.4h-17.067z" /></g></svg>
    ),
    Tailwind: () => (
        <svg viewBox="0 0 32 32" className="w-5 h-5" aria-hidden="true">
            <path fill="#38BDF8" d="M16 6.4C11.2 6.4 8.267 8.8 7.2 13.6c1.6-2.133 3.467-2.933 5.6-2.4 1.218.305 2.088 1.189 3.051 2.168C17.353 14.894 19.2 16.8 22.4 16.8c4.8 0 7.733-2.4 8.8-7.2-1.6 2.133-3.467 2.933-5.6 2.4-1.218-.305-2.088-1.189-3.051-2.168C21.047 8.306 19.2 6.4 16 6.4zM9.6 16.8C4.8 16.8 1.867 19.2.8 24c1.6-2.133 3.467-2.933 5.6-2.4 1.218.305 2.088 1.189 3.051 2.168C10.953 24.694 12.8 26.6 16 26.6c4.8 0 7.733-2.4 8.8-7.2-1.6 2.133-3.467 2.933-5.6 2.4-1.218-.305-2.088-1.189-3.051-2.168C14.647 18.706 12.8 16.8 9.6 16.8z" />
        </svg>
    ),
    Shadcn: () => (
        <svg width={16} height={16} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="none" d="M0 0h256v256H0z" /><path fill="none" stroke="currentColor" strokeWidth="25" strokeLinecap="round" d="M208 128l-80 80M192 40L40 192" /></svg>
    ),
    Redux: () => (
        <svg width={16} height={16} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 244"><path fill="#764abc" d="M177.381 169.733c9.447-.978 16.614-9.122 16.288-18.896c-.325-9.773-8.47-17.592-18.243-17.592h-.651c-10.1.326-17.918 8.796-17.592 18.895c.326 4.887 2.28 9.122 5.212 12.054c-11.076 21.828-28.016 37.791-53.426 51.148c-17.266 9.122-35.183 12.38-53.1 10.1c-14.66-1.955-26.062-8.47-33.23-19.222c-10.424-15.963-11.401-33.23-2.605-50.496c6.19-12.38 15.962-21.502 22.152-26.063c-1.303-4.235-3.258-11.402-4.235-16.614c-47.237 34.207-42.35 80.468-28.016 102.295c10.75 16.29 32.577 26.389 56.684 26.389c6.515 0 13.03-.652 19.546-2.28c41.699-8.145 73.299-32.905 91.216-69.718m57.336-40.397c-24.759-28.995-61.245-44.958-102.944-44.958h-5.212c-2.932-5.864-9.122-9.774-15.963-9.774h-.652C99.848 74.93 92.03 83.4 92.355 93.5c.326 9.773 8.47 17.592 18.243 17.592h.651c7.167-.326 13.357-4.887 15.963-11.077h5.864c24.759 0 48.214 7.167 69.39 21.176c16.288 10.751 28.016 24.76 34.531 41.7c5.538 13.683 5.212 27.04-.652 38.443c-9.121 17.266-24.432 26.714-44.63 26.714c-13.031 0-25.41-3.91-31.926-6.842c-3.583 3.258-10.099 8.47-14.66 11.729c14.009 6.515 28.343 10.099 42.025 10.099c31.274 0 54.404-17.267 63.2-34.533c9.447-18.896 8.795-51.474-15.637-79.165M69.225 175.27c.326 9.774 8.47 17.592 18.243 17.592h.652c10.099-.325 17.917-8.796 17.591-18.895c-.325-9.774-8.47-17.592-18.243-17.592h-.651c-.652 0-1.63 0-2.28.325c-13.357-22.153-18.895-46.26-16.94-72.323c1.302-19.547 7.818-36.488 19.22-50.497c9.447-12.054 27.69-17.918 40.07-18.243c34.531-.652 49.19 42.351 50.168 59.618c4.235.977 11.402 3.258 16.289 4.887C189.434 27.366 156.857 0 125.584 0c-29.32 0-56.359 21.176-67.11 52.451c-14.985 41.7-5.212 81.771 13.031 113.372c-1.628 2.28-2.606 5.864-2.28 9.448" /></svg>
    ),
    Express: () => (
        <svg viewBox="0 0 32 32" className="w-5 h-5" aria-hidden="true">
            <rect width="32" height="32" rx="5" fill="#1a1a1a" />
            <text x="5" y="22" fontSize="12" fontWeight="bold" fill="#fff" fontFamily="monospace">ex</text>
        </svg>
    ),
    REST: () => (
        <svg viewBox="0 0 32 32" className="w-5 h-5" aria-hidden="true">
            <rect width="32" height="32" rx="6" fill="#10B981" />
            <text x="3" y="21" fontSize="9" fontWeight="bold" fill="#fff" fontFamily="monospace">API</text>
        </svg>
    ),
    Auth: () => (
        <svg viewBox="0 0 32 32" className="w-5 h-5" aria-hidden="true">
            <rect width="32" height="32" rx="6" fill="#6366F1" />
            <path fill="#fff" d="M16 6l-8 4v7c0 4.4 3.4 8.5 8 9.5 4.6-1 8-5.1 8-9.5V10l-8-4zm0 2.2l6 3V17c0 3.3-2.5 6.4-6 7.4-3.5-1-6-4.1-6-7.4v-5.8l6-3zm-1 5.8v2h2v-2h-2zm0 3v4h2v-4h-2z" />
        </svg>
    ),
    BetterAuth: () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 500 500" width={16} height={16}>
            <path fill="#000" d="M0 0h500v500H0z" />
            <path fill="#fff" d="M69 121h86.988v259H69zM337.575 121H430v259h-92.425z" />
            <path fill="#fff" d="M427.282 121v83.456h-174.52V121zM430 296.544V380H252.762v-83.456z" />
            <path fill="#fff" d="M252.762 204.455v92.089h-96.774v-92.089z" />
        </svg>
    ),
    Git: () => (
        <svg viewBox="0 0 32 32" className="w-5 h-5" aria-hidden="true">
            <path fill="#F05032" d="M29.47 14.53l-12-12a2 2 0 00-2.83 0l-2.5 2.5 3.18 3.18a2.37 2.37 0 012.99 3l3.07 3.07a2.37 2.37 0 11-1.41 1.41l-2.86-2.87V20a2.37 2.37 0 11-2 0v-6.41a2.37 2.37 0 01-1.28-3.12l-3.12-3.12-8.22 8.22a2 2 0 000 2.83l12 12a2 2 0 002.83 0l12-12a2 2 0 000-2.87z" />
        </svg>
    )
};

// ─── Data ──────────────────────────────────────────────────────────────────────

const SKILL_CATEGORIES: SkillCategory[] = [
    {
        title: "Frontend",
        accent: "text-indigo-400",
        badgeBg: "bg-indigo-500/10 dark:bg-indigo-500/15",
        badgeBorder: "border-indigo-500/25 dark:border-indigo-500/30",
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        ),
        skills: [
            { name: "HTML", icon: <Icons.HTML /> },
            { name: "CSS", icon: <Icons.CSS /> },
            { name: "JavaScript", icon: <Icons.JavaScript /> },
            { name: "TypeScript", icon: <Icons.TypeScript /> },
            { name: "React", icon: <Icons.React /> },
            { name: "Next.js", icon: <Icons.NextJS /> },
            { name: "Tailwind CSS", icon: <Icons.Tailwind /> },
            { name: "Shadcn UI", icon: <Icons.Shadcn /> },
            { name: "Redux", icon: <Icons.Redux /> },
            { name: "Tanstack Query", icon: <TanstackIcon /> },
        ],
    },
    {
        title: "Backend",
        accent: "text-emerald-400",
        badgeBg: "bg-emerald-500/10 dark:bg-emerald-500/15",
        badgeBorder: "border-emerald-500/25 dark:border-emerald-500/30",
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8m-4-4v4" />
            </svg>
        ),
        skills: [
            { name: "Node.js", icon: <NodejsIconAltIcon /> },
            { name: "Express.js", icon: <Icons.Express /> },
            { name: "Go", icon: <GolangIcon /> },
            { name: "REST APIs", icon: <Icons.REST /> },
            { name: "Authentication", icon: <Icons.Auth /> },
            { name: "Better Auth", icon: <Icons.BetterAuth /> },
        ],
    },
    {
        title: "Database",
        accent: "text-amber-400",
        badgeBg: "bg-amber-500/10 dark:bg-amber-500/15",
        badgeBorder: "border-amber-500/25 dark:border-amber-500/30",
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
                <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
            </svg>
        ),
        skills: [
            { name: "MySQL", icon: <MysqlIcon /> },
            { name: "PostgreSQL", icon: <PostgresqlIcon /> },
            { name: "MongoDB", icon: <MongodbIcon /> },
            { name: "Prisma ORM", icon: <PrismaIcon /> },
        ],
    },
    {
        title: "Tools",
        accent: "text-sky-400",
        badgeBg: "bg-sky-500/10 dark:bg-sky-500/15",
        badgeBorder: "border-sky-500/25 dark:border-sky-500/30",
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
            </svg>
        ),
        skills: [
            { name: "Git", icon: <Icons.Git /> },
            { name: "GitHub", icon: <GithubIcon /> },
            { name: "Docker", icon: <DockerIcon /> },
            { name: "Linux", icon: <LinuxIcon /> },
            { name: "Vercel", icon: <VercelIcon /> },
            { name: "Railway", icon: <RailwayIcon /> },
            { name: "Postman", icon: <PostmanIcon /> },
        ],
    },
];

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────

function useScrollReveal(ref: React.RefObject<HTMLElement | null>) {
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add("reveal-visible");
                    observer.disconnect();
                }
            },
            { threshold: 0.08 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [ref]);
}

// ─── Skill Badge ──────────────────────────────────────────────────────────────

function SkillBadge({
    skill,
    accent,
    badgeBg,
    badgeBorder,
    title
}: {
    skill: Skill;
    accent: string;
    badgeBg: string;
    badgeBorder: string;
    title: string;
}) {
    return (
        // <li
        //     className={[
        //         "group flex items-center justify-center gap-2.5 px-3.5 py-2 rounded-xl cursor-default select-none",
        //         "border transition-all duration-200",
        //         "hover:-translate-y-0.5 hover:shadow-md",
        //         badgeBg,
        //         badgeBorder,
        //     ].join(" ")}
        //     aria-label={skill.name}
        // >
        //     <span
        //         className={[
        //             "flex-shrink-0 transition-transform duration-200 group-hover:scale-110",
        //             accent,
        //         ].join(" ")}
        //     >
        //         {skill.icon}
        //     </span>
        //     <span className="text-sm font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap">
        //         {skill.name}
        //     </span>
        // </li>
        <span
            className={cn(
                "px-2.5 flex justify-center items-center gap-2 py-1 rounded-full text-xs font-medium",
                title === "Backend" && "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20",
                title === "Tools" && "bg-sky-50 text-sky-700 border border-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:border-sky-500/20",
                title === "Database" && "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20",
                title === "Frontend" && "bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-500/20"
            )}
        >
            <span
                className={[
                    "shrink-0 transition-transform duration-200 group-hover:scale-110",
                    accent,
                ].join(" ")}
            >
                {skill.icon}
            </span>
            <span className="text-sm font-medium whitespace-nowrap">
                {skill.name}
            </span>
        </span>
    );
}

// ─── Category Card ────────────────────────────────────────────────────────────

function CategoryCard({
    category,
    index,
}: {
    category: SkillCategory;
    index: number;
}) {
    const wrapRef = useRef<HTMLDivElement>(null);
    useScrollReveal(wrapRef as React.RefObject<HTMLElement>);

    return (
        <div
            ref={wrapRef}
            className="reveal-card"
            style={{ "--delay": `${index * 90}ms` } as React.CSSProperties}
        >
            <div
                className={[
                    "h-full rounded-2xl p-6 sm:p-7",
                    "bg-white/70 dark:bg-slate-900/60",
                    "border border-slate-200/80 dark:border-slate-700/50",
                    "backdrop-blur-sm shadow-sm hover:shadow-md",
                    "transition-shadow duration-300",
                ].join(" ")}
            >
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                    <span
                        className={[
                            "flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl",
                            "border",
                            category.badgeBg,
                            category.badgeBorder,
                            category.accent,
                        ].join(" ")}
                        aria-hidden="true"
                    >
                        {category.icon}
                    </span>
                    <h3 className={`text-lg font-bold ${category.accent}`}>
                        {category.title}
                    </h3>
                    <span className="ml-auto text-xs font-mono text-slate-400 dark:text-slate-500 tabular-nums">
                        {category.skills.length} skills
                    </span>
                </div>

                {/* Divider */}
                <div className="h-px bg-slate-200/60 dark:bg-slate-700/40 mb-5" />

                {/* Skills */}
                <ul className="flex flex-wrap gap-2" role="list">
                    {category.skills.map((skill) => (
                        <SkillBadge
                            key={skill.name}
                            skill={skill}
                            accent={category.accent}
                            badgeBg={category.badgeBg}
                            badgeBorder={category.badgeBorder}
                            title={category.title}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionHeader() {
    const ref = useRef<HTMLDivElement>(null);
    useScrollReveal(ref as React.RefObject<HTMLElement>);

    return (
        <div ref={ref} className="reveal-card text-center mb-14 sm:mb-16">
            <h2
                id="skills-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white"
            >
                Skills &amp;{" "}
                <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
                    Technologies
                </span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                A curated set of technologies I use to bring ideas to life — from pixel-perfect UIs to scalable backend systems.
            </p>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export const Skills = () => {
    const totalSkills = SKILL_CATEGORIES.reduce((acc, cat) => acc + cat.skills.length, 0);

    return (
        <>
            <style>{`
                .reveal-card {
                    opacity: 0;
                    transform: translateY(28px);
                    transition: opacity 0.6s ease, transform 0.6s ease;
                    transition-delay: var(--delay, 0ms);
                }
                .reveal-visible {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
            `}</style>

            <section
                id="skills"
                aria-labelledby="skills-heading"
                className="relative w-full py-28 overflow-hidden"
            >
                {/* Ambient background */}
                <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-indigo-500/8 dark:bg-indigo-600/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-10 right-0 w-[400px] h-[300px] bg-emerald-500/5 dark:bg-emerald-500/8 rounded-full blur-[100px]" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_40%,transparent_100%)]" />
                </div>

                <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <SectionHeader />

                    {/* Stats strip */}
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-12">
                        {([
                            { label: "Categories", value: SKILL_CATEGORIES.length },
                            { label: "Total Skills", value: totalSkills },
                            { label: "Years Learning", value: "3+" },
                        ] as const).map((stat) => (
                            <div
                                key={stat.label}
                                className="flex flex-col items-center px-6 py-3 rounded-xl bg-slate-100/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/40"
                            >
                                <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
                                    {stat.value}
                                </span>
                                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5 tracking-wide">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* 2-column grid on md+ */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
                        {SKILL_CATEGORIES.map((category, i) => (
                            <CategoryCard
                                key={category.title}
                                category={category}
                                index={i}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};