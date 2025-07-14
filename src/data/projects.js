const projects = [
    
    {
      id: 'axis-med',
      title: 'AxisMED',
      description: 'Website for a student-led medical innovation platform bridging medicine, engineering, and entrepreneurship.',
      image: '/images/axis-med/axis-med-hp.png', // Update with actual screenshot path
      video: '/videos/axis-med/axis-med-demo.mov', // Optional
      live: 'https://axis-med.vercel.app/',
      github: 'https://github.com/nicorox247/axis-med', // Leave blank or update if public
      stack: ['React', 'Tailwind CSS', 'Vite', 'Java Script'],
      tags: ['React', 'Tailwind CSS', 'Vite', 'Java Script', 'Healthcare', 'Design'],
      date: '2025-07-01',
      featured: true,
      content: `AxisMED is a website built for a pre-incubator program based at the world’s first engineering-based medical school. The platform brings together clinical insight, engineering precision, and translational ambition to empower medical trainees in solving real-world healthcare problems.
    
    This site was developed as a clean, professional landing page that communicates AxisMED's mission clearly and effectively. It outlines their vision to become the leading national platform for student-led clinical innovation, bridging the gap between medicine, engineering, and entrepreneurship.
    
    The design prioritizes clarity, accessibility, and professionalism using Tailwind CSS and React. It features responsive sections, a modern layout, and engaging CTAs aimed at students, clinicians, and collaborators.`,
      images: [
        '/images/axis-med/axis-med-fp0.png',
        '/images/axis-med/mobile-view.png'
      ]
    },
    {
      id: 'muscle-map',
      title: 'Muscle Map',
      description: 'An interactive anatomical website that teaches users about muscle groups and how to train them.',
      image: '/images/muscle-map/muscle-map-ft1.png', // replace with your actual image path
      video: '/videos/muscle-map/muscle-map-demo1.mov', // optional: could add a demo video later
      github: 'https://github.com/nicorox247/musclemap', // update if private or unlinked
      live: '', // optional: add deployment link if it's hosted
      stack: ['JavaScript', 'Flask', 'Python', 'css', 'html', 'Bootstrap'],
      tags: ['JavaScript', 'Flask', 'Python', 'css', 'html', 'Bootstrap', 'Anatomy', 'Fitness'],
      date: '2025-04-20', // update with accurate release date
      featured: true,
      content: `Muscle Map is an interactive educational tool built with Flask, JavaScript, and Bootstrap. The site features a clickable anatomical body diagram that highlights major muscle groups. When selected, each group displays its name, functional role, and recommended exercises to target it effectively. The goal of this project is to make learning anatomy more engaging and accessible, especially for fitness enthusiasts and students.`,
      images: [
        '/images/muscle-map/body-front.png',
        '/images/muscle-map/muscle-info-panel.png'
      ],
      videos: [
        '/videos/muscle-map/muscle-map-demo1.mov',
        '/videos/muscle-map/muscle-map-demo2.mov'
      ]
    },

    {
      id: 'personal-portfolio',
      title: 'Personal Portfolio',
      description: 'A dynamic homepage featuring animated interaction zones and my portfolio.',
      video: '/videos/nick-felix/portfolio-demo.mov',
      image: '/images/nick-felix/nick-felix-hp.png', // optional fallback or thumbnail image
      github: 'https://github.com/nicorox247/Nick-Felix-Site',
      live: 'https://nick-felix.vercel.app/',
      stack: ['React', 'Tailwind CSS', 'Canvas', 'Vite'],
      tags: ['React', 'Tailwind CSS', 'Canvas', 'Vite', 'game'],
      date: '2025-06-30', // Update to actual release date if needed
      featured: false,
      content: `This project showcases my personal website, built with React, Tailwind CSS, and Vite. It features a custom canvas animation system with mouse-following interaction zones and a dynamic homepage layout. The site serves as both a portfolio and a playground for web UI experimentation.`,
      images: [
        '/images/portfolio/homepage.png',
        '/images/portfolio/interaction-zone.png'
      ]
    },
    

    // Add more projects as needed
  ];

  export default projects;