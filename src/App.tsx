import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { Testimonials } from './pages/Testimonials';
import { About } from './pages/About';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { ThemeToggle } from './components/ThemeToggle';
import { PastBookingsPage } from './components/PastBookingsPage';

export function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/past-bookings" element={<PastBookingsPage />} />
          </Routes>
        </main>
        <div className="fixed bottom-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
