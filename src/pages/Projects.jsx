import { useEffect } from 'react';
import ProjectCarousel from '../components/ProjectCarousel';
import projectData from '../data/projects';

export default function Projects() {

  useEffect(() => {
    // window.scrollTo({ top: 0, behavior: 'instant' });
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen py-5">
      <h1 className="text-3xl font-bold mb-8 text-center">Featured Projects</h1>
      <ProjectCarousel projects={projectData} />
    </div>
  );
}
