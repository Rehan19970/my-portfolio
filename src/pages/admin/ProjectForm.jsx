import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createProject,
  updateProject,
} from '../../api/projects';
import { uploadImage } from '../../api/settings';
import client from '../../api/client';

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    slug: '',
    title: '',
    category: 'app',
    tags: '',
    shortDesc: '',
    gradient: 'linear-gradient(135deg,#0a3a8a,#12b5ff)',
    accent: '#22e5ff',
    year: new Date().getFullYear().toString(),
    duration: '',
    role: '',
    client: '',
    team: '',
    coverImage: '',
    screenshots: [],
    overview: '',
    problem: '',
    solution: '',
    liveUrl: '#',
    sourceUrl: '#',
  });

  const [challenges, setChallenges] = useState([{ title: '', desc: '' }]);
  const [mistakes, setMistakes] = useState(['']);
  const [features, setFeatures] = useState(['']);
  const [techStack, setTechStack] = useState([{ name: '', reason: '' }]);
  const [results, setResults] = useState([{ label: '', before: '', after: '' }]);
  const [lessons, setLessons] = useState(['']);

  // Edit mode: existing data load karo
  useEffect(() => {
    if (!isEdit) return;

    async function load() {
      try {
        const all = await client.get('/projects');
        const project = all.data.find((p) => p._id === id);
        if (!project) throw new Error('Project not found');

        setForm({
          slug: project.slug || '',
          title: project.title || '',
          category: project.category || 'app',
          tags: (project.tags || []).join(', '),
          shortDesc: project.shortDesc || '',
          gradient: project.gradient || '',
          accent: project.accent || '',
          year: project.year || '',
          duration: project.duration || '',
          role: project.role || '',
          client: project.client || '',
          team: project.team || '',
          coverImage: project.coverImage || '',
          screenshots: project.screenshots || [],
          overview: project.overview || '',
          problem: project.problem || '',
          solution: project.solution || '',
          liveUrl: project.liveUrl || '#',
          sourceUrl: project.sourceUrl || '#',
        });

        setChallenges(
          project.challenges?.length
            ? project.challenges
            : [{ title: '', desc: '' }]
        );
        setMistakes(project.mistakes?.length ? project.mistakes : ['']);
        setFeatures(project.features?.length ? project.features : ['']);
        setTechStack(
          project.techStack?.length
            ? project.techStack
            : [{ name: '', reason: '' }]
        );
        setResults(
          project.results?.length
            ? project.results
            : [{ label: '', before: '', after: '' }]
        );
        setLessons(project.lessons?.length ? project.lessons : ['']);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, isEdit]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Auto slug
  const handleTitleChange = (value) => {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: isEdit
        ? prev.slug
        : value
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, ''),
    }));
  };

  // ============= IMAGE UPLOADS =============
  const handleCoverImageUpload = async (file) => {
    if (!file) return;
    try {
      setUploading(true);
      setError('');
      const result = await uploadImage(file);
      handleChange('coverImage', result.url);
    } catch (err) {
      setError('Cover upload failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setUploading(false);
    }
  };

  const handleScreenshotsUpload = async (files) => {
    if (!files || files.length === 0) return;
    try {
      setUploading(true);
      setError('');
      const uploadPromises = Array.from(files).map((file) => uploadImage(file));
      const uploadedResults = await Promise.all(uploadPromises);
      const newUrls = uploadedResults.map((r) => r.url);
      setForm((prev) => ({
        ...prev,
        screenshots: [...(prev.screenshots || []), ...newUrls],
      }));
    } catch (err) {
      setError('Screenshots upload failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setUploading(false);
    }
  };

  const removeScreenshot = (index) => {
    setForm((prev) => ({
      ...prev,
      screenshots: prev.screenshots.filter((_, i) => i !== index),
    }));
  };

  // ============= SUBMIT =============
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const payload = {
        ...form,
        tags: form.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        challenges: challenges.filter((c) => c.title && c.desc),
        mistakes: mistakes.filter(Boolean),
        features: features.filter(Boolean),
        techStack: techStack.filter((t) => t.name && t.reason),
        results: results.filter((r) => r.label && r.before && r.after),
        lessons: lessons.filter(Boolean),
        screenshots: form.screenshots || [],
      };

      if (isEdit) {
        await updateProject(id, payload);
      } else {
        await createProject(payload);
      }

      navigate('/admin/projects');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  // ============= DYNAMIC LIST HELPERS =============
  const addItem = (setter, list) =>
    setter([
      ...list,
      typeof list[0] === 'string' ? '' : { ...list[0] },
    ]);

  const removeItem = (setter, list, i) =>
    setter(list.filter((_, idx) => idx !== i));

  const updateItem = (setter, list, i, value) => {
    const copy = [...list];
    copy[i] = value;
    setter(copy);
  };

  if (loading) {
    return <div className="admin-loading">Loading project...</div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>{isEdit ? 'Edit Project' : 'Add New Project'}</h1>
          <p>{isEdit ? 'Update project details' : 'Fill in the details below'}</p>
        </div>
        <button
          type="button"
          className="admin-btn-secondary"
          onClick={() => navigate('/admin/projects')}
        >
          ← Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="admin-form">
        {error && <div className="admin-error">{error}</div>}

        {/* ============= BASIC INFO ============= */}
        <section className="admin-form-section">
          <h2>Basic Info</h2>
          <div className="admin-grid-2">
            <div className="admin-fld">
              <label>Title *</label>
              <input
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                required
                placeholder="Neon Store"
              />
            </div>
            <div className="admin-fld">
              <label>Slug *</label>
              <input
                value={form.slug}
                onChange={(e) => handleChange('slug', e.target.value)}
                required
                placeholder="neon-store"
              />
            </div>
            <div className="admin-fld">
              <label>Category *</label>
              <select
                value={form.category}
                onChange={(e) => handleChange('category', e.target.value)}
              >
                <option value="app">Web App</option>
                <option value="land">Landing Page</option>
                <option value="ui">UI Design</option>
              </select>
            </div>
            <div className="admin-fld">
              <label>Year *</label>
              <input
                value={form.year}
                onChange={(e) => handleChange('year', e.target.value)}
                required
              />
            </div>
            <div className="admin-fld">
              <label>Duration *</label>
              <input
                value={form.duration}
                onChange={(e) => handleChange('duration', e.target.value)}
                required
                placeholder="3 weeks"
              />
            </div>
            <div className="admin-fld">
              <label>Role *</label>
              <input
                value={form.role}
                onChange={(e) => handleChange('role', e.target.value)}
                required
                placeholder="Full Stack Developer"
              />
            </div>
            <div className="admin-fld">
              <label>Client</label>
              <input
                value={form.client}
                onChange={(e) => handleChange('client', e.target.value)}
                placeholder="Local retail startup"
              />
            </div>
            <div className="admin-fld">
              <label>Team</label>
              <input
                value={form.team}
                onChange={(e) => handleChange('team', e.target.value)}
                placeholder="Solo project"
              />
            </div>
          </div>

          <div className="admin-fld">
            <label>Tags (comma separated) *</label>
            <input
              value={form.tags}
              onChange={(e) => handleChange('tags', e.target.value)}
              placeholder="React, Vite, CSS"
            />
          </div>

          <div className="admin-fld">
            <label>Short Description *</label>
            <textarea
              value={form.shortDesc}
              onChange={(e) => handleChange('shortDesc', e.target.value)}
              rows={2}
              required
              placeholder="Brief description of the project"
            />
          </div>
        </section>

        {/* ============= APPEARANCE & IMAGES ============= */}
        <section className="admin-form-section">
          <h2>Appearance &amp; Images</h2>

          <div className="admin-grid-2">
            <div className="admin-fld">
              <label>Gradient (fallback if no image)</label>
              <input
                value={form.gradient}
                onChange={(e) => handleChange('gradient', e.target.value)}
              />
            </div>
            <div className="admin-fld">
              <label>Accent Color</label>
              <input
                value={form.accent}
                onChange={(e) => handleChange('accent', e.target.value)}
              />
            </div>
          </div>

          {/* Cover Image */}
          <div className="admin-fld">
            <label>Cover Image (Case Study Hero)</label>
            {form.coverImage && (
              <div className="admin-image-preview">
                <img src={form.coverImage} alt="Cover preview" />
                <button
                  type="button"
                  onClick={() => handleChange('coverImage', '')}
                  className="admin-btn-icon danger"
                >
                  Remove
                </button>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleCoverImageUpload(e.target.files[0])}
              disabled={uploading}
            />
            {uploading && (
              <small style={{ color: '#7fe9ff' }}>Uploading...</small>
            )}
          </div>

          {/* Screenshots */}
          <div className="admin-fld">
            <label>Screenshots (select multiple)</label>
            {form.screenshots?.length > 0 && (
              <div className="admin-screenshots-grid">
                {form.screenshots.map((img, i) => (
                  <div key={i} className="admin-screenshot-item">
                    <img src={img} alt={`Screenshot ${i + 1}`} />
                    <button
                      type="button"
                      onClick={() => removeScreenshot(i)}
                      className="admin-screenshot-remove"
                      aria-label="Remove screenshot"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleScreenshotsUpload(e.target.files)}
              disabled={uploading}
            />
            <small style={{ color: '#7f97b8' }}>
              Tip: Multiple select karo (Ctrl/Cmd hold karke)
            </small>
          </div>
        </section>

        {/* ============= CASE STUDY CONTENT ============= */}
        <section className="admin-form-section">
          <h2>Case Study Content</h2>
          <div className="admin-fld">
            <label>Overview *</label>
            <textarea
              value={form.overview}
              onChange={(e) => handleChange('overview', e.target.value)}
              rows={3}
              required
              placeholder="What is this project about?"
            />
          </div>
          <div className="admin-fld">
            <label>Problem *</label>
            <textarea
              value={form.problem}
              onChange={(e) => handleChange('problem', e.target.value)}
              rows={3}
              required
              placeholder="What problem does it solve?"
            />
          </div>
          <div className="admin-fld">
            <label>Solution *</label>
            <textarea
              value={form.solution}
              onChange={(e) => handleChange('solution', e.target.value)}
              rows={3}
              required
              placeholder="How did you solve it?"
            />
          </div>
        </section>

        {/* ============= CHALLENGES ============= */}
        <section className="admin-form-section">
          <div className="admin-section-head">
            <h2>Challenges</h2>
            <button
              type="button"
              className="admin-btn-secondary"
              onClick={() => addItem(setChallenges, challenges)}
            >
              + Add
            </button>
          </div>
          {challenges.map((c, i) => (
            <div key={i} className="admin-list-item">
              <input
                placeholder="Challenge title"
                value={c.title}
                onChange={(e) =>
                  updateItem(setChallenges, challenges, i, {
                    ...c,
                    title: e.target.value,
                  })
                }
              />
              <textarea
                placeholder="Description"
                value={c.desc}
                onChange={(e) =>
                  updateItem(setChallenges, challenges, i, {
                    ...c,
                    desc: e.target.value,
                  })
                }
                rows={2}
              />
              {challenges.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(setChallenges, challenges, i)}
                  className="admin-btn-icon danger"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </section>

        {/* ============= MISTAKES ============= */}
        <section className="admin-form-section">
          <div className="admin-section-head">
            <h2>What Went Wrong (Mistakes)</h2>
            <button
              type="button"
              className="admin-btn-secondary"
              onClick={() => addItem(setMistakes, mistakes)}
            >
              + Add
            </button>
          </div>
          {mistakes.map((m, i) => (
            <div key={i} className="admin-list-item-row">
              <input
                placeholder="Mistake"
                value={m}
                onChange={(e) =>
                  updateItem(setMistakes, mistakes, i, e.target.value)
                }
              />
              {mistakes.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(setMistakes, mistakes, i)}
                  className="admin-btn-icon danger"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </section>

        {/* ============= FEATURES ============= */}
        <section className="admin-form-section">
          <div className="admin-section-head">
            <h2>Key Features</h2>
            <button
              type="button"
              className="admin-btn-secondary"
              onClick={() => addItem(setFeatures, features)}
            >
              + Add
            </button>
          </div>
          {features.map((f, i) => (
            <div key={i} className="admin-list-item-row">
              <input
                placeholder="Feature"
                value={f}
                onChange={(e) =>
                  updateItem(setFeatures, features, i, e.target.value)
                }
              />
              {features.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(setFeatures, features, i)}
                  className="admin-btn-icon danger"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </section>

        {/* ============= TECH STACK ============= */}
        <section className="admin-form-section">
          <div className="admin-section-head">
            <h2>Tech Stack</h2>
            <button
              type="button"
              className="admin-btn-secondary"
              onClick={() => addItem(setTechStack, techStack)}
            >
              + Add
            </button>
          </div>
          {techStack.map((t, i) => (
            <div key={i} className="admin-list-item">
              <input
                placeholder="Tech name (React)"
                value={t.name}
                onChange={(e) =>
                  updateItem(setTechStack, techStack, i, {
                    ...t,
                    name: e.target.value,
                  })
                }
              />
              <input
                placeholder="Why (Component reusability)"
                value={t.reason}
                onChange={(e) =>
                  updateItem(setTechStack, techStack, i, {
                    ...t,
                    reason: e.target.value,
                  })
                }
              />
              {techStack.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(setTechStack, techStack, i)}
                  className="admin-btn-icon danger"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </section>

        {/* ============= RESULTS ============= */}
        <section className="admin-form-section">
          <div className="admin-section-head">
            <h2>Results</h2>
            <button
              type="button"
              className="admin-btn-secondary"
              onClick={() => addItem(setResults, results)}
            >
              + Add
            </button>
          </div>
          {results.map((r, i) => (
            <div key={i} className="admin-list-item-3">
              <input
                placeholder="Label (Page load time)"
                value={r.label}
                onChange={(e) =>
                  updateItem(setResults, results, i, {
                    ...r,
                    label: e.target.value,
                  })
                }
              />
              <input
                placeholder="Before"
                value={r.before}
                onChange={(e) =>
                  updateItem(setResults, results, i, {
                    ...r,
                    before: e.target.value,
                  })
                }
              />
              <input
                placeholder="After"
                value={r.after}
                onChange={(e) =>
                  updateItem(setResults, results, i, {
                    ...r,
                    after: e.target.value,
                  })
                }
              />
              {results.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(setResults, results, i)}
                  className="admin-btn-icon danger"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </section>

        {/* ============= LESSONS ============= */}
        <section className="admin-form-section">
          <div className="admin-section-head">
            <h2>Lessons Learned</h2>
            <button
              type="button"
              className="admin-btn-secondary"
              onClick={() => addItem(setLessons, lessons)}
            >
              + Add
            </button>
          </div>
          {lessons.map((l, i) => (
            <div key={i} className="admin-list-item-row">
              <input
                placeholder="Lesson"
                value={l}
                onChange={(e) =>
                  updateItem(setLessons, lessons, i, e.target.value)
                }
              />
              {lessons.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(setLessons, lessons, i)}
                  className="admin-btn-icon danger"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </section>

        {/* ============= LINKS ============= */}
        <section className="admin-form-section">
          <h2>Links</h2>
          <div className="admin-grid-2">
            <div className="admin-fld">
              <label>Live URL</label>
              <input
                value={form.liveUrl}
                onChange={(e) => handleChange('liveUrl', e.target.value)}
                placeholder="https://example.com"
              />
            </div>
            <div className="admin-fld">
              <label>Source URL</label>
              <input
                value={form.sourceUrl}
                onChange={(e) => handleChange('sourceUrl', e.target.value)}
                placeholder="https://github.com/..."
              />
            </div>
          </div>
        </section>

        {/* ============= ACTIONS ============= */}
        <div className="admin-form-actions">
          <button
            type="button"
            onClick={() => navigate('/admin/projects')}
            className="admin-btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="admin-btn-primary"
            disabled={saving || uploading}
          >
            {saving
              ? 'Saving...'
              : uploading
              ? 'Uploading...'
              : isEdit
              ? 'Update Project'
              : 'Create Project'}
          </button>
        </div>
      </form>
    </div>
  );
}