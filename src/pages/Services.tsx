import React, { useState } from 'react';
import { Shield, Clock, MapPin, Headphones, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cars } from '../data/cars';
import { BookingForm } from '../components/BookingForm';

export function Services() {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredCars = selectedCategory === 'all' ? cars : cars.filter((car) => car.category === selectedCategory);
  const displayedCars = showAll ? filteredCars : filteredCars.slice(0, 3);

  const services = [
    {
      icon: Shield,
      title: 'Insurance Coverage',
      description: 'Comprehensive insurance coverage for peace of mind during your rental period.',
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer support for any assistance you might need.',
    },
    {
      icon: MapPin,
      title: 'Flexible Pickup',
      description: 'Choose from multiple convenient pickup and drop-off locations.',
    },
    {
      icon: Headphones,
      title: 'Customer Service',
      description: 'Dedicated customer service team to ensure a smooth rental experience.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Our Services</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {services.map((service, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <service.icon className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{service.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Available Cars</h2>

      {/* Dropdown for Car Category */}
      <div className="mb-8">
        <label htmlFor="car-category" className="text-lg font-semibold text-gray-900 dark:text-white">Car Category</label>
        <select
          id="car-category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="mt-2 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md"
        >
          <option value="all">All Cars</option>
          <option value="suv">SUV Car</option>
          <option value="swift">Sedan</option>
          <option value="bus">Bus</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedCars.map((car) => (
          <div key={car.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img src={car.image} alt={car.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{car.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{car.model} {car.year}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600 dark:text-gray-300">{car.seats} Seater</span>
                <span className="text-gray-600 dark:text-gray-300">Price can be negotiable</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <a
                    href="tel:+919223621234"
                    className="inline-flex items-center px-3 py-2 border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 rounded-md hover:bg-blue-50 dark:hover:bg-gray-700"
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
            {showBookingForm && (
              <BookingForm onClose={() => setShowBookingForm(false)} selectedCarId={car.id} />
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => setShowAll(!showAll)}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          {showAll ? 'View Less' : 'View More'}
        </button>
      </div>
    </div>
  );
}
