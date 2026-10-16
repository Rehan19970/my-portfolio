import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProjects } from '../../api/projects';
import { getAllMessages } from '../../api/messages';
import { getAllExperience } from '../../api/experience';
import { getAllSkills } from '../../api/skills';

export default function Dashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    messages: 0,
    unread: 0,
    experience: 0,
    skills: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentMessages, setRecentMessages] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [projects, messages, experience, skills] = await Promise.all([
          getAllProjects().catch(() => []),
          getAllMessages().catch(() => []),
          getAllExperience().catch(() => []),
          getAllSkills().catch(() => []),
        ]);

        setStats({
          projects: projects.length,
          messages: messages.length,
          unread: messages.filter((m) => !m.read).length,
          experience: experience.length,
          skills: skills.length,
        });

        setRecentMessages(messages.slice(0, 5));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Dashboard</h1>
        <p>Overview of your portfolio</p>
      </div>

      {loading ? (
        <div className="admin-loading">Loading...</div>
      ) : (
        <>
          <div className="admin-stats-grid">
            <Link to="/admin/projects" className="admin-stat-card">
              <div className="admin-stat-icon">◆</div>
              <div>
                <b>{stats.projects}</b>
                <span>Projects</span>
              </div>
            </Link>

            <Link to="/admin/messages" className="admin-stat-card">
              <div className="admin-stat-icon">✉</div>
              <div>
                <b>{stats.messages}</b>
                <span>Messages {stats.unread > 0 && `(${stats.unread} new)`}</span>
              </div>
            </Link>

            <Link to="/admin/experience" className="admin-stat-card">
              <div className="admin-stat-icon">◈</div>
              <div>
                <b>{stats.experience}</b>
                <span>Experience</span>
              </div>
            </Link>

            <Link to="/admin/skills" className="admin-stat-card">
              <div className="admin-stat-icon">◇</div>
              <div>
                <b>{stats.skills}</b>
                <span>Skills</span>
              </div>
            </Link>
          </div>

          <div className="admin-section">
            <div className="admin-section-head">
              <h2>Recent Messages</h2>
              <Link to="/admin/messages" className="admin-link">View all →</Link>
            </div>

            {recentMessages.length === 0 ? (
              <p className="admin-empty">No messages yet.</p>
            ) : (
              <div className="admin-messages-list">
                {recentMessages.map((m) => (
                  <div key={m._id} className={`admin-message ${!m.read ? 'unread' : ''}`}>
                    <div className="admin-message-head">
                      <b>{m.name}</b>
                      <small>{new Date(m.createdAt).toLocaleDateString()}</small>
                    </div>
                    <div className="admin-message-email">{m.email}</div>
                    <p>{m.message?.slice(0, 100)}...</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="admin-section">
            <h2>Quick Actions</h2>
            <div className="admin-actions">
              <Link to="/admin/projects/new" className="admin-btn-primary">+ Add Project</Link>
              <Link to="/admin/settings" className="admin-btn-secondary">Edit Settings</Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}