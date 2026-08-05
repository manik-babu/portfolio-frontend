export interface SlideImage {
    src: string
    alt: string
}
export interface Project {
    images: SlideImage[];
    title: string;
    description: string;
    liveDemo: string;
    githubClient: string;
    githubServer: string;
    techStack: {
        frontend: string[];
        backend: string[];
        database: string[];
    }
}