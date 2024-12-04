import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { BookingForm } from './BookingForm';
import { User, Calendar, CreditCard } from 'lucide-react';

interface Booking {
  id: string;
  carId: string;
  pickupDate: string;
  returnDate: string;
  status: string;
  amount: number;
}

export function UserProfile({ onClose }: { onClose: () => void }) {
  const { currentUser } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    async function fetchBookings() {
      if (!currentUser) return;

      try {
        const bookingsQuery = query(
          collection(db, 'bookings'),
          where('userId', '==', currentUser.uid)
        );
        const querySnapshot = await getDocs(bookingsQuery);
        const bookingsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Booking[];
        setBookings(bookingsData);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, [currentUser]);

  if (!currentUser) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {currentUser.email?.[0].toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {currentUser.email}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Member since {new Date(currentUser.metadata.creationTime).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Booking History
            </h3>
            
            {loading ? (
              <p className="text-gray-600 dark:text-gray-400">Loading bookings...</p>
            ) : bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          Booking #{booking.id.slice(0, 8)}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {booking.pickupDate} - {booking.returnDate}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        booking.status === 'completed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                    <div className="mt-2 text-gray-600 dark:text-gray-400">
                      Amount: ₹{booking.amount}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  You don't have any booking history yet
                </p>
                <button
                  onClick={() => setShowBookingForm(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Book Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showBookingForm && (
        <BookingForm onClose={() => setShowBookingForm(false)} />
      )}
    </div>
  );
}