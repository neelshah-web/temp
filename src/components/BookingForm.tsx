import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Car } from 'lucide-react';
import { format } from 'date-fns';
import { locations } from '../data/locations';
import { cars } from '../data/cars';
import { useAuth } from '../contexts/AuthContext';
import { PaymentModal } from './PaymentModal';
import toast from 'react-hot-toast';

// Firebase imports
import { db, collection, addDoc } from '../firebase'; // Ensure this import matches your firebase.js file

interface BookingFormProps {
  onClose: () => void;
  selectedCarId?: string;
}

export function BookingForm({ onClose, selectedCarId }: BookingFormProps) {
  const { currentUser } = useAuth();
  const [showPayment, setShowPayment] = useState(false);
  const [formData, setFormData] = useState({
    pickupDate: '',
    pickupTime: '',
    returnDate: '',
    returnTime: '',
    pickupLocation: '',
    returnLocation: '',
    carId: selectedCarId || '',
  });

  const selectedCar = cars.find(car => car.id === Number(formData.carId));

  // Helper function to convert time to 12-hour format with AM/PM
  const formatTime12hr = (time: string) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12; // Convert 0 hours to 12
    return `${hours12}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
  };

  // Calculate amount based on car price (you can adjust the calculation)
  const calculateAmount = () => {
    if (selectedCar) {
      const rentalDuration = (new Date(formData.returnDate).getTime() - new Date(formData.pickupDate).getTime()) / (1000 * 3600 * 24);
    }
    return 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error('Please login to book a car');
      return;
    }

    if (!formData.carId) {
      toast.error('Please select a car');
      return;
    }

    // Save the booking data to Firestore
    try {
      await addDoc(collection(db, 'bookings'), {
        userId: currentUser.uid,
        ...formData,
        carName: selectedCar?.name,
        carModel: selectedCar?.model,
        bookingDate: new Date(),
      });
      toast.success('Booking saved successfully!');
      setShowPayment(true); // Show the PaymentModal
    } catch (error) {
      toast.error('Error saving booking data!');
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Book Your Car</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Car className="inline-block w-4 h-4 mr-2" />
              Select Car
            </label>
            <div className="relative">
              <select
                value={formData.carId}
                onChange={(e) => setFormData({ ...formData, carId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                required
              >
                <option value="">Select a car</option>
                {cars.map((car) => (
                  <option key={car.id} value={car.id}>
                    {car.name} {car.model}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Pickup Date, Time and Locations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Calendar className="inline-block w-4 h-4 mr-2" />
                Pickup Date
              </label>
              <input
                type="date"
                value={formData.pickupDate}
                onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                min={format(new Date(), 'yyyy-MM-dd')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Clock className="inline-block w-4 h-4 mr-2" />
                Pickup Time
              </label>
              <input
                type="time"
                value={formData.pickupTime}
                onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
              {formData.pickupTime && (
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {formatTime12hr(formData.pickupTime)} {/* Display formatted 12-hour time with AM/PM */}
                </div>
              )}
            </div>
          </div>

          {/* Pickup Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <MapPin className="inline-block w-4 h-4 mr-2" />
              Pickup Location
            </label>
            <select
              value={formData.pickupLocation}
              onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Select location</option>
              {locations.map((location) => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          {/* Return Date, Time and Locations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Calendar className="inline-block w-4 h-4 mr-2" />
                Return Date
              </label>
              <input
                type="date"
                value={formData.returnDate}
                onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                min={formData.pickupDate || format(new Date(), 'yyyy-MM-dd')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Clock className="inline-block w-4 h-4 mr-2" />
                Return Time
              </label>
              <input
                type="time"
                value={formData.returnTime}
                onChange={(e) => setFormData({ ...formData, returnTime: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
              {formData.returnTime && (
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {formatTime12hr(formData.returnTime)} {/* Display formatted 12-hour time with AM/PM */}
                </div>
              )}
            </div>
          </div>

          {/* Return Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <MapPin className="inline-block w-4 h-4 mr-2" />
              Return Location
            </label>
            <select
              value={formData.returnLocation}
              onChange={(e) => setFormData({ ...formData, returnLocation: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Select location</option>
              {locations.map((location) => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          {/* Submit and Payment */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 dark:bg-gray-600 dark:text-white px-6 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md"
            >
              Proceed to Pay
            </button>
          </div>
        </form>
      </div>

      {showPayment && selectedCar && (
        <PaymentModal
          isOpen={showPayment}
          onClose={() => setShowPayment(false)}
          amount={calculateAmount()} // Pass the calculated amount
          carId={formData.carId}
          bookingData={formData}
        />
      )}
    </div>
  );
}
