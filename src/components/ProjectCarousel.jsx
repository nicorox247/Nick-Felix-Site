import { useRef, useState, useEffect} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './ProjectCarousel.css'; // We'll add progress bar CSS here

export default function ProjectCarousel({ projects }) {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const [fogOpacity, setFogOpacity] = useState(1);

  const onAutoplayTimeLeft = (swiper, time, progress) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // 0 → 100px scroll = opacity 1 → 0
      const newOpacity = Math.max(0, 1 - scrollY / 200);
      setFogOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        speed={1200}
        autoplay={{
          delay: 5000, // <-- In milliseconds
          disableOnInteraction: true,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index}>
            <div className="slider-box">
              <Link to={`/projects/${project.id}`} className="block h-full hover:text-highlight">
                {project.video ? (
                  <video src={project.video} autoPlay loop muted playsInline className="rounded-t-4xl aspect-video mb-4 object-cover" />
                ) : (
                  <img src={project.image} alt={project.title} loading="lazy" className="rounded-t-4xl aspect-video mb-4 object-cover" />
                )}
                <h3 className="lg:text-3xl text-2xl font-bold mb-2">{project.title}</h3>
                <p className="lg:text-lg text-light line-clamp-2">{project.description}</p>
              </Link>
                  <div className="relative mt-2 gap-4 pb-14">
                      {project.github && (
                        <a
                        title="View GitHub Repository"
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Repository"
                        className="absolute left-1/4"
                        onClick={(e) => e.stopPropagation()}
                        >
                                          <svg
                                          className="size-11 fill-current"
                                          viewBox="0 0 24 24"
                                          xmlns="http://www.w3.org/2000/svg"
                                          >
                                          <path
                                              fillRule="evenodd"
                                              clipRule="evenodd"
                                              d="M12 0C5.372 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.26.793-.577 
                                              0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 
                                              1.205.085 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.775.42-1.305.763-1.605-2.665-.305-5.467-1.335-5.467-5.93 
                                              0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.527.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3.003-.404 
                                              c1.02.004 2.047.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.654 1.649.242 2.873.119 3.176.77.84 
                                              1.234 1.911 1.234 3.221 0 4.61-2.807 5.624-5.479 5.921.431.372.816 1.102.816 2.222 
                                              0 1.604-.015 2.896-.015 3.293 0 .32.192.694.801.576C20.565 21.796 24 17.299 24 12 
                                              24 5.373 18.627 0 12 0z"
                                              />

                                          </svg>
                          </a>
                      )}
                      {project.live && (
                        <a
                        title="View live website" 
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live Website"
                        className={"absolute left-3/4"}
                        onClick={(e) => e.stopPropagation()}
                        >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-12">
                              <path fillRule="evenodd" d="M15.75 2.25H21a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V4.81L8.03 17.03a.75.75 0 0 1-1.06-1.06L19.19 3.75h-3.44a.75.75 0 0 1 0-1.5Zm-10.5 4.5a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V10.5a.75.75 0 0 1 1.5 0v8.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V8.25a3 3 0 0 1 3-3h8.25a.75.75 0 0 1 0 1.5H5.25Z" clipRule="evenodd" />
                              </svg>

                          </a>
                      )}
                  </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>



      <div className="relative mt-40 sm:mt-20 md:mt-14 z-10">
        {/* Scroll Arrow */}
        <div className="absolute z-30 left-1/2 transform -top-16 -translate-x-1/2 text-center opacity-80 text-dark transition-opacity duration-300"
              style={{ opacity: fogOpacity }}>
          <p className="text-xs sm:text-sm">Scroll to view all projects</p>
          <svg
            className="mx-auto mt-1 w-5 h-5 sm:w-6 sm:h-6 animate-bounce"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Top fade overlay */}
        <div
          className="absolute xl:-top-2 -top-12 left-0 right-0 h-80 sm:h-64 lg:h-64 xl:h-60 pointer-events-none z-20 bg-gradient-to-t from-transparent to-background transition-opacity duration-200"
          style={{ opacity: fogOpacity }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {projects.map((project, i) => (
              <Link
              to={`/projects/${project.id}`}
              key={i}
              className="transform hover:-translate-y-2 hover:-translate-x-2 transition-transform duration-300"
            >
              <div className="bg-gradient-primary hover:shadow-muted hover:text-highlight rounded-xl shadow-md overflow-hidden w-full h-full">
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <p className="text-sm text-light mt-2 line-clamp-3">{project.description}</p>
                </div>
              </div>
            </Link>
            
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}


  