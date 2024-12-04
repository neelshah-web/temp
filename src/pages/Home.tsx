import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { CarCard } from '../components/CarCard';
import { Analytics } from '../components/Analytics';
import { ContactForm } from '../components/ContactForm';
import { cars } from '../data/cars';

export function Home() {
  // Track if "View More" or "View Less" is clicked
  const [showAllCars, setShowAllCars] = useState(false);

  // Determine which cars to display based on the state
  const carsToDisplay = showAllCars ? cars : cars.slice(0, 3);

  return (
    <div>
      <Hero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Featured Cars</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {carsToDisplay.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        {/* Toggle Button for "View More" and "View Less" */}
        <div className="text-center mt-4 mb-8"> {/* Add margin-bottom here */}
          <button
            onClick={() => setShowAllCars(!showAllCars)}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {showAllCars ? 'View Less' : 'View More'}
          </button>
        </div>

        <Analytics />
        <ContactForm />
      </div>
    </div>
  );
}
