import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  const clickCount = useRef(0);
  const clickTimer = useRef(null);

  const year = new Date().getFullYear();

  // 3 clicks ke andar login
  const handleLogoClick = (e) => {
    e.preventDefault();
    clickCount.current += 1;

    // Pehle click pe timer start karo
    if (clickCount.current === 1) {
      clickTimer.current = setTimeout(() => {
        clickCount.current = 0;
        // Agar 3 click nahi hue toh normal home page pe bhejo
        if (clickCount.current < 3) {
          // Yahan navigate nahi karenge — kyunki user ne home pe jaana chaha
          navigate('/');
        }
      }, 600);
    }

    // 3 click ho gaye — login page kholo
    if (clickCount.current >= 3) {
      clearTimeout(clickTimer.current);
      clickCount.current = 0;
      navigate('/admin');
    }
  };

  return (
    <footer className="site">
      <div className="fwrap">
        {/* Logo — 3 click se login */}
        <a
          className="logo"
          href="/"
          onClick={handleLogoClick}
          aria-label="Home"
          title="Rehan"
        >
          <svg viewBox="0 0 40 40" style={{ width: '30px', height: '30px' }}>
            <path
              fillRule="evenodd"
              fill="#22e5ff"
              d="M5 3h18.5a10.5 10.5 0 0 1 4.6 19.9L36 37h-8.4l-6.9-12H13v12H5zM13 10v8h9.8a4 4 0 0 0 0-8z"
            />
          </svg>
          <b style={{ fontSize: '1rem' }}>REHAN</b>
        </a>

        <p>
          &copy; {year} Rehan. Designed &amp; built with passion.
        </p>

        <button
          className="totop"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m5 15 7-7 7 7" />
          </svg>
        </button>
      </div>
    </footer>
  );
}