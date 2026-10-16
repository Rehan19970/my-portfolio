import { useParams, Link } from 'react-router-dom';
import { useProject } from '../hooks/useProject';
import { useProjects } from '../hooks/useProjects';

export default function CaseStudy() {
  const { slug } = useParams();
  const { project, loading, error } = useProject(slug);
  const { projects } = useProjects();

  if (loading) {
    return (
      <div className="sec" style={{ paddingTop: '160px', textAlign: 'center' }}>
        <p style={{ color: '#7fe9ff' }}>Loading...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="sec" style={{ paddingTop: '160px', textAlign: 'center' }}>
        <h1 className="title">Project not found</h1>
        <Link className="btn b1" to="/" style={{ marginTop: '30px', display: 'inline-flex' }}>
          Back to Home
        </Link>
      </div>
    );
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects.length > 1
    ? projects[(currentIndex + 1) % projects.length]
    : null;

  return (
    <section className="sec case-study" style={{ paddingTop: '160px' }}>
      <div className="wrap">
        <Link to="/#projects" className="back-link">← Back to Projects</Link>

        {/* HERO */}
        <div className="cs-hero">
          <div className="eyebrow">{project.year} / {project.category.toUpperCase()}</div>
          <h1 className="cs-title">{project.title}</h1>
          <p className="cs-subtitle">{project.shortDesc}</p>

          <div className="cs-meta">
            <div><small>ROLE</small><span>{project.role}</span></div>
            <div><small>YEAR</small><span>{project.year}</span></div>
            <div><small>DURATION</small><span>{project.duration}</span></div>
            {project.client && <div><small>CLIENT</small><span>{project.client}</span></div>}
            {project.team && <div><small>TEAM</small><span>{project.team}</span></div>}
          </div>

          <div className="cs-actions">
            <a className="btn b1" href={project.liveUrl} target="_blank" rel="noreferrer">Live Demo ↗</a>
            <a className="btn b2" href={project.sourceUrl} target="_blank" rel="noreferrer">Source Code</a>
          </div>
        </div>

        {/* COVER — Image ya gradient */}
        <div
          className="cs-cover"
          style={{
            background: project.coverImage
              ? `url(${project.coverImage}) center/cover no-repeat`
              : project.gradient,
          }}
        >
          {!project.coverImage && (
            <div className="cs-cover-mock">
              <b></b><b></b><b></b>
              <s></s><s className="w"></s>
            </div>
          )}
        </div>

        {/* OVERVIEW */}
        {project.overview && (
          <div className="cs-section">
            <h2>Overview</h2>
            <p>{project.overview}</p>
          </div>
        )}

        {/* PROBLEM */}
        {project.problem && (
          <div className="cs-section">
            <h2>The Problem</h2>
            <p>{project.problem}</p>
          </div>
        )}

        {/* CHALLENGES */}
        {project.challenges?.length > 0 && (
          <div className="cs-section">
            <h2>Challenges &amp; Complications</h2>
            <div className="cs-challenges">
              {project.challenges.map((c, i) => (
                <div key={i} className="cs-challenge">
                  <h4>{c.title}</h4>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MISTAKES */}
        {project.mistakes?.length > 0 && (
          <div className="cs-section">
            <h2>What Went Wrong</h2>
            <p className="cs-section-note">
              Every project has mistakes. Here are the ones I made — and what I learned from them.
            </p>
            <ul className="cs-mistakes">
              {project.mistakes.map((m, i) => <li key={i}>{m}</li>)}
            </ul>
          </div>
        )}

        {/* SOLUTION */}
        {project.solution && (
          <div className="cs-section">
            <h2>The Solution</h2>
            <p>{project.solution}</p>
          </div>
        )}

        {/* SCREENSHOTS GALLERY */}
        {project.screenshots?.length > 0 && (
          <div className="cs-section">
            <h2>Screenshots</h2>
            <div className="cs-gallery">
              {project.screenshots.map((img, i) => (
                <div key={i} className="cs-gallery-item">
                  <img src={img} alt={`${project.title} screenshot ${i + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FEATURES */}
        {project.features?.length > 0 && (
          <div className="cs-section">
            <h2>Key Features</h2>
            <ul className="cs-features">
              {project.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </div>
        )}

        {/* TECH STACK */}
        {project.techStack?.length > 0 && (
          <div className="cs-section">
            <h2>Tech Stack</h2>
            <div className="cs-tech">
              {project.techStack.map((t, i) => (
                <div key={i} className="cs-tech-item">
                  <span className="cs-tech-name">{t.name}</span>
                  <span className="cs-tech-reason">{t.reason}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RESULTS */}
        {project.results?.length > 0 && (
          <div className="cs-section">
            <h2>Results</h2>
            <p className="cs-section-note">Measurable impact after the changes.</p>
            <div className="cs-results">
              {project.results.map((r, i) => (
                <div key={i} className="cs-result">
                  <span className="cs-result-label">{r.label}</span>
                  <div className="cs-result-values">
                    <span className="cs-result-before">{r.before}</span>
                    <span className="cs-result-arrow">→</span>
                    <span className="cs-result-after">{r.after}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LESSONS */}
        {project.lessons?.length > 0 && (
          <div className="cs-section">
            <h2>Lessons Learned</h2>
            <ul className="cs-lessons">
              {project.lessons.map((l, i) => (
                <li key={i}>
                  <span className="cs-lesson-num">0{i + 1}</span>
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* NEXT PROJECT */}
        {nextProject && (
          <div className="cs-next">
            <small>NEXT PROJECT</small>
            <Link to={`/project/${nextProject.slug}`} className="cs-next-link">
              <h3>{nextProject.title}</h3>
              <span>View Case Study →</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}