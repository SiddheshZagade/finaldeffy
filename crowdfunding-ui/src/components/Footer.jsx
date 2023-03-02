import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900">
      <div className="container mx-auto py-6 px-4 md:px-6 lg:px-8 xl:px-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              <img
                src="https://via.placeholder.com/100x30.png?text=LOGO"
                alt="Deffyfunds Logo"
                className="h-8 md:h-10 mr-2 md:mr-4"
              />
              <h2 className="text-2xl text-white font-semibold">
                Deffyfunds
              </h2>
            </a>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="text-white hover:text-gray-400">
              <FaFacebookF className="w-5 h-5" />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <FaTwitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <FaInstagram className="w-5 h-5" />
            </a>
          </div>
        </div>
        <nav className="mt-6 md:hidden">
          <ul className="flex flex-col space-y-4">
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white uppercase tracking-wide"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white uppercase tracking-wide"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white uppercase tracking-wide"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white uppercase tracking-wide"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white uppercase tracking-wide"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
        <div className="md:flex md:justify-end md:items-center mt-6">
          <nav className="hidden md:flex space-x-8">
            <a
              href="#"
              className="text-gray-400 hover:text-white uppercase tracking-wide"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white uppercase tracking-wide"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white uppercase tracking-wide"
            >
              Services
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white uppercase tracking-wide"
            >
              Blog
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white uppercase tracking-wide"
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
      <div className="border-t border-gray-800 py-6 md:flex md:items-center md:justify-between px-6 sm:px-10">
        <div className="text-sm text-gray-400">
          &copy; 2023 Deffyfunds. All rights reserved.
        </div>
        <div className="flex items-center mt-4 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-white mr-6">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


