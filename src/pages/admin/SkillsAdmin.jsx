import { useEffect, useState } from 'react';
import { getAllSkills, createSkill, updateSkill, deleteSkill } from '../../api/skills';

export default function SkillsAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', level: 80, category: 'frontend', order: 0 });

  const load = async () => {
    try {
      setLoading(true);
      const data = await getAllSkills();
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const reset = () => {
    setForm({ name: '', level: 80, category: 'frontend', order: 0 });
    setEditing(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateSkill(editing, form);
      } else {
        await createSkill(form);
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
      name: item.name,
      level: item.level,
      category: item.category,
      order: item.order || 0,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    await deleteSkill(id);
    load();
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Skills</h1>
      </div>

      <div className="admin-grid-2">
        <form onSubmit={handleSubmit} className="admin-form admin-form-inline">
          <h2>{editing ? 'Edit' : 'Add'} Skill</h2>
          <div className="admin-fld">
            <label>Name *</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="React" />
          </div>
          <div className="admin-fld">
            <label>Level ({form.level}%)</label>
            <input
              type="range"
              min="0"
              max="100"
              value={form.level}
              onChange={(e) => setForm({ ...form, level: +e.target.value })}
            />
          </div>
          <div className="admin-fld">
            <label>Category *</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              <option value="frontend">Frontend</option>
              <option value="tools">Tools & Workflow</option>
            </select>
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
          <h2>All Skills ({items.length})</h2>
          {loading ? (
            <div className="admin-loading">Loading...</div>
          ) : (
            items.map((item) => (
              <div key={item._id} className="admin-list-card">
                <div>
                  <b>{item.name}</b>
                  <p>{item.level}% · {item.category}</p>
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