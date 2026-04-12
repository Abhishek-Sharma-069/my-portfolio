import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar, Landing, About, Skills, Projects, Contact, Experience, Resume } from './index.js';
import Preloader from './components/Preloader.jsx';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPortfolioData } from './redux/slices/portfolioSlice';

// Admin components
import AdminLayout from './admin/AdminLayout';
import LoginPage from './admin/LoginPage';
import Dashboard from './admin/Dashboard';
import ProjectsManager from './admin/ProjectsManager';
import ExperienceManager from './admin/ExperienceManager';
import SkillsManager from './admin/SkillsManager';
import ResumeManager from './admin/ResumeManager';
import ProtectedRoute from './admin/ProtectedRoute';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(location.pathname === '/');

  useEffect(() => {
    dispatch(fetchPortfolioData());
  }, [dispatch]);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => setLoading(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const isAdminRoute = location.pathname.startsWith('/admin');

  if (loading && location.pathname === '/') return <Preloader />;

  return (
    <div className={isAdminRoute ? '' : 'bg-black min-h-screen'}>
      {!isAdminRoute && <Navbar />}
      <div className={!isAdminRoute ? 'pt-16' : ''}> {/* Added padding to account for fixed navbar */}
        <Routes>
          {/* Frontend Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resume" element={<Resume />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="projects" element={<ProjectsManager />} />
              <Route path="experience" element={<ExperienceManager />} />
              <Route path="skills" element={<SkillsManager />} />
              <Route path="resume" element={<ResumeManager />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
