import { X, Facebook, Youtube, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Resources */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Trading View
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  NSE Holidays
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  e-Voting CDSL
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  e-Voting NSDL
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Market Timings
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  About US
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Community
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Blogs
                </a>
              </li>
            </ul>
          </div>

          {/* Offerings */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Offerings</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/compare-broker"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Compare Broker
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Fin Calculators
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  IPO
                </a>
              </li>
              <li>
                <Link
                  to="/all-brokers"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  All Brokers
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Products
                </a>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Links</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/all-sharks"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Shark Investors
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Mutual Funds
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Sitemap
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Indian Indices
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Bug Bounty Program
                </a>
              </li>
            </ul>
          </div>
          {/* Policy */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Policy</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Refund Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Disclaimer
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Trust & Security
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media and Company Info */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
            {/* Left Side - Logo and Social */}
            <div className="flex flex-col space-y-4">
              {/* Social Media Icons */}
              <div className="flex items-center space-x-4">
                <X className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors" />
                <Facebook className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors" />
                <Youtube className="w-5 h-5 text-gray-600 hover:text-red-600 cursor-pointer transition-colors" />
                <Linkedin className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors" />
                <Instagram className="w-5 h-5 text-gray-600 hover:text-pink-600 cursor-pointer transition-colors" />
              </div>

              {/* Company Logo and Name */}
              <div className="flex items-center space-x-0 hover:scale-105 transition-transform duration-200 ">
                {/* Logo */}
                <a
                  href="#"
                  className="flex items-center space-x-0 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  <img
                    src="/bluestock_logo.svg"
                    alt="BlueStock Logo"
                    className="w-14 h-14 object-contain "
                  />
                  <span className="text-xl font-bold text-gray-900">
                    {"BlueStock".toUpperCase()}
                  </span>
                </a>
              </div>

              {/* Company Details */}
              <div className="text-sm text-gray-600 space-y-1">
                <p>BlueStock Fintech</p>
                <p>Pune, Maharashtra</p>
                <p className="mt-2">MSME Registration No:</p>
                <p>UDYAM-MH-01-W0138001</p>
              </div>

              {/* Startup India Logo */}
              <div className="mt-4">
                <div className="flex items-center space-x-2">
                  <span className="text-orange-500 font-bold text-lg">
                    #startupindia
                  </span>
                  <div className="w-8 h-6 bg-gradient-to-r from-orange-500 to-green-500 rounded"></div>
                </div>
              </div>
            </div>

            {/* Right Side - Contact and Disclaimers */}
            <div className="flex flex-col space-y-4 text-sm text-gray-600 max-w-2xl">
              <p>
                Investment in securities markets are subject to market risks,
                read all the related documents carefully before investing as
                prescribed by SEBI. Issued in the interest of the investors.
              </p>

              <p>
                The users can write to{" "}
                <a
                  href="mailto:hello@BlueStock.in"
                  className="text-blue-600 hover:underline"
                >
                  hello@BlueStock.in
                </a>{" "}
                for any app, website related queries. Also you can send IT /
                Tech related feedback to{" "}
                <a
                  href="mailto:cto@BlueStock.in"
                  className="text-blue-600 hover:underline"
                >
                  cto@BlueStock.in
                </a>
              </p>

              <p>
                <strong>Disclaimer:</strong> We are not a SEBI registered
                research analyst company. We do not provide any kind of stock
                recommendations, buy/ sell stock tips, or investment and trading
                advice. All the stock scripts shown in the BlueStock app,
                website, all social media handles are for educational purposes
                only.
              </p>

              <p>
                Before making any investment in the financial market, it is
                advisable to consult with your financial advisor. Remember that
                stock markets are subject to market risks.
              </p>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-8 border-t border-gray-200 text-sm text-gray-600">
            <p>BlueStock Fintech All Rights Reserved.</p>
            <p className="flex items-center">
              Made with <span className="text-red-500 mx-1">♥</span> in Pune,
              Maharashtra
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
