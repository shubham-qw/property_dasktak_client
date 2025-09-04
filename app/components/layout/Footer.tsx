"use client";

import React from "react";
import { FaLinkedin, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const socialMedia = [
    { name: "LinkedIn", icon: <FaLinkedin />, link: "www.linkedin.com/in/property-dastak/" },
    { name: "Facebook", icon: <FaFacebookF />, link: "#" },
    { name: "Twitter", icon: <FaTwitter />, link: "#" },
    { name: "Instagram", icon: <FaInstagram />, link: "www.instagram.com/propertydastak/" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Property Dastak</h3>
            <div className="space-y-2 text-gray-300">
              <p>Headquarters: Dehradun</p>
              <p>Registered office: East Dehradun</p>
              <p>Phone: +91 8178293156</p>
            </div>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Help</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Discount
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              Follow us on social media
            </h4>
            <div className="flex space-x-4">
              {socialMedia.map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                  title={social.name}
                >
                  <span className="text-xl">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Property Dastak. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
