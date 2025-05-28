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
          <Route path="/track" element={<TrackPage />} />
        </Routes>
      </main>

      <footer className="bg-gray-900 text-gray-400 text-sm text-center py-6">
        © {new Date().getFullYear()} Nick Felix. Built with&nbsp;
        <a href="https://vitejs.dev" className="text-blue-500 hover:underline">Vite</a> &amp;&nbsp;
        <a href="https://tailwindcss.com" className="text-blue-500 hover:underline">Tailwind CSS</a>.
      </footer>
    </div>


    </>
  )
}

export default App
