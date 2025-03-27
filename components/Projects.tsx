import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const projects = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "A full-featured online shopping platform with React frontend and Node.js backend.",
        image: "https://images.unsplash.com/photo-1661956602944-249bcd04b63f?q=80&w=2070&auto=format&fit=crop",
        tech: ["React", "Node.js", "MongoDB", "Stripe"],
        github: "#",
        live: "#",
    },
    {
        id: 2,
        title: "AI Task Manager",
        description: "Task management app with AI-powered prioritization and scheduling suggestions.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        tech: ["Next.js", "OpenAI API", "Tailwind CSS", "Supabase"],
        github: "#",
        live: "#",
    },
    {
        id: 3,
        title: "Real-time Chat App",
        description: "Instant messaging application with real-time updates and file sharing.",
        image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=2070&auto=format&fit=crop",
        tech: ["React", "Firebase", "WebSockets", "TypeScript"],
        github: "#",
        live: "#",
    },
];

const Projects = () => {
    return (
        <section id="projects" className="section-padding">
            <div className="flex flex-col px-4 md:px-6">
                <div className="flex flex-col items-center text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-slide-up">Featured Projects</h2>
                    <div className="w-20 h-1 bg-primary rounded mb-6"></div>
                    <p className="text-muted-foreground max-w-[700px] animate-fade-in">
                        Explore a selection of my recent work, showcasing a diverse range of skills and technologies.
                    </p>
                </div>

                <div className="flex flex-row justify-center gap-6 flex-wrap">
                    {projects.map((project, index) => (
                        <Card
                            key={project.id}
                            className="project-card overflow-hidden border-0 shadow-md"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="h-52 overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                    loading="lazy"
                                />
                            </div>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                                <p className="text-muted-foreground text-sm mb-4">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-5">
                                    {project.tech.map((tech) => (
                                        <span key={tech} className="skill-tag">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-3">
                                    <Button size="sm" variant="outline" className="gap-1.5" asChild>
                                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                                            <Github className="h-4 w-4" />
                                            Code
                                        </a>
                                    </Button>
                                    <Button size="sm" className="gap-1.5" asChild>
                                        <a href={project.live} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="h-4 w-4" />
                                            Live
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="flex justify-center mt-12">
                    <Button variant="outline" size="lg">View All Projects</Button>
                </div>
            </div>
        </section>
    );
};

export default Projects;