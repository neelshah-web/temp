// PastBookingsPage.tsx

import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';

interface Booking {
  id: string;
  carName: string;
  carModel: string;
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  dropLocation: string;
  status: string;
}

export function PastBookingsPage() {
  const { currentUser } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!currentUser) return;

      try {
        const bookingsQuery = query(
          collection(db, 'bookings'),
          where('userId', '==', currentUser.uid)
        );
        const querySnapshot = await getDocs(bookingsQuery);

        const bookingsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          carName: doc.data().carName,
          carModel: doc.data().carModel,
          pickupDate: doc.data().pickupDate,
          returnDate: doc.data().returnDate,
          pickupLocation: doc.data().pickupLocation,
          dropLocation: doc.data().returnLocation, // Ensure this matches Firestore field
          status: 'Confirmed',
        }));

        setBookings(bookingsData);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        toast.error('Failed to fetch bookings.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [currentUser]);

  if (!currentUser) {
    return <p className="text-gray-600 dark:text-gray-400">Please log in to view your bookings.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Your Past Bookings</h1>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
      ) : bookings.length > 0 ? (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li
              key={booking.id}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <h2 className="font-medium text-gray-900 dark:text-white">Car: {booking.carName} ({booking.carModel})</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pickup: {booking.pickupDate}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Return: {booking.returnDate}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pickup Location: {booking.pickupLocation}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Drop Location: {booking.dropLocation}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Status: {booking.status}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">No past bookings found.</p>
      )}
    </div>
  );
}

export default PastBookingsPage;
