import { useEffect, useState } from 'react';

export default function Skills() {
  const [skills, setSkills] = useState({ frontend: [], tools: [] });

  useEffect(() => {
    fetch('/api/skills')
      .then((res) => res.json())
      .then((data) => {
        setSkills({
          frontend: data.filter((s) => s.category === 'frontend'),
          tools: data.filter((s) => s.category === 'tools'),
        });
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelectorAll('.sbar').forEach((el) => {
        const L = +el.dataset.l;
        const bar = el.querySelector('.tr i');
        const b = el.querySelector('b');
        if (bar) bar.style.width = L + '%';
        if (b) b.textContent = L + '%';
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [skills]);

  return (
    <section className="sec" id="skills">
      <div className="wrap">
        <div className="head">
          <div className="eyebrow reveal in">02 / Skills</div>
          <h2 className="title reveal in" style={{ '--d': '.08s' }}>
            My <span>tech</span> arsenal
          </h2>
          <p className="sub reveal in" style={{ '--d': '.16s' }}>
            The tools and technologies I use to design, build and ship polished web experiences.
          </p>
        </div>

        <div className="skills">
          <div className="card reveal in">
            <h3>Frontend</h3>
            {skills.frontend.map((s) => (
              <div className="sbar" data-l={s.level} key={s._id}>
                <div className="lbl">
                  <span>{s.name}</span>
                  <b>0%</b>
                </div>
                <div className="tr"><i></i></div>
              </div>
            ))}
          </div>

          <div className="card reveal in">
            <h3>Tools &amp; Workflow</h3>
            {skills.tools.map((s) => (
              <div className="sbar" data-l={s.level} key={s._id}>
                <div className="lbl">
                  <span>{s.name}</span>
                  <b>0%</b>
                </div>
                <div className="tr"><i></i></div>
              </div>
            ))}
          </div>

          <div className="card orbit-card reveal in">
            <h3>Tech Orbit</h3>
            <div className="ov" aria-hidden="true">
              <div className="or a"></div>
              <div className="or b"></div>
              <div className="ctr">R</div>
              <div className="sat" style={{ '--t': '26s' }}><i>HTML</i></div>
              <div className="sat" style={{ '--t': '26s', '--dl': '-8.7s' }}><i>CSS</i></div>
              <div className="sat" style={{ '--t': '26s', '--dl': '-17.4s' }}><i>JS</i></div>
              <div className="sat in2" style={{ '--t': '18s' }}><i>React</i></div>
              <div className="sat in2" style={{ '--t': '18s', '--dl': '-9s' }}><i>Git</i></div>
            </div>
          </div>
        </div>

        <div className="tmarq" aria-hidden="true">
          <div>
            {['HTML5', 'CSS3', 'JavaScript', 'React', 'Vite', 'Git', 'GitHub', 'Figma',
              'Responsive Design', 'Animations', 'REST APIs', 'Performance',
              'HTML5', 'CSS3', 'JavaScript', 'React', 'Vite', 'Git', 'GitHub', 'Figma',
              'Responsive Design', 'Animations', 'REST APIs', 'Performance'].map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}