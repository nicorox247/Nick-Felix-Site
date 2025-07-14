// pages/ProjectDetail.jsx
import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import projectData from '../data/projects';
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
        <div className=" py-10 px-6 sm:px-8 text-center">
            <h2 className='pb-2'>Tech Stack:</h2>
            <ProjectTagTicker tags={project.stack} />

            <h1 className="text-4xl sm:text-5xl font-bold p-2">{project.title}</h1>
            <p className="text-md max-w-2xl mx-auto text-muted/80 py-6">{project.description}</p>
            {project.video ? (
                <video src={project.video} autoPlay loop controls muted playsInline className="media-source" />
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
                  className="px-6 py-3 bg-dark hover:bg-highlight hover:text-dark text-light rounded-lg shadow-lg transition duration-300"
                  >
                  View on GitHub
                  </a>
              )}
              {project.live && (
                  <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-accent hover:bg-highlight hover:text-dark text-light rounded-lg shadow-lg transition duration-300"
                  >
                  Visit Live Site
                  </a>
              )}
            </div>

            <div className='text-center max-w-2xl text-lg lg:max-w-4xl mx-auto'>

              {project.content && (
                <p>{project.content}</p>

              )}
            </div>

        </div>

        <div className="text-dark py-10 text-center">
        <h2 className="text-2xl font-semibold">Want to see more?</h2>
        <Link to="/projects" className="underline text-primary hover:text-highlight">
            Back to All Projects
        </Link>
        </div>

    </motion.div>
  );
}
