import React from 'react';

interface TestimonialCardProps {
  testimonial: {
    id: string;
    name: string;
    rating: number;
    comment: string;
    avatar?: string;
    date?: string;
  };
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  // Check if name exists, else fallback to a default value
  const avatarLetter = testimonial.name ? testimonial.name.charAt(0).toUpperCase() : 'N/A';

  // Generate star rating (★ for filled, ☆ for empty)
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? '★' : '☆');
    }
    return stars.join(' ');
  };

  return (
    <div className="testimonial-card p-6 bg-white shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="flex items-center space-x-4">
        {/* Avatar - First letter of name */}
        <div className="h-12 w-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-semibold">
          {testimonial.avatar ? (
            <img src={testimonial.avatar} alt="Avatar" className="h-full w-full object-cover rounded-full" />
          ) : (
            avatarLetter
          )}
        </div>
        <div>
          <p className="text-lg font-semibold">{testimonial.name || 'Anonymous'}</p>
          <p className="text-sm text-gray-500">{testimonial.date}</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-gray-800">{renderStars(testimonial.rating)}</p>
        <p className="text-gray-700 mt-2">{testimonial.comment}</p>
      </div>
    </div>
  );
};
