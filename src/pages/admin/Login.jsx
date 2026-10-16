import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, isLoggedIn } from '../../api/auth';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Agar already logged in hai, toh useEffect mein redirect karo
  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-box">
        <div className="admin-login-logo">
          <svg viewBox="0 0 40 40" style={{ width: 48, height: 48 }}>
            <path
              fillRule="evenodd"
              fill="#22e5ff"
              d="M5 3h18.5a10.5 10.5 0 0 1 4.6 19.9L36 37h-8.4l-6.9-12H13v12H5zM13 10v8h9.8a4 4 0 0 0 0-8z"
            />
          </svg>
        </div>

        <h1>Admin Login</h1>
        <p>Sign in to manage your portfolio</p>

        <form onSubmit={handleSubmit}>
          <div className="admin-fld">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
            />
          </div>

          <div className="admin-fld">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <div className="admin-error">{error}</div>}

          <button type="submit" className="admin-btn-primary" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <a href="/" className="admin-back-link">← Back to portfolio</a>
      </div>
    </div>
  );
}