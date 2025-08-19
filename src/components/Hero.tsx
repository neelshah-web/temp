import React, { useState } from 'react';
import { BookingForm } from './BookingForm';

export function Hero() {
  const [showBookingForm, setShowBookingForm] = useState(false);

  return (
    <div className="relative bg-gray-900">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920"
          alt="Luxury car"
        />
        <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      </div>

      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Relax Car Rental Service
        </h1>
        <p className="mt-6 text-xl text-gray-300 max-w-3xl">
          We provide all kinds of Cars, Buses for Local, Outstations and Corporate.
        </p>
        <div className="mt-10">
          <button
            onClick={() => setShowBookingForm(true)}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>

      {showBookingForm && <BookingForm onClose={() => setShowBookingForm(false)} />}
    </div>
  );
}