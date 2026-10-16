import { useEffect, useState } from 'react';
import { getAllMessages, markAsRead, deleteMessage } from '../../api/messages';

export default function MessagesAdmin() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      const data = await getAllMessages();
      setMessages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleOpen = async (msg) => {
    setSelected(msg);
    if (!msg.read) {
      try {
        await markAsRead(msg._id);
        setMessages(messages.map((m) => (m._id === msg._id ? { ...m, read: true } : m)));
      } catch {}
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    await deleteMessage(id);
    setMessages(messages.filter((m) => m._id !== id));
    if (selected?._id === id) setSelected(null);
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Messages</h1>
        <p>{messages.filter((m) => !m.read).length} unread</p>
      </div>

      <div className="admin-messages-layout">
        <div className="admin-messages-sidebar">
          {loading ? (
            <div className="admin-loading">Loading...</div>
          ) : messages.length === 0 ? (
            <p className="admin-empty">No messages yet.</p>
          ) : (
            messages.map((m) => (
              <div
                key={m._id}
                className={`admin-message-item ${!m.read ? 'unread' : ''} ${selected?._id === m._id ? 'on' : ''}`}
                onClick={() => handleOpen(m)}
              >
                <div className="admin-message-item-head">
                  <b>{m.name}</b>
                  <small>{new Date(m.createdAt).toLocaleDateString()}</small>
                </div>
                <div className="admin-message-item-sub">{m.email}</div>
                <p>{m.message?.slice(0, 60)}...</p>
              </div>
            ))
          )}
        </div>

        <div className="admin-message-detail">
          {!selected ? (
            <div className="admin-empty-state">
              <p>Select a message to read</p>
            </div>
          ) : (
            <>
              <div className="admin-message-detail-head">
                <div>
                  <h2>{selected.subject || 'No subject'}</h2>
                  <p><b>{selected.name}</b> &lt;{selected.email}&gt;</p>
                  <small>{new Date(selected.createdAt).toLocaleString()}</small>
                </div>
                <button onClick={() => handleDelete(selected._id)} className="admin-btn-icon danger">
                  Delete
                </button>
              </div>
              <div className="admin-message-body">{selected.message}</div>
              <div className="admin-message-actions">
                <a href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject || '')}`} className="admin-btn-primary">
                  Reply via Email
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}