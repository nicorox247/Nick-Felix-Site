import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import projectData from '../data/projects';
import ProjectTagTicker from '../components/ProjectTagTicker';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projectData.find(p => p.id === id);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);

  if (!project) {
    return <div className="text-center py-20 text-xl text-error">Project not found.</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-6 pt-8 pb-4">
        <Link to="/projects" className="text-xs font-semibold uppercase tracking-widest text-muted hover:text-primary transition-colors">
          ← Projects
        </Link>
      </div>

      {/* Hero media */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="rounded-2xl overflow-hidden shadow-lg bg-dark">
          {project.video ? (
            <video
              src={project.video}
              autoPlay loop controls muted playsInline
              className="w-full max-h-[420px] object-cover"
            />
          ) : (
            <img
              src={project.image}
              alt={project.title}
              className="w-full max-h-[420px] object-cover"
            />
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Title + meta */}
        <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-2">{project.date}</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-dark mb-4 leading-tight">{project.title}</h1>
        <p className="text-lg text-muted leading-relaxed mb-8">{project.description}</p>

        {/* Stack ticker */}
        {project.stack && (
          <div className="mb-8">
            <ProjectTagTicker tags={project.stack} />
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary px-6 py-3 rounded-xl font-semibold text-sm"
            >
              View on GitHub
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary text-dark px-6 py-3 rounded-xl font-semibold text-sm"
            >
              Visit Live Site ↗
            </a>
          )}
        </div>

        {/* Long-form content */}
        {project.content && (
          <>
            <hr className="border-muted/20 mb-8" />
            <p className="text-muted leading-relaxed text-base whitespace-pre-line">
              {project.content}
            </p>
          </>
        )}
      </div>

      {/* Back link */}
      <div className="text-center py-10">
        <Link to="/projects" className="button-secondary text-dark px-6 py-3 rounded-xl font-semibold text-sm">
          ← Back to Projects
        </Link>
      </div>

    </motion.div>
  );
}
