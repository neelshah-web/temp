import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B']; // Colors for the donut chart

export function Analytics() {
  // Live data state
  const [data, setData] = useState([
    { name: 'Website Visits', value: 15000 },
    { name: 'Bookings', value: 5000 },
    { name: 'Ratings (x1000)', value: 4800 }
  ]);

  // Simulating live updates (replace with real-time API integration if available)
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) =>
        prevData.map((entry) => ({
          ...entry,
          value: Math.floor(entry.value * (1 + Math.random() * 0.01)) // Randomly increase values
        }))
      );
    }, 5000); // Updates every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const totalUsers = data.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <div className="flex flex-col md:flex-row items-center bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 my-12">
      {/* Left Section: Info */}
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Live Analytics</h2>
        <ul className="space-y-4">
          {data.map((entry, index) => (
            <li key={entry.name} className="flex items-center">
              <span
                className="inline-block w-4 h-4 mr-3 rounded-full"
                style={{ backgroundColor: COLORS[index] }}
              ></span>
              <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                {entry.name}:
              </span>
              <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
                {entry.value.toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
          Total Users: <span className="font-bold text-gray-900 dark:text-white">{totalUsers.toLocaleString()}</span>
        </p>
      </div>

      {/* Right Section: Donut Chart */}
      <div className="w-full md:w-1/2 h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="80%"
              innerRadius="50%"
              paddingAngle={5}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => value.toLocaleString()} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
