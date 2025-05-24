export default function NavBar() {
    return (
      <header className="bg-gray-900 text-white">
        <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <h1 className="text-xl font-bold tracking-wide">Nick&nbsp;Felix</h1>
          <ul className="hidden md:flex gap-6 text-sm uppercase tracking-wider">
            <li className="hover:text-blue-400 transition">About</li>
            <li className="hover:text-blue-400 transition">Projects</li>
            <li className="hover:text-blue-400 transition">Contact</li>
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
  