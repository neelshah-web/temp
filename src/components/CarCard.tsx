import React, { useState } from 'react';
import { Car } from '../types';
import { Users, Fuel, Gauge, Phone } from 'lucide-react';
import { BookingForm } from './BookingForm';

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  const [showBookingForm, setShowBookingForm] = useState(false);

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <img
          src={car.image}
          alt={`${car.name} ${car.model}`}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{car.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{car.model} {car.year}</p>
          
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{car.seats} Seats</span>
            </div>
            <div className="flex items-center">
              <Fuel className="h-4 w-4 mr-1" />
              <span>{car.fuelType}</span> {/* Fuel type displayed here */}
            </div>
            <div className="flex items-center">
              <Gauge className="h-4 w-4 mr-1" />
              <span>{car.transmission}</span> {/* Transmission displayed here */}
            </div>
          </div>

          <div className="mt-4">
            <p className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-3">
              Price can be negotiable
            </p>
            <div className="flex space-x-2">
              <a
                href="tel:+917887809708"
                className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 rounded-md hover:bg-blue-50 dark:hover:bg-gray-700"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call
              </a>
              <button 
                onClick={() => setShowBookingForm(true)}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Show the booking form when state is set to true */}
      {showBookingForm && (
        <BookingForm onClose={() => setShowBookingForm(false)} selectedCarId={car.id} />
      )}
    </>
  );
}
