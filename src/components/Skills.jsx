import { useEffect } from 'react';
import { useSkills } from '../hooks/useSkills';

export default function Skills() {
  const { skills, loading } = useSkills();

  // Bar animation
  useEffect(() => {
    if (loading) return;

    const timer = setTimeout(() => {
      document.querySelectorAll('.sbar').forEach((el) => {
        const L = +el.dataset.l;
        const b = el.querySelector('b');
        const bar = el.querySelector('.tr i');
        if (bar) bar.style.width = L + '%';
        if (b) b.textContent = L + '%';
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [loading, skills]);

  const marquee = [
    'HTML5', 'CSS3', 'JavaScript', 'React', 'Vite', 'Git',
    'GitHub', 'Figma', 'Responsive Design', 'Animations',
    'REST APIs', 'Performance'
  ];

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

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#7fe9ff' }}>
            Loading skills...
          </div>
        ) : (
          <div className="skills">
            <div className="card reveal in">
              <h3>Frontend</h3>
              {skills.frontend.length === 0 ? (
                <p style={{ color: '#7f97b8' }}>No skills found</p>
              ) : (
                skills.frontend.map((s) => (
                  <div className="sbar" data-l={s.level} key={s._id}>
                    <div className="lbl">
                      <span>{s.name}</span>
                      <b>{s.level}%</b>
                    </div>
                    <div className="tr">
                      <i style={{ width: `${s.level}%` }}></i>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="card reveal in" style={{ '--d': '.1s' }}>
              <h3>Tools &amp; Workflow</h3>
              {skills.tools.length === 0 ? (
                <p style={{ color: '#7f97b8' }}>No tools found</p>
              ) : (
                skills.tools.map((s) => (
                  <div className="sbar" data-l={s.level} key={s._id}>
                    <div className="lbl">
                      <span>{s.name}</span>
                      <b>{s.level}%</b>
                    </div>
                    <div className="tr">
                      <i style={{ width: `${s.level}%` }}></i>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="card orbit-card reveal in" style={{ '--d': '.2s' }}>
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
        )}

        <div className="tmarq" aria-hidden="true">
          <div>
            {[...marquee, ...marquee].map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}