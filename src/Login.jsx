import React, { useState } from 'react';

const API_URL = 'http://127.0.0.1:8000';

export default function Login({ onLoginSuccess }) {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignup) {
        // Signup
        const res = await fetch(`${API_URL}/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.detail || 'Signup failed');
        }
        // After signup, switch to login
        setIsSignup(false);
        setError('Account created! Please login.');
      } else {
        // Login
        const formData = new URLSearchParams();
        formData.append('username', email);
        formData.append('password', password);

        const res = await fetch(`${API_URL}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formData,
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.detail || 'Login failed');
        }
        const data = await res.json();
        localStorage.setItem('token', data.access_token);
        onLoginSuccess(data.access_token);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="relative w-full max-w-md">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 rounded-xl blur opacity-30"></div>
        <div className="relative bg-slate-900 rounded-xl p-8 border border-slate-800">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🤖</div>
            <h1 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300">
              Adaptive Mobility AI
            </h1>
            <p className="text-gray-400 mt-2">{isSignup ? 'Create your account' : 'Welcome back'}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                required
                className="w-full bg-slate-800 border-2 border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
              />
            )}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full bg-slate-800 border-2 border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full bg-slate-800 border-2 border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
            />

            {error && (
              <p className="text-sm text-center text-orange-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-bold text-white bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:shadow-2xl hover:shadow-cyan-500/50 transition disabled:opacity-50"
            >
              {loading ? 'Please wait...' : isSignup ? 'Sign Up' : 'Login'}
            </button>
          </form>

          <p className="text-center text-gray-400 mt-6 text-sm">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => { setIsSignup(!isSignup); setError(''); }}
              className="text-cyan-400 font-semibold hover:underline"
            >
              {isSignup ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}