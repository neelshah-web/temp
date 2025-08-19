import React from 'react';
import { Car, Menu, Home, Briefcase, Star, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthButton } from './AuthButton';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2" onClick={handleLinkClick}>
              <Car className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="font-bold text-xl text-gray-900 dark:text-white">Relax Car Rental</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link
              to="/about"
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <Info className="h-5 w-5" />
              <span>About</span>
            </Link>
            <Link
              to="/services"
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <Briefcase className="h-5 w-5" />
              <span>Services</span>
            </Link>
            <Link
              to="/testimonials"
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <Star className="h-5 w-5" />
              <span>Testimonials</span>
            </Link>
            
            <AuthButton />
          </div>

          {/* New section for user profile on small and medium screens */}
          <div className="md:hidden flex items-center space-x-4">
            <AuthButton />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              onClick={handleLinkClick}
              className="flex items-center space-x-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link
              to="/services"
              onClick={handleLinkClick}
              className="flex items-center space-x-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <Briefcase className="h-5 w-5" />
              <span>Services</span>
            </Link>
            <Link
              to="/testimonials"
              onClick={handleLinkClick}
              className="flex items-center space-x-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <Star className="h-5 w-5" />
              <span>Testimonials</span>
            </Link>
            <Link
              to="/about"
              onClick={handleLinkClick}
              className="flex items-center space-x-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <Info className="h-5 w-5" />
              <span>About</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;