import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import NavBar from './components/Navbar'

import Homepage from './pages/Homepage';
import TrackPage from './pages/TrackPage';

function App() {
  return (
    <>
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <main className="flex-1 relative overflow-hidden">
        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* <Route path="/projects" element={<Projects />}/> */}
          {/* <Route path="/research" element={<Research />}/> */}
          {/* <Route path="/about" element={<About />}/> */}
          {/* <Route path="/contact" element={<Contact />}/> */}
          <Route path="/track" element={<TrackPage />} />
        </Routes>
      </main>

      <footer className="w-full bg-gray-900 text-gray-400 text-sm text-center py-6">
        <div className="flex justify-center items-center space-x-6 mb-2">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/nick-felix/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <svg className="w-6 h-6 hover:text-blue-400 transition" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5V5c0-2.761-2.239-5-5-5zM7.09 19H4.5V9h2.59v10zM5.79 7.7c-.837 0-1.52-.683-1.52-1.52s.683-1.52 1.52-1.52 1.52.683 1.52 1.52-.682 1.52-1.52 1.52zM20 19h-2.59v-4.848c0-2.723-3.25-2.514-3.25 0V19h-2.59V9h2.59v1.257c1.209-2.231 5.84-2.394 5.84 2.13V19z" />
            </svg>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/nicorox247"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
          <svg
            className="w-6 h-6 hover:text-white transition"
            fill="currentColor"
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
        </div>

        <p>
          © {new Date().getFullYear()} Nick Felix. Built with&nbsp;
          <a href="https://vitejs.dev" className="text-blue-500 hover:underline">Vite</a> &amp;&nbsp;
          <a href="https://tailwindcss.com" className="text-blue-500 hover:underline">Tailwind CSS</a>.
        </p>
      </footer>

    </div>


    </>
  )
}

export default App
