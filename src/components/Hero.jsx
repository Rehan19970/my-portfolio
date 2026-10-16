import { useEffect, useState } from 'react';
import Robot from './Robot';
import GlassPanel from './GlassPanel';
import CodePanel from './CodePanel';
import TechSidebar from './TechSidebar';
import FeatureBar from './FeatureBar';
import { useSettings } from '../hooks/useSettings';

export default function Hero() {
  const { settings } = useSettings();
  const [stats, setStats] = useState([0, 0, 0]);

  const targets = settings?.stats?.map((s) => s.value) || [5, 2, 1];
  const labels = settings?.stats?.map((s) => s.label) || [
    'Projects Completed',
    'Happy Clients',
    'Years of Learning',
  ];

  useEffect(() => {
    const startTime = performance.now() + 1100;
    const duration = 1400;

    const step = (now) => {
      const k = Math.min(Math.max((now - startTime) / duration, 0), 1);
      const eased = 1 - Math.pow(1 - k, 3);
      setStats(targets.map((t) => Math.round(t * eased)));
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [settings]);

  return (
    <div className="hero" id="hero">
      <div className="bg">
        <div className="planet"></div>
        <svg className="rocks" viewBox="0 0 1000 420" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="rk" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0a1a3a" />
              <stop offset="1" stopColor="#020611" />
            </linearGradient>
          </defs>
          <path d="M0 420V300l50-18 46 14 40-34 34 20 24-30 20 50 32-24 22-62 18 62 40-30 34 28 30-46 22 34 46-12 56 40 70-14 80 28 90 8 80 30 66 14v140z" fill="url(#rk)" opacity=".92" />
          <g fill="#ff7a2a" opacity=".75">
            <circle cx="330" cy="262" r="1.5" />
            <circle cx="344" cy="280" r="1.2" />
            <circle cx="432" cy="250" r="1.4" />
            <circle cx="262" cy="300" r="1.2" />
            <circle cx="196" cy="312" r="1.3" />
          </g>
        </svg>
        <div className="fog"></div>
        <div className="grain"></div>
      </div>

      <div className="rail">
        <div className="scroll">
          <span>SCROLL DOWN</span>
          <div className="mouse"></div>
        </div>
      </div>

      <div className="nav-sp"></div>

      <main className="main" id="home">
        <section className="copy">
          <div className="hello rv" style={{ '--d': '.25s' }}>
            {settings?.helloText || "Hello, I'm"}
          </div>
          <h1 className="rv" style={{ '--d': '.4s' }}>
            <span className="n">{settings?.heroName || 'Rehan'}</span>
            <span className="r">{settings?.heroTitle || 'Web Developer'}</span>
          </h1>
          <p className="lead rv" style={{ '--d': '.6s' }}>
            {settings?.heroSubtitle || 'I build modern, responsive and interactive web experiences that bring ideas to life. Turning your vision into powerful digital solutions.'}
          </p>
          <div className="btns rv" style={{ '--d': '.8s' }}>
            <a className="btn b1" href="#projects">
              View My Projects
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 5 7 7-7 7" />
              </svg>
            </a>
            {settings?.resumeUrl ? (
              <a className="btn b2" href={settings.resumeUrl} target="_blank" rel="noreferrer" download>
                Download CV
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14" />
                </svg>
              </a>
            ) : (
              <a className="btn b2" href="#" download>
                Download CV
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14" />
                </svg>
              </a>
            )}
          </div>
          <div className="stats rv" style={{ '--d': '1s' }}>
            {stats.map((s, i) => (
              <div className="stat" key={i}>
                <b>{s}+</b>
                <span>{labels[i]}</span>
              </div>
            ))}
          </div>
        </section>

        <Robot />
        <GlassPanel />
        <CodePanel />
        <TechSidebar />
      </main>

      <FeatureBar />
    </div>
  );
}