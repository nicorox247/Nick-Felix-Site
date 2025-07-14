import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gradient-primary text-light shadow-md backdrop-blur">
      <nav className="lg:max-w-[90%] mx-auto flex items-center justify-between py-3 px-6">
        {/* Logo / Name */}
        <Link
          to="/"
          className="text-3xl md:text-4xl font-extrabold tracking-wider transition-colors duration-300"
        >
          Nick Felix
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 text-sm md:text-md font-semibold uppercase tracking-wider">
          {['projects', 'research', 'about', 'resume', 'contact'].map((page) => (
            <li key={page}>
              <NavLink
                to={`/${page}`}
                className={({ isActive }) =>
                  `transition-colors duration-200 ${
                    isActive ? '!text-highlight' : ''
                  }`
                }
              >
                {page}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 bg-transparent rounded hover:bg-highlight transition-colors text-light cursor-pointer"
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gradient-primary px-6 pb-4 space-y-2 text-sm font-medium">
          {['projects', 'research', 'about', 'resume', 'contact'].map((page) => (
            <NavLink
              key={page}
              to={`/${page}`}
              onClick={() => setIsOpen(false)}
              
              className={({ isActive }) =>
                `block w-full py-2 transition-colors duration-200 ${
                  isActive ? 'bg-highlight text-dark' : 'hover:bg-highlight hover:text-dark'
                }`
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
