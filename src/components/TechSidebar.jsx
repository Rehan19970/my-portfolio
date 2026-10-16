export default function TechSidebar() {
  return (
    <aside className="tech" aria-label="Tech stack">
      <div>
        <svg viewBox="-13 -13 26 26">
          <g fill="none" stroke="#61dafb" strokeWidth="1.1">
            <ellipse rx="11" ry="4.4" />
            <ellipse rx="11" ry="4.4" transform="rotate(60)" />
            <ellipse rx="11" ry="4.4" transform="rotate(120)" />
          </g>
          <circle r="2" fill="#61dafb" />
        </svg>
        <span>React</span>
      </div>

      <div>
        <svg viewBox="0 0 32 32">
          <defs>
            <linearGradient id="vg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#41d1ff" />
              <stop offset="1" stopColor="#bd34fe" />
            </linearGradient>
          </defs>
          <path d="M29.2 6.2 17.1 27.9a1 1 0 0 1-1.74 0L3 6.2A1 1 0 0 1 4.1 4.7l12 2.15 11.9-2.15a1 1 0 0 1 1.2 1.5Z" fill="url(#vg)" />
          <path d="m22.2 4-7.2 1.4-.5 8.7 3.1-.7-1.4 6.7 4.9-9.2-3.1.8z" fill="#ffd62e" />
        </svg>
        <span>Vite</span>
      </div>

      <div>
        <svg viewBox="0 0 32 32">
          <rect x="2" y="2" width="28" height="28" rx="3" fill="#f7df1e" />
          <text x="17.5" y="26" textAnchor="middle" fontSize="14" fontWeight="800" fontFamily="Arial,sans-serif" fill="#111">JS</text>
        </svg>
        <span>JavaScript</span>
      </div>

      <div>
        <svg viewBox="0 0 32 32">
          <path d="M4 3h24l-2.2 24.2L16 30l-9.8-2.8z" fill="#2965f1" />
          <path d="M16 5.5v22.9l7.9-2.2 1.9-20.7z" fill="#4b8cff" />
          <text x="16" y="21.5" textAnchor="middle" fontSize="14" fontWeight="800" fontFamily="Arial,sans-serif" fill="#fff">3</text>
        </svg>
        <span>CSS</span>
      </div>
    </aside>
  );
}