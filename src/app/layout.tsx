import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { NavigationBar } from "@/components/layouts/NavigationBar";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import MouseEffects from "@/components/ui/MouseEffect";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Manik Babu",
  description: "I'm a Full Stack Web Developer who enjoys building modern, scalable, and user focused web applications. I specialize in creating responsive frontends with React and Next.js while developing secure, high-performance backend systems using Node.js, Express.js, PostgreSQL, and MongoDB. I enjoy solving complex problems, writing clean and maintainable code, and continuously learning new technologies to improve my skills. My focus is on building reliable applications that deliver great user experiences while following industry best practices. When I'm not coding, I spend time exploring new technologies, improving my problem solving skills, and expanding my knowledge of software engineering and system design.",
  openGraph: {
    title: "Manik Babu",
    description: "I'm a Full Stack Web Developer who enjoys building modern, scalable, and user focused web applications. I specialize in creating responsive frontends with React and Next.js while developing secure, high-performance backend systems using Node.js, Express.js, PostgreSQL, and MongoDB. I enjoy solving complex problems, writing clean and maintainable code, and continuously learning new technologies to improve my skills. My focus is on building reliable applications that deliver great user experiences while following industry best practices. When I'm not coding, I spend time exploring new technologies, improving my problem solving skills, and expanding my knowledge of software engineering and system design.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={cn("h-full", "antialiased", "scroll-smooth", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavigationBar />
          <MouseEffects />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
