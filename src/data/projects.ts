import { Project } from "@/@types/project";

export const projects: Project[] = [
    {
        images: [
            { src: "/images/project1/image1.png", alt: "Home page image" },
            { src: "/images/project1/image2.png", alt: "Login page image" },
            { src: "/images/project1/image3.png", alt: "About image" },
        ],
        title: "CampusOS - Full Stack University Management System",
        description: "A full-stack university management system that streamlines administrative workflows and enhances student engagement through integrated academic and campus services.",
        liveDemo: "https://uttarauniversity.vercel.app",
        githubClient: "https://github.com/manik-babu/campus-os-frontend",
        githubServer: "https://github.com/manik-babu/campus-os-backend",
        techStack: {
            frontend: ["Next.js", "TailwindCSS", "TypeScript", "Redux"],
            backend: ["Node.js", "Express"],
            database: ["PostgreSQL", "Prisma ORM"]
        }
    },
    {
        images: [
            { src: "/images/project1/image1.png", alt: "Home page image" },
            { src: "/images/project1/image2.png", alt: "Login page image" },
            { src: "/images/project1/image3.png", alt: "About image" },
        ],
        title: "CampusOS - Full Stack University Management System",
        description: "A full-stack university management system that streamlines administrative workflows and enhances student engagement through integrated academic and campus services.",
        liveDemo: "https://uttarauniversity.vercel.app",
        githubClient: "https://github.com/manik-babu/campus-os-frontend",
        githubServer: "https://github.com/manik-babu/campus-os-backend",
        techStack: {
            frontend: ["Next.js", "TailwindCSS", "TypeScript", "Redux"],
            backend: ["Node.js", "Express", "JWT", "Bcrypt"],
            database: ["PostgreSQL", "Prisma ORM"]
        }
    },
]