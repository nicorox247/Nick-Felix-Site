// pages/ProjectDetail.jsx
import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import projectData from '../data/projects'; // adjust path to your data file
import ProjectTagTicker from '../components/ProjectTagTicker';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projectData.find(p => p.id === id);
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);  

  if (!project) {
    return <div className="text-center py-20 text-xl text-error">Project not found.</div>;
  }

  return (
    <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    >
        <div className="bg-background text-dark py-16 px-6 sm:px-12 text-center">
            <ProjectTagTicker tags={project.tags} />

            <h1 className="text-4xl sm:text-5xl font-bold mb-4">{project.title}</h1>
            <p className="text-lg max-w-2xl mx-auto text-muted/80">{project.description}</p>
            {project.video ? (
                <video src={project.video} controls className="media-source" />
            ) : (
                <img src={project.image} alt={project.title} className="media-source" />
            )}
            {/* Add more project fields here if needed */}
            <div className="flex flex-wrap justify-center gap-6 py-8">
            {project.github && (
                <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-dark hover:bg-highlight text-light rounded-lg shadow-lg transition duration-300"
                >
                View on GitHub
                </a>
            )}
            {project.live && (
                <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-accent hover:bg-highlight text-dark rounded-lg shadow-lg transition duration-300"
                >
                Visit Live Site
                </a>
            )}
            </div>

        </div>

        <div className="bg-gradient-to-b from-primary to-dark text-light py-10 text-center">
        <h2 className="text-2xl font-semibold">Want to see more?</h2>
        <Link to="/projects" className="underline">
            Back to All Projects
        </Link>
        </div>

    </motion.div>
  );
}
