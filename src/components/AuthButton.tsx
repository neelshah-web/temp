import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User } from 'lucide-react';
import { UserProfile } from './UserProfile';
import toast from 'react-hot-toast';

export function AuthButton() {
  const { currentUser, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to log out');
      console.error('Logout error:', error);
    }
  };

  const getInitial = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  if (currentUser) {
    return (
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setShowProfile(true)}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
        >
          {getInitial(currentUser.email || 'U')}
        </button>
        <button
          onClick={handleLogout}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </button>

        {showProfile && <UserProfile onClose={() => setShowProfile(false)} />}
      </div>
    );
  }

  return (
    <Link
      to="/login"
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
    >
      <User className="h-4 w-4 mr-2" />
      Login
    </Link>
  );
}