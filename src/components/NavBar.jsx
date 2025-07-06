import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gradient-primary text-light shadow-md backdrop-blur bg-opacity-90">
      <nav className="max-w-7xl mx-auto flex items-center justify-between p-4 px-6 md:px-8">
        {/* Logo / Name */}
        <Link
          to="/"
          className="text-2xl md:text-3xl font-extrabold tracking-wider hover:text-highlight transition-colors duration-300"
        >
          Nick Felix
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 text-sm font-semibold uppercase tracking-wider">
          {['projects', 'research', 'about', 'resume', 'contact'].map((page) => (
            <li key={page}>
              <NavLink
                to={`/${page}`}
                className={({ isActive }) =>
                  `transition-colors duration-200 hover:text-highlight ${
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
          className="md:hidden p-2 rounded hover:bg-highlight transition-colors"
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
        <div className="md:hidden bg-primary px-6 pb-4 space-y-2 text-sm font-medium">
          {['projects', 'research', 'about', 'resume', 'contact'].map((page) => (
            <Link
              key={page}
              to={`/${page}`}
              onClick={() => setIsOpen(false)}
              className="block w-full py-2 text-light hover:text-highlight transition-colors duration-200"
            >
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
