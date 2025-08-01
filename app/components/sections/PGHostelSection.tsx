import React from 'react';

const PGHostelSection = () => {
  const locations = [
    {
      id: 1,
      name: 'Delhi/NCR',
      image: '🛏️',
      description: 'Premium PG accommodations with modern amenities',
      color: 'from-yellow-400 to-yellow-500'
    },
    {
      id: 2,
      name: 'Gurgaon',
      image: '🛏️',
      description: 'Comfortable hostel rooms with city views',
      color: 'from-blue-400 to-blue-500'
    },
    {
      id: 3,
      name: 'Noida',
      image: '🛏️',
      description: 'Affordable PG options with great facilities',
      color: 'from-green-400 to-green-500'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Popular Locations for Hostel & PG
            </h2>
            <p className="text-gray-600">
              India leading PG Booking website, Over 30,000 Pg, Rooms in India.
            </p>
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors">
            Book Now
          </button>
        </div>

        {/* Location Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {locations.map((location) => (
            <div
              key={location.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
            >
              {/* Location Image */}
              <div className={`h-48 bg-gradient-to-br ${location.color} flex items-center justify-center`}>
                <div className="text-6xl">{location.image}</div>
              </div>
              
              {/* Location Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {location.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {location.description}
                </p>
                
                {/* Book Now Button */}
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md text-sm font-medium transition-colors group-hover:scale-105 transform duration-300">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PGHostelSection; 