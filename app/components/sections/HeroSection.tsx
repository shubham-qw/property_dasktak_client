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

                {/* Search Button */}
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-md shadow-md transition-colors"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - House Image */}
          <div className="relative w-full max-w-[700px] aspect-square overflow-hidden rounded-t-[50%] rounded-b-none mx-auto lg:mx-0">
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