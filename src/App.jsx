import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import NavBar from './components/Navbar'
// import ProjectCard from './components/ProjectCard'
// import TrackCanvas from './components/TrackCanvas'

import Homepage from './pages/Homepage';
import TrackPage from './pages/TrackPage';

function App() {
  return (
    <>
      <NavBar />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/track" element={<TrackPage />} />
        </Routes>



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
