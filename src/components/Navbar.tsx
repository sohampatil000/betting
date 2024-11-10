import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, User, LayoutDashboard } from 'lucide-react';
import { useStore } from '../store';

export default function Navbar() {
  const user = useStore((state) => state.user);

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <span className="text-xl font-bold">BetMaster</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/matches" className="hover:text-yellow-500 transition">
              Live Matches
            </Link>
            {user?.role === 'ADMIN' && (
              <Link to="/admin" className="flex items-center space-x-1 hover:text-yellow-500 transition">
                <LayoutDashboard className="w-4 h-4" />
                <span>Admin</span>
              </Link>
            )}
            {user ? (
              <Link to="/profile" className="flex items-center space-x-1 hover:text-yellow-500 transition">
                <User className="w-4 h-4" />
                <span>{user.name}</span>
              </Link>
            ) : (
              <Link to="/login" className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-md hover:bg-yellow-400 transition">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}