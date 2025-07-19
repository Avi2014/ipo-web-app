import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="#"
              className="flex items-center space-x-0 text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              <img
                src="/bluestock_logo.svg"
                alt="BlueStock Logo"
                className="w-14 h-14 object-contain"
              />
              <span className="text-xl font-bold text-gray-900">
                {"BlueStock".toUpperCase()}
              </span>
            </a>
          </div>
          <nav className="hidden md:flex space-x-4">
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              IPO
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              COMMUNITY
            </a>
            <div className="relative group">
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center"
              >
                PRODUCTS
                <svg
                  className="ml-1 w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
            <div className="relative group">
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center"
              >
                BROKERS
                <svg
                  className="ml-1 w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              {/* Dropdown Menu */}
              <div className="absolute left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  <Link
                    to="/all-brokers"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                  >
                    All Brokers
                  </Link>
                  <Link
                    to="/compare-broker"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                  >
                    Compare Broker
                  </Link>
                </div>
              </div>
            </div>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center"
            >
              LIVE NEWS
              <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                NEW
              </span>
            </a>
            {/* ADMIN tab removed as requested */}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/signin">
              <Button
                variant="ghost"
                className="text-gray-700 hover:text-blue-600"
              >
                Sign In
              </Button>
            </Link>
            <Link to="signup">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2">
                Sign Up Now
              </Button>
            </Link>
            {/* Menu Grid Icon */}
            <div className="grid grid-cols-3 gap-1 p-2 cursor-pointer hover:bg-gray-100 rounded">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-gray-400 rounded-full"></div>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-blue-600"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                IPO
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                COMMUNITY
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                PRODUCTS
              </a>
              {/* Brokers Section in Mobile */}
              <div className="text-gray-700 font-medium">BROKERS</div>
              <div className="pl-4 space-y-2">
                <Link
                  to="/all-brokers"
                  className="block text-gray-600 hover:text-blue-600 font-medium"
                >
                  All Brokers
                </Link>
                <Link
                  to="/compare-broker"
                  className="block text-gray-600 hover:text-blue-600 font-medium"
                >
                  Compare Broker
                </Link>
              </div>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                LIVE NEWS
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                <Link to="/signin">
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Sign Up Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
