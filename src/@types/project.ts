export interface SlideImage {
    src: string
    alt: string
}
export interface TechStack {
    frontend: string[];
    backend: string[];
    database: string[];
}
export interface ProjectDetails {
    title: string;
    description: string;
    features: string[];
    techStack: TechStack;
    githubClient: string;
    githubServer: string;
    liveDemo: string;
    conclusion: string;
}
export interface Project {
    images: SlideImage[];
    title: string;
    description: string;
    liveDemo: string;
    githubClient: string;
    githubServer: string;
    techStack: TechStack;
    details: ProjectDetails;
}