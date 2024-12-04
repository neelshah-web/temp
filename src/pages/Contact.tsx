import React from 'react';
import { ContactForm } from '../components/ContactForm';

export function Contact() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h1>
        <ContactForm />
      </div>
    </div>
  );
}