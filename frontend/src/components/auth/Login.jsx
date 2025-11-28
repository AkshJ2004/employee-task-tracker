import React, { useState } from 'react';
import { apiLogin } from '../../api/api';
import useAuth from '../../hooks/useAuth';
import Button from '../common/Button';
import Card from '../common/Card';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@company.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await apiLogin(email, password);
    if (res.token) {
      login(res.token, res.user);
    } else {
      setError(res.message || res.error || 'Login failed');
    }
  };

  return (
    <div className="auth-wrapper">
      <Card className="auth-card">
        <h2>Sign in</h2>
        <p className="muted">Use your company credentials to access the dashboard.</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Email
            <input
              type="email"
              value={email}
              placeholder="you@company.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {error && <div className="error-text">{error}</div>}
          <Button type="submit">Login</Button>
          <p className="hint">
            Example: <b>admin@company.com / admin123</b> (from seed script)
          </p>
        </form>
      </Card>
    </div>
  );
}
