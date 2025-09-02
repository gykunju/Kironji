import { useState } from 'react'
import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Events from './pages/Events'
import Memories from './pages/Memories'
import WishList from './pages/WishList'
import Navigation from './components/Navigation'
import './App.css'


function App() {

  return (
    <div className="bg-[#161313] min-h-screen text-[#88BDF2]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/memories" element={<Memories />} />
        <Route path="/wishlist" element={<WishList />} />
      </Routes>
      <Navigation />
    </div>
  );
}

export default App
