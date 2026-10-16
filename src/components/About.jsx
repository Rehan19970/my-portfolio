import { useSettings } from '../hooks/useSettings';

export default function About() {
  const { settings } = useSettings();

  const facts = settings?.facts || [
    { label: 'Name', value: 'Rehan' },
    { label: 'Role', value: 'Web Developer' },
    { label: 'Email', value: 'your@email.com' },
    { label: 'Availability', value: 'Open for freelance' },
  ];

  return (
    <section className="sec" id="about">
      <div className="wrap about">
        <div className="reveal">
          <div className="frame">
            <div className="ring"></div>
            <div className="ring r2"></div>
            <div className="pic" role="img" aria-label="Rehan portrait illustration"></div>
            <div className="bdg b1"><b>5+</b>Projects shipped</div>
            <div className="bdg b2"><i></i>Open to work</div>
          </div>
        </div>
        <div>
          <div className="eyebrow reveal">01 / About me</div>
          <h2 className="title reveal" style={{ '--d': '.08s' }}>
            {settings?.aboutTitle || 'Turning ideas into living, breathing websites'}
          </h2>
          <p className="reveal" style={{ '--d': '.16s' }}>
            {settings?.aboutParagraph1 || "I'm Rehan, a web developer who loves building fast, beautiful and interactive websites. I started with simple HTML pages and kept pushing — today I create responsive, animated interfaces with modern tools like React and Vite."}
          </p>
          <p className="reveal" style={{ '--d': '.22s' }}>
            {settings?.aboutParagraph2 || "I care about clean code, pixel-level details and experiences that feel alive. Whether it's a business website, a dashboard or a creative portfolio, I focus on performance and a design people actually remember."}
          </p>
          <ul className="facts reveal" style={{ '--d': '.28s' }}>
            {facts.map((f, i) => (
              <li key={i}>
                <small>{f.label}</small>
                <span>{f.value}</span>
              </li>
            ))}
          </ul>
          <div className="btns reveal" style={{ '--d': '.34s' }}>
            <a className="btn b1" href="#contact">
              Hire Me
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 5 7 7-7 7" />
              </svg>
            </a>
            <a className="btn b2" href="#projects">
              See My Work
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}