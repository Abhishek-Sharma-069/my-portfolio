import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Navbar, Landing, About, Skills, Projects, Contact, Experience, Resume } from './index.js';
import Preloader from './components/Preloader.jsx';
import { useState, useEffect } from 'react';

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(location.pathname === '/');

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => setLoading(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (loading && location.pathname === '/') return <Preloader />;

  return (
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
  );
}

export default App;
