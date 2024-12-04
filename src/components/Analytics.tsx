import React from 'react';
import { Users, Star, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const bookingData = [
  { month: 'Jan', bookings: 420, rating: 4.7 },
  { month: 'Feb', bookings: 480, rating: 4.8 },
  { month: 'Mar', bookings: 520, rating: 4.9 },
  { month: 'Apr', bookings: 550, rating: 4.8 },
  { month: 'May', bookings: 600, rating: 4.9 },
  { month: 'Jun', bookings: 650, rating: 4.8 }
];

export function Analytics() {
  const stats = [
    {
      icon: Users,
      label: 'Happy Customers',
      value: '15,000+',
      color: 'bg-blue-500',
    },
    {
      icon: Star,
      label: 'Customer Rating',
      value: '4.8/5',
      color: 'bg-yellow-500',
    },
    {
      icon: Calendar,
      label: 'Successful Bookings',
      value: '5,000+',
      color: 'bg-green-500',
    },
  ];

  return (
    <div className="space-y-12">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg p-6 transform hover:scale-105 transition-transform duration-300"
            >
              <div className={`absolute inset-0 opacity-10 ${stat.color}`} />
              <div className="relative z-10">
                <stat.icon className={`h-12 w-12 mb-4 ${stat.color.replace('bg-', 'text-')}`} />
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Live Booking Analysis</h2>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bookingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="bookings" name="Monthly Bookings" fill="#3B82F6" />
              <Bar yAxisId="right" dataKey="rating" name="Average Rating" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}