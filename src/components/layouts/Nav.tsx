"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Code2, Sun, Moon, Menu, X } from "lucide-react";

export const NavigationBar = () => {
    const pathname = usePathname();
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [mounted, setMounted] = useState<boolean>(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

    const navItems = [
        { name: "Intro", href: "/" },
        { name: "About", href: "/about" },
        { name: "Skills", href: "/#skills" },
        { name: "Projects", href: "/projects" },
        { name: "Contact", href: "/contact" },
    ];

    useEffect(() => {
        setMounted(true);
        const storedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
            document.documentElement.classList.add("dark");
            setDarkMode(true);
        } else {
            document.documentElement.classList.remove("dark");
            setDarkMode(false);
        }
    }, []);

    const toggleDarkMode = () => {
        if (darkMode) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setDarkMode(false);
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setDarkMode(true);
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 py-3 transition-all duration-300">
            <div className="mx-auto max-w-7xl">
                <nav className="relative flex items-center justify-between px-4 py-2.5 sm:px-6 rounded-full backdrop-blur-xl bg-white/70 dark:bg-slate-900/75 border border-slate-200/60 dark:border-slate-800/60 shadow-lg shadow-slate-900/5 dark:shadow-black/30 transition-all duration-300">
                    {/* Left: Logo */}
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-indigo-500/50 rounded-full py-1 px-2 -ml-2 transition-all"
                        >
                            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 group-hover:shadow-indigo-500/40 transition-all duration-300">
                                <Code2 className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                            </div>
                            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                Manik<span className="text-indigo-600 dark:text-indigo-400 font-extrabold">.dev</span>
                            </span>
                        </Link>
                    </div>

                    {/* Center: Nav items */}
                    <ul className="hidden md:flex items-center space-x-1 lg:space-x-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${isActive
                                            ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/50 font-semibold shadow-xs"
                                            : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60"
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Right: Mode Toggle & Mobile Menu Toggle */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleDarkMode}
                            aria-label="Toggle Theme"
                            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                            className="relative p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-100/80 dark:bg-slate-800/70 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 border border-slate-200/60 dark:border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300"
                        >
                            {mounted ? (
                                darkMode ? (
                                    <Sun className="w-4 h-4 transition-transform duration-300 hover:rotate-45 text-amber-400" />
                                ) : (
                                    <Moon className="w-4 h-4 transition-transform duration-300 hover:-rotate-12 text-slate-700" />
                                )
                            ) : (
                                <span className="w-4 h-4 block" />
                            )}
                        </button>

                        {/* Mobile Menu Toggle Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle Mobile Navigation Menu"
                            className="md:hidden p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-100/80 dark:bg-slate-800/70 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 border border-slate-200/60 dark:border-slate-700/50 transition-all"
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </nav>

                {/* Mobile Navigation Dropdown */}
                {mobileMenuOpen && (
                    <div className="md:hidden mt-3 px-4 py-4 rounded-2xl backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/60 dark:border-slate-800/60 shadow-xl shadow-slate-900/10 dark:shadow-black/40 transition-all animate-in fade-in slide-in-from-top-2">
                        <ul className="flex flex-col space-y-1">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={`block px-4 py-2.5 text-base font-medium rounded-xl transition-all ${isActive
                                                ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/50 font-semibold"
                                                : "text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/70"
                                                }`}
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </header>
    );
};