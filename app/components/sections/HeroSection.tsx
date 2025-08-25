"use client";

import React, { useState } from 'react';

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState('Buy');
  const [selectedCity, setSelectedCity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = ['Buy', 'Rent', 'PG/Hostel', 'Commercial', 'Plots/Land'];

  return (
    <section className="relative bg-[#272727] min-h-screen flex items-center justify-between px-12">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-0">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="z-10">
            <p className="text-white text-[60px] font-bold leading-tight">
              Unlock the Door With your Dream
            </p>
            <p className="text-white text-[120px] font-bold leading-tight">
              Start Here
            </p>
            
            {/* Search Section */}
            <div className="bg-white rounded-lg p-6 shadow-xl">
              {/* Tabs */}
              <div className="flex flex-wrap gap-5 mb-6">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Search Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* City Select */}
                <div className="relative">
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select your city</option>
                    <option value="delhi">Delhi/NCR</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="bangalore">Bangalore</option>
                    <option value="pune">Pune</option>
                    <option value="hyderabad">Hyderabad</option>
                  </select>
                </div>

                {/* Search Input */}
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Q Search"
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - House Image */}
          <div className="w-[800px] h-[800px] overflow-hidden rounded-t-[50%] rounded-b-none">
            <img 
              src="/assets/Villa.jpg" 
              alt="Curved Top Image" 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 