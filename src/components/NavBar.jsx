import { useState, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';

const OTHER_PAGES = ['research', 'about', 'resume', 'contact'];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [projectsDropOpen, setProjectsDropOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const closeTimer = useRef(null);

  const openDrop = () => {
    clearTimeout(closeTimer.current);
    setProjectsDropOpen(true);
  };
  const closeDrop = () => {
    closeTimer.current = setTimeout(() => setProjectsDropOpen(false), 120);
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-primary text-light shadow-md backdrop-blur">
      <nav className="lg:max-w-[90%] mx-auto flex items-center justify-between py-3 px-6">
        {/* Logo */}
        <Link to="/" className="text-3xl md:text-4xl font-extrabold tracking-wider transition-colors duration-300">
          Nick Felix
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8 text-sm md:text-md font-semibold uppercase tracking-wider">
          {/* Projects with hover dropdown */}
          <li className="relative" onMouseEnter={openDrop} onMouseLeave={closeDrop}>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `flex items-center gap-1 transition-colors duration-200 ${isActive ? '!text-highlight' : ''}`
              }
            >
              projects
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${projectsDropOpen ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </NavLink>

            {projectsDropOpen && (
              <div
                className="absolute top-full left-0 w-full bg-gradient-primary py-1"
                style={{ borderRadius: '0 0 8px 8px' }}
                onMouseEnter={openDrop}
                onMouseLeave={closeDrop}
              >
                <NavLink
                  to="/projects"
                  end
                  onClick={() => setProjectsDropOpen(false)}
                  className={({ isActive }) =>
                    `block px-2 py-2 text-[10px] font-semibold uppercase tracking-wider leading-tight transition-colors ${isActive ? 'text-highlight' : 'text-light hover:text-highlight'}`
                  }
                >
                  Featured Projects
                </NavLink>
                <NavLink
                  to="/projects/all"
                  onClick={() => setProjectsDropOpen(false)}
                  className={({ isActive }) =>
                    `block px-2 py-2 text-[10px] font-semibold uppercase tracking-wider leading-tight transition-colors ${isActive ? 'text-highlight' : 'text-light hover:text-highlight'}`
                  }
                >
                  All Projects
                </NavLink>
              </div>
            )}
          </li>

          {OTHER_PAGES.map((page) => (
            <li key={page}>
              <NavLink
                to={`/${page}`}
                className={({ isActive }) =>
                  `transition-colors duration-200 ${isActive ? '!text-highlight' : ''}`
                }
              >
                {page}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 bg-transparent rounded hover:bg-highlight transition-colors text-light cursor-pointer"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path
              strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </nav>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gradient-primary px-6 pb-3 text-xs font-semibold uppercase tracking-wider">
          {/* Projects expandable row */}
          <button
            onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}
            className="flex items-center justify-between w-full py-2 hover:text-highlight transition-colors"
          >
            <span>Projects</span>
            <svg
              className={`w-3 h-3 transition-transform duration-200 ${mobileProjectsOpen ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {mobileProjectsOpen && (
            <div className="pl-3 pb-1 space-y-0.5">
              <NavLink
                to="/projects"
                end
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block py-1.5 transition-colors ${isActive ? 'text-highlight' : 'text-light/70 hover:text-highlight'}`
                }
              >
                Featured Projects
              </NavLink>
              <NavLink
                to="/projects/all"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block py-1.5 transition-colors ${isActive ? 'text-highlight' : 'text-light/70 hover:text-highlight'}`
                }
              >
                All Projects
              </NavLink>
            </div>
          )}

          {OTHER_PAGES.map((page) => (
            <NavLink
              key={page}
              to={`/${page}`}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block py-2 transition-colors duration-200 ${isActive ? 'text-highlight' : 'hover:text-highlight'}`
              }
            >
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
