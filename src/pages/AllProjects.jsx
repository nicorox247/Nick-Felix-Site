import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import projectData from '../data/projects';

export default function AllProjects() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen py-8">
      <p className="text-center text-xs font-semibold tracking-widest uppercase text-muted mb-1">Portfolio</p>
      <h1 className="text-3xl font-bold text-center mb-10">All Projects</h1>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: 'repeat(4, 1fr)', gridAutoRows: '200px' }}
        >
          {projectData.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="relative rounded-2xl overflow-hidden group"
              style={{
                gridColumn: project.featured ? 'span 2' : 'span 1',
                gridRow: project.featured ? 'span 2' : 'span 1',
              }}
            >
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full" style={{ background: 'var(--color-primary)' }} />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                <h3 className={`font-bold text-white leading-tight ${project.featured ? 'text-xl' : 'text-sm'}`}>
                  {project.title}
                </h3>
                {project.featured && (
                  <p className="text-white/65 text-sm mt-1 line-clamp-2">{project.description}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
