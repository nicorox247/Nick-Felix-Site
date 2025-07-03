import ProjectCarousel from '../components/ProjectCarousel';

const projects = [
  {
    title: 'Personal Portfolio',
    description: 'A dynamic homepage featuring animated interaction zones.',
    video: '/videos/portfolio-demo.mov', // or .webm
    github: 'https://github.com/nicorox247/Nick-Felix-Site',
    live: 'https://nickfelix.dev',
  },
  {
    title: 'Crypto Dashboard',
    description: 'Real-time price tracking and wallet insights.',
    image: '/images/crypto.png',
    
    live: 'https://nickfelix.dev'
  },
  {
    title: 'Poopy peepee',
    description: 'potty timeeeeee',
    image: '/images/crypto.png',
  },
  // Add more projects as needed
];

export default function Projects() {
  return (
    <div className="min-h-screen py-5">
      <h1 className="text-4xl font-bold mb-8 text-center">Projects</h1>
      <ProjectCarousel projects={projects} />
    </div>
  );
}
