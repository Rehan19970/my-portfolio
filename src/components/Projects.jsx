import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const { projects, loading, error } = useProjects();

  const filtered = filter === 'all'
    ? projects
    : projects.filter((p) => p.category === filter);

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'app', label: 'Web Apps' },
    { key: 'land', label: 'Landing Pages' },
    { key: 'ui', label: 'UI Design' }
  ];

  return (
    <section className="sec" id="projects">
      <div className="wrap">
        <div className="head">
          <div className="eyebrow reveal in">03 / Projects</div>
          <h2 className="title reveal in" style={{ '--d': '.08s' }}>
            Selected <span>work</span>
          </h2>
          <p className="sub reveal in" style={{ '--d': '.16s' }}>
            A few things I've built recently. Click any card to read the full case study.
          </p>
          <div className="filters reveal in" style={{ '--d': '.22s' }}>
            {filters.map((f) => (
              <button
                key={f.key}
                className={filter === f.key ? 'on' : ''}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#7fe9ff' }}>
            Loading projects...
          </div>
        )}

        {error && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#ff8a8a' }}>
            {error}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#7f97b8' }}>
            No projects found.
          </div>
        )}

        <div className="pgrid">
          {filtered.map((p) => (
            <Link
              key={p._id}
              to={`/project/${p.slug}`}
              className="pcard card"
              style={{ textDecoration: 'none' }}
            >
              <div
                className="thumb"
                style={{
                  '--g': p.gradient,
                  '--a': p.accent,
                  backgroundImage: p.coverImage ? `url(${p.coverImage})` : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Agar image hai toh mock nahi dikhao */}
                {!p.coverImage && (
                  <div className="mock">
                    <b></b><b></b><b></b>
                    <s></s><s className="w"></s>
                  </div>
                )}
              </div>
              <div className="pinfo">
                <div className="tags">
                  {p.tags?.map((t) => <span key={t}>{t}</span>)}
                </div>
                <h3>{p.title}</h3>
                <p>{p.shortDesc}</p>
                <div className="plinks">
                  <span style={{ color: 'var(--cyan)' }}>View Case Study →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}