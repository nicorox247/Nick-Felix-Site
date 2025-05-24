import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/Navbar'
import ProjectCard from './components/ProjectCard'
import heroImg from './assets/hero.jpg'           // add any image you like
import TrackCanvas from './components/TrackCanvas'

function App() {
  return (
    <>
      <NavBar />

      <TrackCanvas />
      {/* Add overlay UI like nav bar, name, links, etc. */}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-sm text-center py-6">
        © {new Date().getFullYear()} Nick Felix. Built with&nbsp;
        <a href="https://vitejs.dev" className="text-blue-500 hover:underline">Vite</a> &amp;&nbsp;
        <a href="https://tailwindcss.com" className="text-blue-500 hover:underline">Tailwind CSS</a>.
      </footer>
    </>
  )
}

export default App
