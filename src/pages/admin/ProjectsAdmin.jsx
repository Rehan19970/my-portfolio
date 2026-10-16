import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProjects, deleteProject } from '../../api/projects';

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await getAllProjects();
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await deleteProject(id);
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      alert('Failed to delete: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Projects</h1>
          <p>Manage your portfolio projects</p>
        </div>
        <Link to="/admin/projects/new" className="admin-btn-primary">+ Add Project</Link>
      </div>

      {loading ? (
        <div className="admin-loading">Loading...</div>
      ) : projects.length === 0 ? (
        <div className="admin-empty-state">
          <p>No projects yet.</p>
          <Link to="/admin/projects/new" className="admin-btn-primary">Add your first project</Link>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Slug</th>
                <th>Category</th>
                <th>Year</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p._id}>
                  <td><b>{p.title}</b></td>
                  <td><code>{p.slug}</code></td>
                  <td><span className="admin-badge">{p.category}</span></td>
                  <td>{p.year}</td>
                  <td>
                    <div className="admin-table-actions">
                      <Link to={`/admin/projects/edit/${p._id}`} className="admin-btn-icon">Edit</Link>
                      <button
                        onClick={() => handleDelete(p._id, p.title)}
                        className="admin-btn-icon danger"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}