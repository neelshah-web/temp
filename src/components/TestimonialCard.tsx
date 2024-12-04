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
  // Get the first letter of the name for the avatar
  const avatarLetter = testimonial.name.charAt(0).toUpperCase();

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
          {avatarLetter}
        </div>
        <div>
          <h3 className="text-lg font-semibold">{testimonial.name}</h3>
          <div className="text-sm text-gray-500">{testimonial.date}</div>
        </div>
      </div>
      <div className="mt-2">
        <p>{testimonial.comment}</p>
        <div className="mt-2">
          <span className="text-yellow-500 text-xl">{renderStars(testimonial.rating)}</span>
        </div>
      </div>
    </div>
  );
};
