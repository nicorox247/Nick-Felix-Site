import ProjectCarousel from '../components/ProjectCarousel';
import projectData from '../data/projects';

export default function Projects() {
  return (
    <div className="min-h-screen py-5">
      <h1 className="text-4xl font-bold mb-8 text-center">Projects</h1>
      <ProjectCarousel projects={projectData} />
    </div>
  );
}
