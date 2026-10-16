import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const links = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];

  // Lenis smooth scroll to section
  const handleNavClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const lenis = window.__lenis;
      if (lenis) {
        lenis.scrollTo(element, { offset: -80, duration: 1.4 });
      } else {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <Link className="logo" to="/" aria-label="Home">
        <svg viewBox="0 0 40 40">
          <defs>
            <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#3cf5ff" />
              <stop offset="1" stopColor="#2a7bff" />
            </linearGradient>
          </defs>
          <path fillRule="evenodd" fill="url(#lg)" d="M5 3h18.5a10.5 10.5 0 0 1 4.6 19.9L36 37h-8.4l-6.9-12H13v12H5zM13 10v8h9.8a4 4 0 0 0 0-8z" />
        </svg>
        <b>REHAN</b>
      </Link>

      <nav className="links">
        {links.map((l) => (
          <a key={l} href={`#${l}`} onClick={(e) => handleNavClick(e, l)}>
            {l.charAt(0).toUpperCase() + l.slice(1)}
          </a>
        ))}
      </nav>

      <div className="nav-r">
        <a className="talk" href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>
          <i></i>Let's Talk
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 5 7 7-7 7" />
          </svg>
        </a>
        <button
          className={`burger ${menuOpen ? 'x' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      <div className={`menu ${menuOpen ? 'open' : ''}`}>
        {links.map((l) => (
          <a key={l} href={`#${l}`} onClick={(e) => { handleNavClick(e, l); setMenuOpen(false); }}>
            {l.charAt(0).toUpperCase() + l.slice(1)}
          </a>
        ))}
      </div>
    </header>
  );
}