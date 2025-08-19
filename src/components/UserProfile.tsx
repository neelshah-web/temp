import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Calendar, LogOut, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export function UserProfile({ onClose }: { onClose: () => void }) {
  const { currentUser, logout } = useAuth();
  const [bookingCount, setBookingCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch booking count on component mount
  useEffect(() => {
    const fetchBookingCount = async () => {
      if (!currentUser) return;

      try {
        const bookingsQuery = query(
          collection(db, 'bookings'),
          where('userId', '==', currentUser.uid)
        );
        const querySnapshot = await getDocs(bookingsQuery);
        setBookingCount(querySnapshot.size);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        toast.error('Failed to fetch booking count.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingCount();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      onClose();
      toast.success('Logged out successfully.');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out.');
    }
  };

  if (!currentUser) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-6 md:p-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 sm:p-6 md:p-8 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">User Profile</h2>
          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 sm:px-5 sm:py-3 text-sm sm:text-base font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
            >
              <LogOut className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Logout
            </button>

            {/* Your Past Bookings Button */}
            <Link to="/past-bookings">
              <button
                className="inline-flex items-center px-4 py-2 sm:px-5 sm:py-3 text-sm sm:text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              >
                Your Past Bookings
              </button>
            </Link>

            {/* Close Icon */}
            <button
              onClick={onClose}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between space-x-4 sm:space-x-6">
            <div className="flex items-center space-x-4 sm:space-x-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-xl sm:text-2xl font-bold text-white">
                  {currentUser.email?.[0].toUpperCase()}
                </span>
              </div>
              <div className="text-sm sm:text-base">
                <p className="text-gray-900 dark:text-white font-medium">{currentUser.email}</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Member since{' '}
                  {new Date(currentUser.metadata.creationTime || '').toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="text-gray-600 dark:text-gray-400 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              {loading ? 'Loading...' : `${bookingCount} Bookings`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
