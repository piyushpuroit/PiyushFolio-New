import React, { useState } from 'react';
import { adminLogin } from '../api/contactService';
import { useToast } from '../components/Toast';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await adminLogin(username, password);
      if (data && data.token) {
        localStorage.setItem('admin_token', data.token);
        toast.show('Logged in', { type: 'success' });
        onLogin(data.token);
      } else {
        toast.show('Invalid login response', { type: 'error' });
      }
    } catch (err) {
      toast.show(err.message || 'Login failed', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="card-glass p-8 rounded-xl w-full max-w-md">
        <h3 className="text-2xl font-bold mb-4">Admin Login</h3>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-400">Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full mt-2 px-3 py-2 rounded bg-white/5" />
          </div>
          <div>
            <label className="text-sm text-gray-400">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mt-2 px-3 py-2 rounded bg-white/5" />
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" disabled={loading} className="px-4 py-2 rounded bg-[#0f0f0f] border border-[#00f2fe]/40 text-white">
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
