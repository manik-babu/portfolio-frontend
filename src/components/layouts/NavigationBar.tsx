"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ModeToggle } from "../ui/ModeToggle";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

const navItems = [
    { name: "Intro", href: "/#intro", id: "intro" },
    { name: "About", href: "/#about", id: "about" },
    { name: "Skills", href: "/#skills", id: "skills" },
    { name: "Projects", href: "/#projects", id: "projects" },
    { name: "Contact", href: "/#contact", id: "contact" },
];

export const NavigationBar = () => {
    const { resolvedTheme, setTheme } = useTheme();
    const isDark = resolvedTheme === "dark";
    const [activeId, setActiveId] = useState("intro");

    useEffect(() => {
        const sections = navItems
            .map((item) => document.getElementById(item.id))
            .filter((el): el is HTMLElement => !!el);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                // triggers when a section is roughly in the middle of the viewport
                rootMargin: "-40% 0px -55% 0px",
                threshold: 0,
            }
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    return (
        <header className="fixed top-0 z-50 w-full flex justify-center backdrop-blur-md">
            <nav className="flex w-7xl px-8 h-15 justify-between items-center gap-4 border-b">
                <div className="flex justify-center items-center">
                    <span className="text-3xl font-bold">Manik</span>
                    <span className="text-3xl font-bold bg-linear-to-r from-indigo-600 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
                        .dev
                    </span>
                </div>
                <ul className="flex justify-center items-center gap-6">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                className={activeId === item.id ? "text-indigo-600" : ""}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div>
                    <ModeToggle
                        value={isDark}
                        onToggle={() => setTheme(isDark ? "light" : "dark")}
                        iconOff={<MoonIcon />}
                        iconOn={<SunIcon />}
                    />
                </div>
            </nav>
        </header>
    );
};