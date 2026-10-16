import { useEffect, useState } from 'react';
import { getAllExperience, createExperience, updateExperience, deleteExperience } from '../../api/experience';

export default function ExperienceAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ when: '', title: '', company: '', description: '', order: 0 });

  const load = async () => {
    try {
      setLoading(true);
      const data = await getAllExperience();
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const reset = () => {
    setForm({ when: '', title: '', company: '', description: '', order: 0 });
    setEditing(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateExperience(editing, form);
      } else {
        await createExperience(form);
      }
      reset();
      load();
    } catch (err) {
      alert('Failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = (item) => {
    setEditing(item._id);
    setForm({
      when: item.when,
      title: item.title,
      company: item.company,
      description: item.description,
      order: item.order || 0,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this experience?')) return;
    await deleteExperience(id);
    load();
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Experience</h1>
      </div>

      <div className="admin-grid-2">
        <form onSubmit={handleSubmit} className="admin-form admin-form-inline">
          <h2>{editing ? 'Edit' : 'Add'} Experience</h2>
          <div className="admin-fld">
            <label>When *</label>
            <input value={form.when} onChange={(e) => setForm({ ...form, when: e.target.value })} required placeholder="2025 — PRESENT" />
          </div>
          <div className="admin-fld">
            <label>Title *</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </div>
          <div className="admin-fld">
            <label>Company *</label>
            <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} required />
          </div>
          <div className="admin-fld">
            <label>Description *</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} required />
          </div>
          <div className="admin-fld">
            <label>Order</label>
            <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: +e.target.value })} />
          </div>
          <div className="admin-form-actions">
            {editing && <button type="button" onClick={reset} className="admin-btn-secondary">Cancel</button>}
            <button type="submit" className="admin-btn-primary">{editing ? 'Update' : 'Add'}</button>
          </div>
        </form>

        <div className="admin-list">
          <h2>All Experience ({items.length})</h2>
          {loading ? (
            <div className="admin-loading">Loading...</div>
          ) : items.length === 0 ? (
            <p className="admin-empty">No experience added yet.</p>
          ) : (
            items.map((item) => (
              <div key={item._id} className="admin-list-card">
                <div>
                  <small>{item.when}</small>
                  <b>{item.title}</b>
                  <p>{item.company}</p>
                </div>
                <div className="admin-list-card-actions">
                  <button onClick={() => handleEdit(item)} className="admin-btn-icon">Edit</button>
                  <button onClick={() => handleDelete(item._id)} className="admin-btn-icon danger">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}