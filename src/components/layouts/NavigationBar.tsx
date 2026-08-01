import Link from "next/link";
import { ModeToggle } from "../ui/ModeToggle";

const navItems = [
    { name: "Intro", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Skills", href: "/#skills" },
    { name: "Projects", href: "/#projects" },
    { name: "Contact", href: "/#contact" },
];

export const NavigationBar = () => {
    return (
        <header className="fixed top-0 z-50 w-full flex justify-center backdrop-blur-md">
            <nav className="flex w-7xl px-8 h-16 justify-between items-center gap-4">
                <div className="flex justify-center items-center">
                    <span className="text-3xl font-bold">Manik</span>
                    <span className="text-3xl font-bold text-blue-500">.dev</span>
                </div>
                <ul className="flex justify-center items-center gap-4">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <Link href={item.href}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
                <div>
                    <ModeToggle />
                </div>

            </nav>
        </header>
    );
}