import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar, Landing, About, Skills, Projects, Contact, Experience, Resume } from './index.js';
import Preloader from './components/Preloader.jsx';
import { useState, useEffect } from 'react';

function App() {
  const [loading, setLoading] = useState(() => {
    return !localStorage.getItem('hasVisitedBefore') && window.location.pathname === '/';
  });

  useEffect(() => {
    if (loading) {
      localStorage.setItem('hasVisitedBefore', 'true');
      setTimeout(() => {
        setLoading(false);
      }, 2500);
    }
  }, [loading]);

  return loading ? <Preloader /> : (
    <BrowserRouter>
      <div className="bg-black min-h-screen">
        <Navbar />
        <div className="pt-16"> {/* Added padding to account for fixed navbar */}
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/resume" element={<Resume />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
