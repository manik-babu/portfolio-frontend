import { CheckCircle2, Terminal } from "lucide-react";
import Image from "next/image";

export const About = () => {
    return (
        <div id="about" className="grid grid-cols-1 md:grid-cols-2 gap-4 py-28 max-w-7xl px-8">
            <section className="flex items-center justify-center">
                {/* <Image
                    src="/images/profile.png"
                    alt="Avatar"
                    width={300}
                    height={300}
                /> */}

            </section>
            <section className="space-y-6 flex flex-col">
                <h2 className="text-4xl font-bold flex gap-2">
                    <span className="text-gray-600 dark:text-gray-300">About</span>
                    <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
                        Me
                    </span>
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                    <p>
                        I'm a Full Stack Web Developer who enjoys building modern, scalable, and user focused web applications. I specialize in creating responsive frontends with React and Next.js while developing secure, high-performance backend systems using Node.js, Express.js, PostgreSQL, and MongoDB.
                    </p>
                    <p>
                        I enjoy solving complex problems, writing clean and maintainable code, and continuously learning new technologies to improve my skills. My focus is on building reliable applications that deliver great user experiences while following industry best practices.
                    </p>
                    <p>
                        When I'm not coding, I spend time exploring new technologies, improving my problem solving skills, and expanding my knowledge of software engineering and system design.
                    </p>
                </div>
            </section>

        </div>
    );
};