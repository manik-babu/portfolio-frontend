import { Project } from "@/@types/project";

export const projects: Project[] = [
    {
        images: [
            { src: "/images/project1/image1.png", alt: "Home page image" },
            { src: "/images/project1/image2.png", alt: "Login page image" },
            { src: "/images/project1/image3.png", alt: "About image" },
        ],
        title: "CampusOS",
        description: "A full-stack university management system that streamlines administrative workflows and enhances student engagement through integrated academic and campus services.",
        liveDemo: "https://uttarauniversity.vercel.app",
        githubClient: "https://github.com/manik-babu/campus-os-frontend",
        githubServer: "https://github.com/manik-babu/campus-os-backend",
        techStack: {
            frontend: ["Next.js", "TailwindCSS", "TypeScript"],
            backend: ["Node.js", "Express"],
            database: ["PostgreSQL", "Prisma ORM"]
        },
        details: {
            title: "CampusOS - Full Stack University Management System",
            description: "A full-stack university management system that streamlines administrative workflows and enhances student engagement through integrated academic and campus services. A full-stack university management system that streamlines administrative workflows and enhances student engagement through integrated academic and campus services. A full-stack university management system that streamlines administrative workflows and enhances student engagement through integrated academic and campus services.",
            features: [
                "Student information management system",
                "Course management system",
                "Grade management system",
                "Attendance management system",
                "User authentication and authorization system"
            ],
            techStack: {
                frontend: ["Next.js", "TailwindCSS", "TypeScript", "Redux"],
                backend: ["Node.js", "Express"],
                database: ["PostgreSQL", "Prisma ORM"]
            },
            githubClient: "https://github.com/manik-babu/campus-os-frontend",
            githubServer: "https://github.com/manik-babu/campus-os-backend",
            liveDemo: "https://uttarauniversity.vercel.app",
            conclusion: "This project helped me to learn about full-stack development and how to build a complete web application."
        }
    },
    {
        images: [
            { src: "/images/project1/image1.png", alt: "Home page image" },
            { src: "/images/project1/image2.png", alt: "Login page image" },
            { src: "/images/project1/image3.png", alt: "About image" },
        ],
        title: "MediStore",
        description: `MediStore is a full-stack, multi-vendor online pharmacy platform that enables nationwide medicine sales through
separate experiences for admins, sellers, and customers. It streamlines medicine discovery, inventory
management, order processing, and platform moderation with a role-based architecture built for scale.`,
        liveDemo: "https://medistore-max.vercel.app",
        githubClient: "https://github.com/manik-babu/medistore-frontend",
        githubServer: "https://github.com/manik-babu/medistore-backend",
        techStack: {
            frontend: ["Next.js", "TailwindCSS", "TypeScript", "Shadcn UI"],
            backend: ["Node.js", "Express", "Better-Auth"],
            database: ["PostgreSQL", "Prisma ORM"]
        },
        details: {
            title: "MediStore - Full Stack E-commerce Platform",
            description: `MediStore is a full-stack, multi-vendor online pharmacy platform that enables nationwide medicine sales through
separate experiences for admins, sellers, and customers. It streamlines medicine discovery, inventory
management, order processing, and platform moderation with a role-based architecture built for scale.`,
            features: [
                "Customer Experience: A seamless, modern e-commerce interface enabling users to search medicines by name, browse by category, view detailed product information, and place orders with ease.",
                "Seller Experience: A dedicated vendor portal for sellers to upload and manage medicine inventory, monitor incoming orders, update stock levels, and manage their shop’s information.",
                "Admin Experience: A comprehensive admin dashboard for platform oversight, including user management, product approval, order monitoring, seller verification, and detailed analytics.",
                "Multi-Vendor Architecture: A scalable backend that supports multiple sellers, allowing the platform to grow while maintaining performance and stability.",
                "Role-Based Access Control: Secure, role-specific interfaces for admins, sellers, and customers, ensuring data privacy and appropriate functionality at every level."
            ],
            techStack: {
                frontend: ["Next.js", "TailwindCSS", "TypeScript", "Redux", "Shadcn UI"],
                backend: ["Node.js", "Express", "Better-Auth", "JWT"],
                database: ["PostgreSQL", "Prisma ORM"]
            },
            githubClient: "https://github.com/manik-babu/medistore-frontend",
            githubServer: "https://github.com/manik-babu/medistore-backend",
            liveDemo: "https://medistore-max.vercel.app",
            conclusion: "This project helped me to learn about full-stack development and how to build a complete web application."
        }

    },
]