import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { toast } from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo login - In production, this would validate against your backend
    if (email === 'admin@example.com' && password === 'admin') {
      setUser({
        id: '1',
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'ADMIN',
        balance: 1000
      });
      toast.success('Logged in successfully!');
      navigate('/');
    } else if (email === 'user@example.com' && password === 'user') {
      setUser({
        id: '2',
        email: 'user@example.com',
        name: 'Demo User',
        role: 'USER',
        balance: 500
      });
      toast.success('Logged in successfully!');
      navigate('/');
    } else {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-700 rounded p-2 focus:ring-2 focus:ring-yellow-500 outline-none"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-700 rounded p-2 focus:ring-2 focus:ring-yellow-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-gray-900 py-2 rounded hover:bg-yellow-400 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-400">
          <p>Demo Accounts:</p>
          <p>Admin: admin@example.com / admin</p>
          <p>User: user@example.com / user</p>
        </div>
      </div>
    </div>
  );
}