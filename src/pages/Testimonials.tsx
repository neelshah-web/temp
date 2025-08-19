// src/pages/Testimonials.tsx

import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { TestimonialCard } from '../components/TestimonialCard';
import { useAuth } from '../contexts/AuthContext';
import { db, collection, addDoc, getDocs } from '../lib/firebase'; // Firebase import
import toast from 'react-hot-toast';

export function Testimonials() {
  const { currentUser } = useAuth();
  const [showAll, setShowAll] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    comment: ''
  });
  const [testimonials, setTestimonials] = useState<any[]>([]); // Using 'any' for simplicity

  useEffect(() => {
    // Fetch reviews from Firestore when the component loads
    const fetchReviews = async () => {
      const querySnapshot = await getDocs(collection(db, "reviews"));
      const reviews: any[] = [];
      querySnapshot.forEach((doc) => {
        reviews.push(doc.data());
      });
      setTestimonials(reviews);
    };

    fetchReviews();
  }, []);

  const displayedTestimonials = showAll ? testimonials : testimonials.slice(0, 4);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error('Please login to submit a review');
      return;
    }

    try {
      const newReview = {
        ...formData,
        userId: currentUser.uid,
        date: new Date().toISOString().split('T')[0],
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${formData.name}`,
      };

      // Save the new review to Firestore
      await addDoc(collection(db, "reviews"), newReview);

      // Update the state with the new review (this will show it without reload)
      setTestimonials((prev) => [newReview, ...prev]);

      toast.success('Review submitted successfully!');
      setFormData({ name: '', rating: 5, comment: '' });
    } catch (error) {
      toast.error('Failed to submit review');
      console.error('Review submission error:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Customer Reviews</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Share Your Experience</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Rating
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        star <= formData.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Comment
              </label>
              <textarea
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Submit Review
            </button>
          </form>
        </div>

        <div className="space-y-6">
          {displayedTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
          
          {testimonials.length > 4 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                {showAll ? 'View Less' : 'View More'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
