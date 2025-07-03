import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import './App.css'
import NavBar from './components/Navbar'
import Footer from './components/Footer'
import Layout from "./components/Layout"

import About from './pages/About';
import Contact from './pages/Contact';
import Homepage from './pages/Homepage';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Research from './pages/Research';
import Resume from './pages/Resume';
import TrackPage from './pages/TrackPage';


import Color from './pages/ColorPage';

function App() {
  const location = useLocation();

  return (
    <>
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <main className="flex-1 relative overflow-hidden">
      <AnimatePresence mode="wait">

        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Layout key={location.pathname}> <Homepage /> </Layout>} />
          <Route path="/about" element={<Layout key={location.pathname}> <About /> </Layout>}/>
          <Route path="/contact" element={<Layout key={location.pathname}> <Contact /> </Layout>}/>
          <Route path="/projects" element={<Layout key={location.pathname}> <Projects /> </Layout>}/>
          <Route path="/projects/:id" element={<Layout key={location.pathname}> <ProjectDetail /> </Layout>} />
          <Route path="/research" element={<Layout key={location.pathname}> <Research /> </Layout>}/>
          <Route path="/resume" element={<Layout key={location.pathname}> <Resume /> </Layout>}/>
          <Route path="/track" element={<Layout key={location.pathname}> <TrackPage /> </Layout>} />


          {/* Color testing */}
          <Route path="/colors" element={<Color />} />
        </Routes>
      </AnimatePresence>
      </main>

      <Footer />

    </div>


    </>
  )
}

export default App
