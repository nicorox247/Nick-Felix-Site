import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import NavBar from './components/Navbar'
import Footer from './components/Footer'

import About from './pages/About';
import Contact from './pages/Contact';
import Homepage from './pages/Homepage';
import Projects from './pages/Projects';
import Research from './pages/Research';
import Resume from './pages/Resume';
import TrackPage from './pages/TrackPage';

import Color from './pages/ColorPage';

function App() {
  return (
    <>
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <main className="flex-1 relative overflow-hidden">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/projects" element={<Projects />}/>
          <Route path="/research" element={<Research />}/>
          <Route path="/resume" element={<Resume />}/>
          <Route path="/track" element={<TrackPage />} />

          {/* Color testing */}
          <Route path="/colors" element={<Color />} />
        </Routes>
      </main>

      <Footer />

    </div>


    </>
  )
}

export default App
