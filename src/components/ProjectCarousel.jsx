import { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const GitHubIcon = () => (
  <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.372 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.26.793-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.775.42-1.305.763-1.605-2.665-.305-5.467-1.335-5.467-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.527.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3.003-.404c1.02.004 2.047.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.654 1.649.242 2.873.119 3.176.77.84 1.234 1.911 1.234 3.221 0 4.61-2.807 5.624-5.479 5.921.431.372.816 1.102.816 2.222 0 1.604-.015 2.896-.015 3.293 0 .32.192.694.801.576C20.565 21.796 24 17.299 24 12 24 5.373 18.627 0 12 0z" />
  </svg>
);

const ExternalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
    <path fillRule="evenodd" d="M15.75 2.25H21a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V4.81L8.03 17.03a.75.75 0 0 1-1.06-1.06L19.19 3.75h-3.44a.75.75 0 0 1 0-1.5Zm-10.5 4.5a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V10.5a.75.75 0 0 1 1.5 0v8.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V8.25a3 3 0 0 1 3-3h8.25a.75.75 0 0 1 0 1.5H5.25Z" clipRule="evenodd" />
  </svg>
);

export default function ProjectCarousel({ projects }) {
  const scrollRef = useRef(null);
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((index) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: 'smooth' });
    setCurrent(index);
  }, []);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCurrent(Math.round(el.scrollLeft / el.clientWidth));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div>
      {/* ── Scroll-snap carousel ── */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto"
          style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="flex-none w-full px-6 py-8"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-center">

                {/* Media */}
                <div className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-lg bg-dark/5">
                  {project.video ? (
                    <video
                      src={project.video}
                      autoPlay loop muted playsInline
                      className="w-full aspect-video object-cover"
                    />
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full aspect-video object-cover"
                      loading="lazy"
                    />
                  )}
                </div>

                {/* Text */}
                <div className="w-full md:w-1/2 text-left">
                  <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-2">
                    {i + 1} / {projects.length}
                  </p>
                  <h2 className="text-3xl font-bold text-dark mb-3">{project.title}</h2>
                  <p className="text-muted mb-5 leading-relaxed">{project.description}</p>

                  {project.stack && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.stack.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-semibold rounded-full border"
                          style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)', background: 'color-mix(in srgb, var(--color-primary) 8%, transparent)' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-4 items-center">
                    <Link
                      to={`/projects/${project.id}`}
                      className="button-primary px-5 py-2.5 rounded-xl font-semibold text-sm"
                    >
                      View Project →
                    </Link>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="GitHub Repository"
                        className="text-dark hover:text-highlight transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <GitHubIcon />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Live site"
                        className="text-dark hover:text-highlight transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalIcon />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Prev arrow */}
        {current > 0 && (
          <button
            onClick={() => goTo(current - 1)}
            aria-label="Previous project"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{ background: 'color-mix(in srgb, var(--color-dark) 10%, transparent)' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Next arrow */}
        {current < projects.length - 1 && (
          <button
            onClick={() => goTo(current + 1)}
            aria-label="Next project"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{ background: 'color-mix(in srgb, var(--color-dark) 10%, transparent)' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-4 pb-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to project ${i + 1}`}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === current ? '24px' : '8px',
                background: i === current ? 'var(--color-primary)' : 'color-mix(in srgb, var(--color-dark) 20%, transparent)',
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Bento grid ── */}
      {/* <div className="mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <p className="text-center text-xs font-semibold tracking-widest uppercase text-muted mb-1">All Projects</p>
        <h2 className="text-center text-2xl font-bold text-dark mb-8">Browse Everything</h2>

        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: 'repeat(4, 1fr)', gridAutoRows: '200px' }}
        >
          {projects.map((project) => (
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
      </div> */}
        <div className="mt-8 text-center">
          <Link
            to="/projects/all"
            className="button-secondary text-dark inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
          >
            View All Projects
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
    </div>
  );
}
