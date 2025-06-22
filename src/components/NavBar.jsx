import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


export default function NavBar() {
    return (
      <header className="bg-gray-900 text-white">
        <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-2xl md:text-3xl font-extrabold tracking-wide">
          Nick&nbsp;Felix
        </Link>


          <ul className="hidden md:flex gap-6 text-sm uppercase tracking-wider">
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li>
              <Link to="/research">Research</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>


          {/* Mobile hamburger (optional) */}
          <button className="md:hidden p-2 hover:bg-gray-800 rounded">
            <span className="sr-only">Open menu</span>
            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </nav>
      </header>
    )
  }
  