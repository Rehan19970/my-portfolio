import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Home from './pages/Home';
import CaseStudy from './pages/CaseStudy';
import NotFound from './pages/NotFound';              // ← NAYA
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useStars } from './hooks/useStars';
import { useScrollReveal } from './hooks/useScrollReveal';
import { useSmoothScroll } from './hooks/useSmoothScroll';

import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ProjectsAdmin from './pages/admin/ProjectsAdmin';
import ProjectForm from './pages/admin/ProjectForm';
import ExperienceAdmin from './pages/admin/ExperienceAdmin';
import SkillsAdmin from './pages/admin/SkillsAdmin';
import SettingsAdmin from './pages/admin/SettingsAdmin';
import MessagesAdmin from './pages/admin/MessagesAdmin';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';

import './styles/admin.css';
import './styles/notfound.css';                        // ← NAYA

export default function App() {
  const navigate = useNavigate();

  useStars();
  useScrollReveal();
  useSmoothScroll();

  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'L' || e.key === 'l')) {
        e.preventDefault();
        navigate('/admin');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [navigate]);

  return (
    <Routes>
      {/* Public */}
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Home />
            <Footer />
          </>
        }
      />
      <Route
        path="/project/:slug"
        element={
          <>
            <Navbar />
            <CaseStudy />
            <Footer />
          </>
        }
      />

      {/* Admin Login */}
      <Route path="/admin" element={<Login />} />

      {/* Admin Protected */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="projects" element={<ProjectsAdmin />} />
        <Route path="projects/new" element={<ProjectForm />} />
        <Route path="projects/edit/:id" element={<ProjectForm />} />
        <Route path="experience" element={<ExperienceAdmin />} />
        <Route path="skills" element={<SkillsAdmin />} />
        <Route path="settings" element={<SettingsAdmin />} />
        <Route path="messages" element={<MessagesAdmin />} />
      </Route>

      {/* 404 - SAB SE AAKHIR MEIN */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}