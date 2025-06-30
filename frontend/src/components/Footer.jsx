import React from 'react';
import { Link } from 'react-router-dom';
import footerLogo from '../assets/plants/logo.png';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#ffffff] text-gray-800 pt-12 pb-8 px-6 md:px-12">
      {/* Content Container */}
      <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start border-b border-gray-300 pb-8">
        {/* Logo & Desc */}
        <div>
          <img src={footerLogo} alt="Logo" className="w-40 mb-4" />
          <p className="text-sm text-gray-600">
            GreenLife adalah tempat terbaik untuk menemukan tanaman hias 🌿.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-green-700 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-green-700 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-green-700 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              <FaFacebook size={22} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-sky-500 transition"
            >
              <FaTwitter size={22} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-500 transition"
            >
              <FaInstagram size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="w-full max-w-[1400px] mx-auto mt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p className="mb-3 md:mb-0">
          &copy; {new Date().getFullYear()} GreenLife. All rights reserved.
        </p>
        <ul className="flex gap-5">
          <li>
            <a href="#privacy" className="hover:text-green-700 transition">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#terms" className="hover:text-green-700 transition">
              Terms of Service
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
