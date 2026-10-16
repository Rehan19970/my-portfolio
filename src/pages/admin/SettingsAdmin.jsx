import { useEffect, useState } from 'react';
import { getSettings, updateSettings, uploadResume } from '../../api/settings';

export default function SettingsAdmin() {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [note, setNote] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const data = await getSettings();
        setForm(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSocialChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      social: { ...prev.social, [key]: value },
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateSettings(form);
      setNote('✅ Settings saved');
      setTimeout(() => setNote(''), 3000);
    } catch (err) {
      setNote('❌ ' + (err.response?.data?.message || 'Failed'));
    } finally {
      setSaving(false);
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setNote('❌ Only PDF files allowed');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setNote('❌ File too large (max 5MB)');
      return;
    }

    try {
      setUploading(true);
      setNote('Uploading...');
      const result = await uploadResume(file);
      setForm((prev) => ({ ...prev, resumeUrl: result.resumeUrl, resumeFileName: result.resumeFileName }));
      setNote('✅ Resume uploaded');
    } catch (err) {
      setNote('❌ ' + (err.response?.data?.message || 'Upload failed'));
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="admin-loading">Loading...</div>;
  if (!form) return <div className="admin-error">Failed to load settings</div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Site Settings</h1>
          <p>Hero, About, Social, Resume — sab yahan se control karo</p>
        </div>
        <button className="admin-btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {note && <div className="admin-note">{note}</div>}

      {/* Hero */}
      <section className="admin-form-section">
        <h2>Hero Section</h2>
        <div className="admin-grid-2">
          <div className="admin-fld">
            <label>Hello Text</label>
            <input value={form.helloText || ''} onChange={(e) => handleChange('helloText', e.target.value)} />
          </div>
          <div className="admin-fld">
            <label>Your Name</label>
            <input value={form.heroName || ''} onChange={(e) => handleChange('heroName', e.target.value)} />
          </div>
          <div className="admin-fld">
            <label>Your Title</label>
            <input value={form.heroTitle || ''} onChange={(e) => handleChange('heroTitle', e.target.value)} />
          </div>
        </div>
        <div className="admin-fld">
          <label>Hero Subtitle</label>
          <textarea value={form.heroSubtitle || ''} onChange={(e) => handleChange('heroSubtitle', e.target.value)} rows={2} />
        </div>
      </section>

      {/* Resume */}
      <section className="admin-form-section">
        <h2>Resume / CV</h2>
        {form.resumeUrl ? (
          <div className="admin-resume-preview">
            <span>📄 {form.resumeFileName || 'resume.pdf'}</span>
            <a href={form.resumeUrl} target="_blank" rel="noreferrer" className="admin-link">View →</a>
          </div>
        ) : (
          <p className="admin-empty">No resume uploaded yet.</p>
        )}
        <div className="admin-fld">
          <label>Upload New Resume (PDF, max 5MB)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleResumeUpload}
            disabled={uploading}
          />
        </div>
      </section>

      {/* About */}
      <section className="admin-form-section">
        <h2>About Section</h2>
        <div className="admin-fld">
          <label>About Title</label>
          <input value={form.aboutTitle || ''} onChange={(e) => handleChange('aboutTitle', e.target.value)} />
        </div>
        <div className="admin-fld">
          <label>Paragraph 1</label>
          <textarea value={form.aboutParagraph1 || ''} onChange={(e) => handleChange('aboutParagraph1', e.target.value)} rows={3} />
        </div>
        <div className="admin-fld">
          <label>Paragraph 2</label>
          <textarea value={form.aboutParagraph2 || ''} onChange={(e) => handleChange('aboutParagraph2', e.target.value)} rows={3} />
        </div>
      </section>

      {/* Contact */}
      <section className="admin-form-section">
        <h2>Contact Info</h2>
        <div className="admin-grid-2">
          <div className="admin-fld">
            <label>Email</label>
            <input value={form.email || ''} onChange={(e) => handleChange('email', e.target.value)} />
          </div>
          <div className="admin-fld">
            <label>Phone</label>
            <input value={form.phone || ''} onChange={(e) => handleChange('phone', e.target.value)} />
          </div>
          <div className="admin-fld">
            <label>Location</label>
            <input value={form.location || ''} onChange={(e) => handleChange('location', e.target.value)} />
          </div>
        </div>
      </section>

      {/* Social */}
      <section className="admin-form-section">
        <h2>Social Links</h2>
        <div className="admin-grid-2">
          {['github', 'linkedin', 'instagram', 'twitter', 'whatsapp', 'facebook', 'youtube'].map((key) => (
            <div className="admin-fld" key={key}>
              <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              <input
                value={form.social?.[key] || ''}
                onChange={(e) => handleSocialChange(key, e.target.value)}
                placeholder={`https://${key}.com/yourprofile`}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="admin-form-section">
        <h2>Hero Stats</h2>
        {(form.stats || []).map((stat, i) => (
          <div key={i} className="admin-grid-2 admin-stat-row">
            <div className="admin-fld">
              <label>Value</label>
              <input
                type="number"
                value={stat.value}
                onChange={(e) => {
                  const copy = [...form.stats];
                  copy[i].value = +e.target.value;
                  setForm({ ...form, stats: copy });
                }}
              />
            </div>
            <div className="admin-fld">
              <label>Label</label>
              <input
                value={stat.label}
                onChange={(e) => {
                  const copy = [...form.stats];
                  copy[i].label = e.target.value;
                  setForm({ ...form, stats: copy });
                }}
              />
            </div>
          </div>
        ))}
      </section>

      {/* Facts */}
      <section className="admin-form-section">
        <h2>About Facts</h2>
        {(form.facts || []).map((fact, i) => (
          <div key={i} className="admin-grid-2 admin-stat-row">
            <div className="admin-fld">
              <label>Label</label>
              <input
                value={fact.label}
                onChange={(e) => {
                  const copy = [...form.facts];
                  copy[i].label = e.target.value;
                  setForm({ ...form, facts: copy });
                }}
              />
            </div>
            <div className="admin-fld">
              <label>Value</label>
              <input
                value={fact.value}
                onChange={(e) => {
                  const copy = [...form.facts];
                  copy[i].value = e.target.value;
                  setForm({ ...form, facts: copy });
                }}
              />
            </div>
          </div>
        ))}
      </section>

      <div className="admin-form-actions">
        <button className="admin-btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save All Settings'}
        </button>
      </div>
    </div>
  );
}