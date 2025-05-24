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

      {/* Hero Section */}
      <section
        className="bg-cover bg-center h-[60vh] flex flex-col items-center justify-center text-white text-center"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <h2 className="text-4xl md:text-6xl font-bold drop-shadow-md">
          Building Modern Web&nbsp;Experiences
        </h2>
        <p className="mt-4 text-lg md:text-2xl max-w-2xl">
          I’m Nick — software developer, athlete, and perpetual learner.
        </p>
        <button className="mt-8 bg-blue-600 hover:bg-blue-700 py-3 px-8 rounded shadow-lg">
          Hire Me
        </button>
      </section>

      {/* Projects Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Projects</h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <ProjectCard
            title="Crypto Arbitrage Bot"
            description="Algorithmic trading bot exploiting price inefficiencies across exchanges."
            img="https://picsum.photos/id/180/400/300"
          />
          <ProjectCard
            title="Muscle-Map Trainer"
            description="Interactive anatomy site that teaches proper exercise form."
            img="https://picsum.photos/id/1011/400/300"
          />
          <ProjectCard
            title="Track Performance Dashboard"
            description="Data-driven dashboard for analyzing sprint splits and workout load."
            img="https://picsum.photos/id/1025/400/300"
          />
        </div>
      </section>

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
