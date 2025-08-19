import React from 'react';

export function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">About Relax Car Rental</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-justify">
            Relax Car Rental provides all kinds of cars on rent with driver.
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-justify">
            We’re committed to providing a smooth and enjoyable car rental experience. Whether you're 
            on a business trip or a vacation, our team is here to help you 
            find the ideal vehicle to suit your journey.
          </p>
        </div>
        
        <div>
          <img
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800"
            alt="Luxury car showroom"
            className="rounded-lg shadow-md w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Quality</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We maintain the highest standards in our vehicle fleet and service quality.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Reliability</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Count on us for dependable service and well-maintained vehicles.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Customer Focus</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Your satisfaction is our top priority in everything we do.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}