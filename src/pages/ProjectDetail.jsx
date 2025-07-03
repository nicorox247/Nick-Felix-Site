// pages/ProjectDetail.jsx
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import projectData from '../data/projects'; // adjust path to your data file
import ProjectTagTicker from '../components/ProjectTagTicker';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projectData.find(p => p.id === id);

  if (!project) {
    return <div className="text-center py-20 text-error">Project not found.</div>;
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
                <video src={project.video} controls className="w-full mx-auto rounded-4xl mb-4
                max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-5xl" />
            ) : (
                <img src={project.image} alt={project.title} className="w-full mx-auto rounded-4xl mb-4
                max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-5xl" />
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
