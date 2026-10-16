import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-bg">
        <div className="notfound-glow"></div>
      </div>

      <div className="notfound-content">
        <div className="notfound-code">404</div>

        <h1 className="notfound-title">
          Page <span>Not Found</span>
        </h1>

        <p className="notfound-desc">
          Oops! Lagta hai tum kisi aisi jagah pahunch gaye ho jo exist nahi karti.
          Chalo wapas home pe chalte hain.
        </p>

        <div className="notfound-actions">
          <Link to="/" className="btn b1">
            Back to Home
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 5 7 7-7 7" />
            </svg>
          </Link>
          <Link to="/#projects" className="btn b2">
            View Projects
          </Link>
        </div>

        <div className="notfound-hint">
          <span>404</span> · Page not found · Rehan Portfolio
        </div>
      </div>
    </div>
  );
}