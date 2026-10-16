import { useState } from 'react';
import { sendMessage } from '../api/messages';
import { useSettings } from '../hooks/useSettings';

export default function Contact() {
  const { settings } = useSettings();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [note, setNote] = useState('');
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setNote('Please fill in name, email and message.');
      return;
    }

    try {
      setSending(true);
      setNote('Sending...');
      await sendMessage(form);
      setNote('✅ Message sent successfully! I will get back to you soon.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setNote('❌ Failed to send. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const social = settings?.social || {};

  return (
    <section className="sec" id="contact">
      <div className="wrap contact">
        <div>
          <div className="eyebrow reveal">05 / Contact</div>
          <h2 className="title reveal" style={{ '--d': '.08s' }}>
            Let's build something <span>amazing</span> together
          </h2>
          <p className="sub reveal" style={{ '--d': '.16s' }}>
            Have a project, an idea or just want to say hi? Send a message and I'll get back to you as soon as possible.
          </p>

          <div className="cinfo">
            <div className="ci card reveal" style={{ '--d': '.2s' }}>
              <div className="ico2">
                <svg viewBox="0 0 24 24"><path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm0 1.5 8 6 8-6" /></svg>
              </div>
              <div><small>Email</small><span>{settings?.email || 'your@email.com'}</span></div>
            </div>
            <div className="ci card reveal" style={{ '--d': '.26s' }}>
              <div className="ico2">
                <svg viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" /></svg>
              </div>
              <div><small>Phone / WhatsApp</small><span>{settings?.phone || '+92 300 0000000'}</span></div>
            </div>
            <div className="ci card reveal" style={{ '--d': '.32s' }}>
              <div className="ico2">
                <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>
              </div>
              <div><small>Location</small><span>{settings?.location || 'Remote · Worldwide'}</span></div>
            </div>
          </div>

          <div className="soc reveal" style={{ '--d': '.38s' }}>
            {social.github && (
              <a href={social.github} target="_blank" rel="noreferrer" aria-label="GitHub"><svg viewBox="0 0 24 24"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.38-3.88-1.38-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" /></svg></a>
            )}
            {social.linkedin && (
              <a href={social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><svg viewBox="0 0 24 24"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" /></svg></a>
            )}
            {social.instagram && (
              <a href={social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Zm5.2-3.2a1.1 1.1 0 1 1-1.1 1.1 1.1 1.1 0 0 1 1.1-1.1Z" /></svg></a>
            )}
            {social.twitter && (
              <a href={social.twitter} target="_blank" rel="noreferrer" aria-label="X / Twitter"><svg viewBox="0 0 24 24"><path d="M18.9 2H22l-7.2 8.2L23.3 22h-6.6l-5.2-6.8L5.6 22H2.5l7.7-8.8L1.9 2h6.8l4.7 6.2L18.9 2Zm-1.2 18h1.7L7.4 3.9H5.6L17.7 20Z" /></svg></a>
            )}
            {social.whatsapp && (
              <a href={social.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.6-2.6-1.1-4.3-3.7-4.4-3.9-.1-.2-1-1.3-1-2.5s.6-1.8.9-2c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .5.4.2.5.7 1.7.7 1.8.1.1.1.3 0 .4-.1.2-.1.3-.2.4l-.4.4c-.1.1-.3.3-.1.5.2.3.7 1.1 1.5 1.8 1 .9 1.9 1.2 2.1 1.3.3.1.4.1.6-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.2.1 1.4.7 1.6.8.3.1.4.2.5.3.1.2.1.9-.1 1.5Z" /></svg></a>
            )}
          </div>
        </div>

        <form className="card reveal" style={{ '--d': '.15s' }} onSubmit={handleSubmit}>
          <div className="row2">
            <div className="fld">
              <label htmlFor="n">YOUR NAME</label>
              <input id="n" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required />
            </div>
            <div className="fld">
              <label htmlFor="e">YOUR EMAIL</label>
              <input id="e" name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" required />
            </div>
          </div>
          <div className="fld">
            <label htmlFor="s">SUBJECT</label>
            <input id="s" name="subject" value={form.subject} onChange={handleChange} placeholder="I'd like to work with you" />
          </div>
          <div className="fld">
            <label htmlFor="m">MESSAGE</label>
            <textarea id="m" name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project..." required />
          </div>
          <button className="btn b1" type="submit" disabled={sending}>
            {sending ? 'Sending...' : 'Send Message'}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />
            </svg>
          </button>
          <div className="note" role="status">{note}</div>
        </form>
      </div>
    </section>
  );
}